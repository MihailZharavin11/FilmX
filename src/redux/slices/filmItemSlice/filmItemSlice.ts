import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TMoviePictures, IFilm, IStaffResponse } from "../../../api/APItypes";
import { LoadingStatus } from "../../reduxGeneralTypes";
import { getActors, getFilmInfo, getMoviePictures } from "./filmItemThunk";
import { IFilmItemSlice } from "./filmItemTypes";

const initialState: IFilmItemSlice = {
  selectFilm: null,
  actors: [],
  loadingStatus: LoadingStatus.IDLE,
  error: null,
  moviePictures: [],
};

const handlePendingStatus = (state: IFilmItemSlice) => {
  state.loadingStatus = LoadingStatus.LOADING;
};

const handleFulfilledStatus = (state: IFilmItemSlice) => {
  state.loadingStatus = LoadingStatus.IDLE;
};

const handleRejectedStatus = (state: IFilmItemSlice, action: string) => {
  state.loadingStatus = LoadingStatus.ERROR;
  state.error = action;
};

const filmItemSlice = createSlice({
  name: "filmItem",
  initialState,
  reducers: {
    addItemFilm: (state, action: PayloadAction<IFilm>) => {
      state.selectFilm = action.payload;
    },
    addActors: (state, action: PayloadAction<IStaffResponse[]>) => {
      state.actors = action.payload;
    },
    addMoviePictures: (state, action: PayloadAction<TMoviePictures[]>) => {
      state.moviePictures = action.payload;
    },
    clearItemFilm: (state) => {
      state.selectFilm = null;
      state.moviePictures = [];
      state.actors = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFilmInfo.pending, handlePendingStatus)
      .addCase(getFilmInfo.fulfilled, handleFulfilledStatus)
      .addCase(getFilmInfo.rejected, (state, action) => {
        if (action.payload) {
          handleRejectedStatus(state, action.payload);
        }
      })
      .addCase(getActors.pending, handlePendingStatus)
      .addCase(getActors.fulfilled, handleFulfilledStatus)
      .addCase(getActors.rejected, (state, action) => {
        if (action.payload) {
          handleRejectedStatus(state, action.payload);
        }
      })
      .addCase(getMoviePictures.pending, handlePendingStatus)
      .addCase(getMoviePictures.fulfilled, handleFulfilledStatus)
      .addCase(getMoviePictures.rejected, (state, action) => {
        if (action.payload) {
          handleRejectedStatus(state, action.payload);
        }
      });
  },
});

const { reducer, actions } = filmItemSlice;

export default reducer;

export const { addItemFilm, addActors, addMoviePictures, clearItemFilm } =
  actions;
