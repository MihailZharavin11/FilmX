import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFilm } from "../../../api/APItypes";
import { LoadingStatus } from "../../reduxGeneralTypes";
import {
  createNewUser,
  fetchUser,
  getDataFromDB,
  userLogIn,
  userLogOut,
} from "./userThunk";
import { IUserSlice } from "./userTypes";

const initialState: IUserSlice = {
  email: null,
  token: null,
  id: null,
  error: null,
  favoriteFilms: [],
  watchedFilms: [],
  loadingStatus: LoadingStatus.IDLE,
};

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
      })
      .addCase(getDataFromDB.pending, handlePendingStatus)
      .addCase(getDataFromDB.fulfilled, handleFulfilledStatus)
      .addCase(getDataFromDB.rejected, (state, action) => {
        if (action.payload) {
          handleRejectedStatus(state, action.payload);
        }
      })
      .addCase(fetchUser.pending, handlePendingStatus)
      .addCase(fetchUser.fulfilled, handleFulfilledStatus)
      .addCase(fetchUser.rejected, (state, action) => {
        if (action.payload) {
          handleRejectedStatus(state, action.payload);
        }
      });
  },
});

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
