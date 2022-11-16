import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import fireBaseAuth from "../../fireBase/fireBaseAuth";
import { RootState } from "../store";

enum LoadingStatus {
  IDLE = "idle",
  LOADING = "loading",
  ERROR = "error",
}

type FavoriteMoviesItem = {
  id: string;
  nameEn: string;
  ratingImdb: string;
  posterUrl: string;
  year: number;
};

interface IUserSlice {
  email: string | null;
  token: string | null;
  id: string | null;
  error: string | null;
  favoriteMovies: FavoriteMoviesItem[] | [];
  watchedMovies: FavoriteMoviesItem[] | [];
  loadingStatus: LoadingStatus;
}

const initialState: IUserSlice = {
  email: null,
  token: null,
  id: null,
  error: null,
  favoriteMovies: [],
  watchedMovies: [],
  loadingStatus: LoadingStatus.IDLE,
};

export const fetchUser = createAsyncThunk<
  void,
  { setLoading: (args: boolean) => void },
  { rejectValue: string }
>("user/fetchUser", async ({ setLoading }, { dispatch, rejectWithValue }) => {
  try {
    const auth = getAuth();
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );
      }
      setLoading(false);
    });
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
  }
});

export const createNewUser = createAsyncThunk<
  void,
  { email: string; password: string },
  { rejectValue: string }
>(
  "user/createNewUser",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const userToRegister = await fireBaseAuth.registration(email, password);
      if (userToRegister) {
        dispatch(userLogIn({ email, password }));
      }
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const userLogIn = createAsyncThunk<
  void,
  { email: string; password: string },
  { rejectValue: string }
>(
  "user/userLogIn",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const userToLogIn = await fireBaseAuth
        .logIn(email, password)
        .then((response) => {
          return response;
        });
      if (userToLogIn) {
        dispatch(
          setUser({
            email: userToLogIn.email,
            id: userToLogIn.uid,
            token: userToLogIn.refreshToken,
          })
        );
      }
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const userLogOut = createAsyncThunk<void, void, { rejectValue: string }>(
  "user/userLogOut",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const logOut = await fireBaseAuth.signOut();
      logOut
        ? dispatch(removeUser())
        : rejectWithValue("Ошибка выхода, попробуйте еще раз...");
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
    }
  }
);

const handlePendingStatus = (state: IUserSlice) => {
  state.loadingStatus = LoadingStatus.LOADING;
};

const handleFulfilledStatus = (state: IUserSlice) => {
  state.loadingStatus = LoadingStatus.IDLE;
  state.error = null;
};

const handleRejectedStatus = (state: IUserSlice, action: string) => {
  state.loadingStatus = LoadingStatus.ERROR;
  state.error = action;
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removeUser: (state) => {
      state.email = null;
      state.token = null;
      state.id = null;
    },
    setFavoriteMovie: (state, action) => {
      const newFavoriteMovie: FavoriteMoviesItem = {
        id: action.payload.id,
        nameEn: action.payload.nameEn,
        ratingImdb: action.payload.raitingImdb,
        posterUrl: action.payload.posterUrl,
        year: action.payload.year,
      };
      const sameElement = state.favoriteMovies.some(
        (element) => element.id === newFavoriteMovie.id
      );
      if (!sameElement) {
        state.favoriteMovies = [...state.favoriteMovies, newFavoriteMovie];
      } else {
        state.favoriteMovies = state.favoriteMovies.filter(
          (element) => element.id !== newFavoriteMovie.id
        );
      }
    },
    setWatchedMovie: (state, action) => {
      const sameElement = state.watchedMovies.some(
        (element) => element.id === action.payload.id
      );
      if (!sameElement) {
        state.watchedMovies = [...state.watchedMovies, action.payload];
      } else {
        state.watchedMovies = state.watchedMovies.filter(
          (element) => element.id !== action.payload.id
        );
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewUser.pending, handlePendingStatus)
      .addCase(createNewUser.fulfilled, handleFulfilledStatus)
      .addCase(createNewUser.rejected, (state, action) => {
        if (action.payload) {
          handleRejectedStatus(state, action.payload);
        }
      })
      .addCase(userLogIn.pending, handlePendingStatus)
      .addCase(userLogIn.fulfilled, handleFulfilledStatus)
      .addCase(userLogIn.rejected, (state, action) => {
        if (action.payload) {
          handleRejectedStatus(state, action.payload);
        }
      })
      .addCase(userLogOut.pending, handlePendingStatus)
      .addCase(userLogOut.fulfilled, handleFulfilledStatus)
      .addCase(userLogOut.rejected, (state, action) => {
        if (action.payload) {
          handleRejectedStatus(state, action.payload);
        }
      });
  },
});

export const iconStateSelector = (filmId: string) =>
  createSelector(
    (state: RootState) => state.user.favoriteMovies,
    (state: RootState) => state.user.watchedMovies,
    (favoriteMovie, watchedMovies) => {
      if (!filmId) return [false, false];
      const checkLikes = favoriteMovie.some((element) => element.id === filmId);
      const checkWatched = watchedMovies.some(
        (element) => element.id === filmId
      );
      return [checkLikes, checkWatched];
    }
  );

const { reducer, actions } = userSlice;

export default reducer;

export const {
  setUser,
  removeUser,
  setFavoriteMovie,
  setWatchedMovie,
  clearError,
} = actions;
