import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import api from "../../api";
import { RootState } from "../store";

type TCountries = {
  country: string;
};

export interface IFilmById {
  countries: TCountries[];
  description: string;
  filmLength: number;
  genres: Array<Object>;
  has3D: boolean;
  hasImax: boolean;
  nameEn: string;
  nameOriginal: string;
  nameRu: string;
  posterUrl: string;
  posterUrlPreview: string;
  ratingAgeLimits: number;
  ratingImdb: number;
  ratingKinopoisk: number;
  slogan: string;
  type: string;
  year: number;
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
  actors: IActorsById[] | null;
  loadingStatus: LoadingStatus;
  error: null | string;
}

export type TDescriptionValue = {
  title: string;
  value: string | number | boolean;
};

const initialState: IFilmItemSlice = {
  selectFilm: null,
  actors: null,
  loadingStatus: LoadingStatus.IDLE,
  error: null,
};

export const getFilmInfo = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("filmItem/getFilmInfo", async (id, { dispatch, rejectWithValue }) => {
  try {
    const film = await api.getFilmById(id);
    dispatch(addItemFilm(film));
  } catch (err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    } else {
      console.log("Error", err);
    }
  }
});

export const getActors = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("filmtItem/getActors", async (id, { dispatch, rejectWithValue }) => {
  try {
    const actors = await api.getActorsById(id);
    dispatch(addActors(actors));
  } catch (err) {}
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
    addItemFilm: (state, action) => {
      state.selectFilm = action.payload;
    },
    addActors: (state, action) => {
      state.actors = action.payload;
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

export const { addItemFilm, addActors } = actions;
