import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";
import { addActors, addItemFilm, addMoviePictures } from "./filmItemSlice";

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
