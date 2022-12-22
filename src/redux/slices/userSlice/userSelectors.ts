import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const iconStateSelector = (filmId: number | undefined) =>
  createSelector(
    (state: RootState) => state.user.favoriteFilms,
    (state: RootState) => state.user.watchedFilms,
    (favoriteMovie, watchedMovies) => {
      if (!filmId) return { checkLikes: false, checkWatched: false };
      const checkLikes = favoriteMovie?.some(
        (element) => element.kinopoiskId === Number(filmId)
      );
      const checkWatched = watchedMovies.some(
        (element) => element.kinopoiskId === Number(filmId)
      );
      return { checkLikes, checkWatched };
    }
  );
