import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import api from "../../api";
import { RootState } from "../store";

export interface IFilmsState {
  topFilms: TFilm[] | [];
  error: string;
  loadingStatus: LoadingStatus;
  totalPage: number;
}

enum LoadingStatus {
  IDLE = "idle",
  LOADING = "loading",
  ERROR = "error",
}

export type TFilm = {
  countries: Array<Object>;
  filmId: number;
  filmLength: string;
  genres: Array<Object>;
  nameEn: string;
  nameRu: string;
  posterUrl: string;
  posterUrlPreview: string;
  rating: string;
  ratingChange: null | string;
  ratingVoteCount: number;
  year: string;
};

export type TData = {
  films: TFilm[];
  pagesCount: number;
};

const initialState: IFilmsState = {
  topFilms: [],
  error: "",
  loadingStatus: LoadingStatus.IDLE,
  totalPage: 0,
};

export const getTopFilms = createAsyncThunk<
  void,
  { categories: string | undefined; currentPage: number },
  { rejectValue: string }
>(
  "films/getFilms",
  async ({ categories, currentPage }, { dispatch, rejectWithValue }) => {
    try {
      const { films, pagesCount }: TData = await api.getTopFilms(
        currentPage,
        categories
      );
      dispatch(addFilms(films));
      dispatch(addTotalPage(pagesCount));
    } catch (err) {
      if (err instanceof Error) {
        dispatch(setError(err.message));
        return rejectWithValue(err.message);
      } else {
        console.log("Unexpected error", err);
      }
    }
  }
);

export const getMovieByGenre = createAsyncThunk<
  void,
  { genre: string; currentPage: number },
  { rejectValue: string }
>(
  "films/getMovieByGenre",
  async ({ genre, currentPage }, { dispatch, rejectWithValue }) => {
    try {
      const { items, totalPages } = await api.getListFilmsByGenre(
        currentPage,
        genre
      );
      dispatch(addFilms(items));
      dispatch(addTotalPage(totalPages));
    } catch (err) {
      if (err instanceof Error) {
        dispatch(setError(err.message));
        return rejectWithValue(err.message);
      } else {
        console.log("Error", err);
      }
    }
  }
);

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
    addFilms: (state, action) => {
      state.topFilms = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addTotalPage: (state, action) => {
      state.totalPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTopFilms.pending, handlePendingStatus)
      .addCase(getTopFilms.fulfilled, handleFulfilledStatus)
      .addCase(getTopFilms.rejected, (state, action) => {
        state.loadingStatus = LoadingStatus.ERROR;
        if (action.payload) {
          handleRejectedStatus(state, action.payload);
        }
      })
      .addCase(getMovieByGenre.pending, handlePendingStatus)
      .addCase(getMovieByGenre.fulfilled, handleFulfilledStatus)
      .addCase(getMovieByGenre.rejected, (state, action) => {
        state.loadingStatus = LoadingStatus.ERROR;
        if (action.payload) {
          handleRejectedStatus(state, action.payload);
        }
      });
  },
});

const { reducer, actions } = filmsSlice;

export default reducer;

export const { addFilms, setError, addTotalPage } = actions;
