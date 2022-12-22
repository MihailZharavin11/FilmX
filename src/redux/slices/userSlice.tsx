import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import api from "../../api";
import { IFilm } from "../../api/APItypes";
import fireBaseAuth from "../../fireBase/fireBaseAuth";
import { RootState } from "../store";

enum LoadingStatus {
  IDLE = "idle",
  LOADING = "loading",
  ERROR = "error",
}

interface IUserSlice {
  email: string | null;
  token: string | null;
  id: string | null;
  error: string | null;
  favoriteFilms: IFilm[];
  watchedFilms: IFilm[];
  loadingStatus: LoadingStatus;
}

const initialState: IUserSlice = {
  email: null,
  token: null,
  id: null,
  error: null,
  favoriteFilms: [],
  watchedFilms: [],
  loadingStatus: LoadingStatus.IDLE,
};

export const fetchUser = createAsyncThunk<
  void,
  { setLoading: (args: boolean) => void },
  { rejectValue: string }
>("user/fetchUser", async ({ setLoading }, { dispatch, rejectWithValue }) => {
  try {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            email: user.email || "",
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

export const getDataFromDB = createAsyncThunk(
  "user/getDataFromDB",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const db = getDatabase();
      const refFavoriteMovie = ref(db, `users/${id}/favoriteMovies`);
      const refWatchedMovie = ref(db, `users/${id}/watchedMovie`);
      onValue(
        refFavoriteMovie,
        (snapshot) => {
          snapshot.forEach((element) => {
            if (element.exists()) {
              api.getFilmById(element.val().id).then((response) => {
                dispatch(setFavoriteFilm(response));
              });
            }
          });
        },
        {
          onlyOnce: true,
        }
      );
      onValue(
        refWatchedMovie,
        (snapshot) => {
          snapshot.forEach((element) => {
            if (element.exists()) {
              api.getFilmById(element.val().id).then((response) => {
                dispatch(setWatchedFilm(response));
              });
            }
          });
        },
        {
          onlyOnce: true,
        }
      );
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
    }
  }
);

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
            email: userToLogIn.email || "",
            id: userToLogIn.uid,
            token: userToLogIn.refreshToken,
          })
        );
        dispatch(getDataFromDB(userToLogIn.uid));
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
      if (logOut) {
        dispatch(removeUser());
        dispatch(clearFavoriteFilms());
        dispatch(clearWatchedFilms());
      } else {
        rejectWithValue("Ошибка выхода, попробуйте еще раз...");
      }
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
    setUser: (
      state,
      action: PayloadAction<{ email: string; token: string; id: string }>
    ) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removeUser: (state) => {
      state.email = null;
      state.token = null;
      state.id = null;
    },
    setFavoriteFilm: (state, action: PayloadAction<IFilm>) => {
      state.favoriteFilms.push(action.payload);
    },
    deleteFavoriteFilm: (state, action: PayloadAction<number>) => {
      state.favoriteFilms = state.favoriteFilms.filter(
        (favoriteMovie) => favoriteMovie.kinopoiskId !== action.payload
      );
    },
    setWatchedFilm: (state, action: PayloadAction<IFilm>) => {
      state.watchedFilms.push(action.payload);
    },
    deleteWatchedFilm: (state, action: PayloadAction<number>) => {
      state.watchedFilms = state.watchedFilms.filter(
        (watchedMovies) => watchedMovies.kinopoiskId !== Number(action.payload)
      );
    },
    clearError: (state) => {
      state.error = null;
    },
    clearFavoriteFilms: (state) => {
      state.favoriteFilms = [];
    },
    clearWatchedFilms: (state) => {
      state.watchedFilms = [];
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

export const iconStateSelector = (filmId: number | undefined) =>
  createSelector(
    (state: RootState) => state.user.favoriteFilms,
    (state: RootState) => state.user.watchedFilms,
    (favoriteMovie, watchedMovies) => {
      if (!filmId) return { checkLikes: false, checkWatched: false };
      const checkLikes = favoriteMovie?.some(
        (element) => element.kinopoiskId === Number(filmId)
      );
      const checkWatched = watchedMovies.some(
        (element) => element.kinopoiskId === Number(filmId)
      );
      return { checkLikes, checkWatched };
    }
  );

const { reducer, actions } = userSlice;

export default reducer;

export const {
  setUser,
  removeUser,
  setFavoriteFilm,
  setWatchedFilm,
  clearError,
  deleteFavoriteFilm,
  deleteWatchedFilm,
  clearFavoriteFilms,
  clearWatchedFilms,
} = actions;
