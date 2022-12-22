import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TFilmSearchByFiltersResponse_items,
  TTopFilm,
} from "../../../api/APItypes";
import { LoadingStatus } from "../../reduxGeneralTypes";
import { getMovieByGenre, getTopFilms } from "./filmsTopThunk";
import { IFilmsState } from "./filmsTopTypes";

const initialState: IFilmsState = {
  filmsByTop: [],
  filmsByGenre: [],
  error: "",
  loadingStatus: LoadingStatus.IDLE,
  totalPage: 0,
};

const handlePendingStatus = (state: IFilmsState) => {
  state.loadingStatus = LoadingStatus.LOADING;
};

const handleFulfilledStatus = (state: IFilmsState) => {
  state.loadingStatus = LoadingStatus.IDLE;
  state.error = "";
};

const handleRejectedStatus = (state: IFilmsState, action: string) => {
  state.loadingStatus = LoadingStatus.ERROR;
  state.error = action;
};

const filmsSlice = createSlice({
  name: "films",
  initialState,
  reducers: {
    addTopFilms: (state, action: PayloadAction<TTopFilm[]>) => {
      state.filmsByTop = action.payload;
    },
    addGenreFilms: (
      state,
      action: PayloadAction<TFilmSearchByFiltersResponse_items[]>
    ) => {
      state.filmsByGenre = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    addTotalPage: (state, action: PayloadAction<number>) => {
      state.totalPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTopFilms.pending, handlePendingStatus)
      .addCase(getTopFilms.fulfilled, handleFulfilledStatus)
      .addCase(getTopFilms.rejected, (state: IFilmsState, action) => {
        if (action.payload) {
          handleRejectedStatus(state, action.payload);
        }
      })
      .addCase(getMovieByGenre.pending, handlePendingStatus)
      .addCase(getMovieByGenre.fulfilled, handleFulfilledStatus)
      .addCase(getMovieByGenre.rejected, (state, action) => {
        if (action.payload) {
          handleRejectedStatus(state, action.payload);
        }
      });
  },
});

const { reducer, actions } = filmsSlice;

export default reducer;

export const { addTopFilms, addGenreFilms, setError, addTotalPage } = actions;
