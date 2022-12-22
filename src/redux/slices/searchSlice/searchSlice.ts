import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TFilmSearchByFiltersResponse_items,
  TFilmSearchResponse_films,
} from "../../../api/APItypes";
import { LoadingStatus } from "../../reduxGeneralTypes";
import { deepSearchFilm, searchFilm } from "./searchThunk";
import { ISearchState } from "./searchTypes";

const initialState: ISearchState = {
  quickSearchMovie: [],
  deepSearch: [],
  total: null,
  error: "",
  loadingStatus: LoadingStatus.IDLE,
};

const handlePendingStatus = (state: ISearchState) => {
  state.loadingStatus = LoadingStatus.LOADING;
};

const handleFulfilledStatus = (state: ISearchState) => {
  state.loadingStatus = LoadingStatus.IDLE;
  state.error = "";
};

const handleRejectedStatus = (state: ISearchState, action: string) => {
  state.loadingStatus = LoadingStatus.ERROR;
  state.error = action;
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addQuickSearchMovie: (
      state,
      action: PayloadAction<TFilmSearchResponse_films[]>
    ) => {
      state.quickSearchMovie = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    addDeepSearchMovie: (
      state,
      action: PayloadAction<TFilmSearchByFiltersResponse_items[]>
    ) => {
      state.deepSearch = action.payload;
    },
    addTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
    clearQuickSearchMovie: (state) => {
      state.quickSearchMovie = [];
    },
    clearDeepSearchMovie: (state) => {
      state.deepSearch = [];
      state.total = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchFilm.pending, handlePendingStatus)
      .addCase(searchFilm.fulfilled, handleFulfilledStatus)
      .addCase(searchFilm.rejected, (state, action) => {
        if (action.payload) {
          state.loadingStatus = LoadingStatus.ERROR;
          handleRejectedStatus(state, action.payload);
        }
      })
      .addCase(deepSearchFilm.pending, handlePendingStatus)
      .addCase(deepSearchFilm.fulfilled, handleFulfilledStatus)
      .addCase(deepSearchFilm.rejected, (state, action) => {
        if (action.payload) {
          state.loadingStatus = LoadingStatus.ERROR;
          handleRejectedStatus(state, action.payload);
        }
      });
  },
});

const { reducer, actions } = searchSlice;

export default reducer;

export const {
  addQuickSearchMovie,
  setError,
  addDeepSearchMovie,
  addTotal,
  clearQuickSearchMovie,
  clearDeepSearchMovie,
} = actions;
