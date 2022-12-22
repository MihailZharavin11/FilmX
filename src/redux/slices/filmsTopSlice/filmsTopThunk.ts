import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";
import { addGenreFilms, addTopFilms, addTotalPage } from "./filmsTopSlice";

export const getTopFilms = createAsyncThunk<
  void,
  { categories: string | undefined; currentPage: number },
  { rejectValue: string }
>(
  "films/getFilms",
  async ({ categories, currentPage }, { dispatch, rejectWithValue }) => {
    try {
      const { films, pagesCount } = await api.getTopFilms(
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
