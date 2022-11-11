import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";

export interface IFilmsState {
  films: TTopFilm[] | TGenreFilm[] | null;
  error: string;
  loadingStatus: LoadingStatus;
  totalPage: number;
}

enum LoadingStatus {
  IDLE = "idle",
  LOADING = "loading",
  ERROR = "error",
}

export type TTopFilm = {
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

export type TGenreFilm = {
  countries: Array<Object>;
  genres: Array<Object>;
  imdbId: string;
  kinopoiskId: number;
  nameEn: string;
  nameOriginal: string;
  nameRu: string;
  posterUrl: string;
  posterUrlPreview: string;
  ratingImdb: number;
  ratingKinopoisk: number;
  type: string;
  year: number;
};

export type TData = {
  films: TTopFilm[];
  pagesCount: number;
};

const initialState: IFilmsState = {
  films: null,
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
        return rejectWithValue(err.message);
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
        return rejectWithValue(err.message);
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
      state.films = action.payload;
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

export const { addFilms, setError, addTotalPage } = actions;
