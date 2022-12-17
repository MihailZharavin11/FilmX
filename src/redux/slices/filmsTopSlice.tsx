import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api, { TCountry } from "../../api";

export interface IFilmsState {
  filmsByTop: TTopFilm[];
  filmsByGenre: TGenreFilm[];
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

export type TCountriesBySearch = {
  country: string;
};

export type TGenresBySearch = {
  genre: string;
};

export type TGenreFilm = {
  countries: TCountriesBySearch[];
  genres: TGenresBySearch[];
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
  filmsByTop: [],
  filmsByGenre: [],
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
      dispatch(addTopFilms(films));
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
      dispatch(addGenreFilms(items));
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
    addTopFilms: (state, action: PayloadAction<TTopFilm[]>) => {
      state.filmsByTop = action.payload;
    },
    addGenreFilms: (state, action: PayloadAction<TGenreFilm[]>) => {
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
