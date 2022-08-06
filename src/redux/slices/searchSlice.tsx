import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { act } from "@testing-library/react";
import api from "../../api";
import { TTopFilm } from "./filmsTopSlice";

interface ISearchState {
  filmBySearch: TTopFilm[] | [];
  error: string;
  loadingStatus: LoadingStatus;
}

enum LoadingStatus {
  IDLE = "idle",
  LOADING = "loading",
  ERROR = "error",
}

const initialState: ISearchState = {
  filmBySearch: [],
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
    addFilmBySearch: (state, action) => {
      state.filmBySearch = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
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
      });
  },
});

export const searchFilm = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("films/searchFilm", async (searchValue, { dispatch, rejectWithValue }) => {
  try {
    const foundMovies = await api.getFilmBySearchValue(searchValue);
    dispatch(addFilmBySearch(foundMovies));
  } catch (err) {
    if (err instanceof Error) {
      dispatch(setError(err.message));
      return rejectWithValue(err.message);
    } else {
      console.log("Error", err);
    }
  }
});

const { reducer, actions } = searchSlice;

export default reducer;

export const { addFilmBySearch, setError } = actions;
