import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import api from "../../api";
import { TMoviePictures, TCountry, TGenre } from "../../api/APItypes";
import { RootState } from "../store";

export interface IFilmById {
  kinopoiskId: number;
  imdbId: string;
  nameRu: string;
  nameEn: string;
  nameOriginal: string;
  posterUrl: string;
  posterUrlPreview: string;
  coverUrl: string;
  logoUrl: string;
  reviewsCount: number;
  ratingGoodReview: number;
  ratingGoodReviewVoteCount: number;
  ratingKinopoisk: number;
  ratingKinopoiskVoteCount: number;
  ratingImdb: number;
  ratingImdbVoteCount: number;
  ratingFilmCritics: number;
  ratingFilmCriticsVoteCount: number;
  ratingAwait: number;
  ratingAwaitCount: number;
  ratingRfCritics: number;
  ratingRfCriticsVoteCount: number;
  webUrl: string;
  year: number;
  filmLength: number;
  slogan: string;
  description: string;
  shortDescription: string;
  editorAnnotation: string;
  isTicketsAvailable: boolean;
  productionStatus: string;
  type: string;
  ratingMpaa: string;
  ratingAgeLimits: string;
  hasImax: boolean;
  has3D: boolean;
  lastSync: Date;
  countries: TCountry[];
  genres: TGenre[];
  startYear: number;
  endYear: number;
  serial: boolean;
  shortFilm: boolean;
  completed: boolean;
}

export enum LoadingStatus {
  IDLE = "idle",
  LOADING = "loading",
  ERROR = "error",
}

export interface IActorsById {
  staffId: number;
  nameRu: string;
  nameEn: string;
  description: null | string;
  posterUrl: string;
  professionText: string;
  professionKey: string;
}

export interface IFilmItemSlice {
  selectFilm: IFilmById | null;
  actors: IActorsById[];
  loadingStatus: LoadingStatus;
  error: null | string;
  moviePictures: TMoviePictures[];
}

export type TDescriptionValue = {
  title: string;
  value: string | number | boolean;
};

const initialState: IFilmItemSlice = {
  selectFilm: null,
  actors: [],
  loadingStatus: LoadingStatus.IDLE,
  error: null,
  moviePictures: [],
};

export const getFilmInfo = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("filmItem/getFilmInfo", async (id, { dispatch, rejectWithValue }) => {
  try {
    const film = await api.getFilmById(id);
    dispatch(addItemFilm(film));
    dispatch(getActors(id));
    dispatch(getMoviePictures(id));
  } catch (err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
  }
});

export const getActors = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("filmtItem/getActors", async (id, { dispatch, rejectWithValue }) => {
  try {
    const actors = await api.getActorsByFilmId(id);
    dispatch(addActors(actors));
  } catch (err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    } else {
      console.log("Error", err);
    }
  }
});

export const getMoviePictures = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("filmItem/getMoviePictures", async (id, { dispatch, rejectWithValue }) => {
  try {
    const moviePictures = await api.getMoviePictures(id);
    dispatch(addMoviePictures(moviePictures));
  } catch (err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    } else {
      console.log("Error", err);
    }
  }
});

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
    addItemFilm: (state, action: PayloadAction<IFilmById>) => {
      state.selectFilm = action.payload;
    },
    addActors: (state, action: PayloadAction<IActorsById[]>) => {
      state.actors = action.payload;
    },
    addMoviePictures: (state, action: PayloadAction<TMoviePictures[]>) => {
      state.moviePictures = action.payload;
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

export const descriptionFilmSelector = createSelector(
  (state: RootState) => state.filmItem.selectFilm,
  (selectFilm) => {
    const descriptionValue: TDescriptionValue[] = [
      {
        title: "Страна",
        value:
          selectFilm?.countries.map((element) => element.country).join() || "",
      },
      {
        title: "Длительность фильма",
        value: selectFilm?.filmLength || "",
      },
      {
        title: "3D",
        value: selectFilm?.has3D ? "Доступен" : "Недоступен",
      },
      {
        title: "IMax",
        value: selectFilm?.hasImax ? "Доступен" : "Недоступен",
      },
      {
        title: "Возраст",
        value: selectFilm?.ratingAgeLimits || "",
      },
      {
        title: "Описание",
        value: selectFilm?.description || "",
      },
    ];
    return descriptionValue;
  }
);

const { reducer, actions } = filmItemSlice;

export default reducer;

export const { addItemFilm, addActors, addMoviePictures } = actions;
