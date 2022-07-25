import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";

export interface IFilmById {
  countries: Array<Object>;
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
  ratingAgeLimits: string;
  ratingImdb: number;
  ratingKinopoisk: number;
  slogan: string;
  type: string;
  year: number;
}

const initialState = {
  selectFilm: {},
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

const filmtItemSlice = createSlice({
  name: "filmItem",
  initialState,
  reducers: {
    addItemFilm: (state, action) => {
      state.selectFilm = action.payload;
    },
  },
});

const { reducer, actions } = filmtItemSlice;

export default reducer;

export const { addItemFilm } = actions;
