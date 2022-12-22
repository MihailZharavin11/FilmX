import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";
import { TParamsToSearchFilm } from "../../../api/APItypes";
import {
  addDeepSearchMovie,
  addQuickSearchMovie,
  addTotal,
  clearQuickSearchMovie,
  setError,
} from "./searchSlice";

export const searchFilm = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("films/searchFilm", async (searchValue, { dispatch, rejectWithValue }) => {
  try {
    const { films } = await api.getFilmByKeyWords(searchValue);
    if (films.length > 0) {
      dispatch(addQuickSearchMovie(films));
    } else {
      dispatch(clearQuickSearchMovie());
    }
  } catch (err) {
    if (err instanceof Error) {
      dispatch(setError(err.message));
      return rejectWithValue(err.message);
    } else {
      console.log("Error", err);
    }
  }
});

export const deepSearchFilm = createAsyncThunk<
  void,
  { paramsToSearch: TParamsToSearchFilm; page: number },
  { rejectValue: string }
>(
  "films/deepSearchFilm",
  async ({ paramsToSearch, page }, { dispatch, rejectWithValue }) => {
    try {
      const foundMovies = await api.getFilmsBySearch(paramsToSearch, page);
      const { items, total } = foundMovies;
      dispatch(addDeepSearchMovie(items));
      dispatch(addTotal(total));
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
