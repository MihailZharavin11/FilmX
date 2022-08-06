import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";

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

enum LoadingStatus {
  IDLE = "idle",
  LOADING = "loading",
  ERROR = "error",
}

export interface IFilmItemSlice {
  selectFilm: IFilmById | null;
  loadingStatus: LoadingStatus;
  error: null | string;
}

const initialState: IFilmItemSlice = {
  selectFilm: null,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFilmInfo.pending, handlePendingStatus)
      .addCase(getFilmInfo.fulfilled, handleFulfilledStatus)
      .addCase(getFilmInfo.rejected, (state, action) => {
        if (action.payload) {
          handleRejectedStatus(state, action.payload);
        }
      });
  },
});

const { reducer, actions } = filmItemSlice;

export default reducer;

export const { addItemFilm } = actions;
