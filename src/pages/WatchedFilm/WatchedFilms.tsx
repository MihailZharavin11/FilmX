import { getAuth } from "firebase/auth";
import React from "react";
import { ButtonFavoriteFilm } from "../../components/ButtonFavoriteFilm/ButtonFavoriteFilm";
import { SelectedFilmCard } from "../../components/SelectedFilmCard/SelectedFilmCard";
import { removeMovieFromDB } from "../../fireBase/fireBaseDB/fireBaseDB";
import { deleteWatchedFilm } from "../../redux/slices/userSlice/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import styles from "./watchedFilms.module.scss";

export const WatchedFilms = () => {
  const dispatch = useAppDispatch();
  const { watchedFilms } = useAppSelector((state) => state.user);
  const auth = getAuth();
  const user = auth.currentUser;
  const userid = user?.uid;

  const deleteMovieFromWatched = (filmID: number) => {
    removeMovieFromDB(`users/${userid}/watchedMovie`, filmID);
    dispatch(deleteWatchedFilm(filmID));
  };

  return (
    <div className={styles.watchedWrapper}>
      {watchedFilms.map((watchedMovie, index) => {
        return (
          <SelectedFilmCard
            key={watchedMovie.kinopoiskId}
            id={watchedMovie.kinopoiskId}
            number={index}
            image={watchedMovie.posterUrlPreview}
            nameRu={watchedMovie.nameRu}
            nameEn={watchedMovie.nameEn}
            nameOriginal={watchedMovie.nameOriginal}
            year={watchedMovie.year}
            filmLength={watchedMovie.filmLength}
            countries={watchedMovie.countries}
            raiting={watchedMovie.ratingKinopoisk}
            deleteButtonHandler={deleteMovieFromWatched}
          >
            <ButtonFavoriteFilm
              film={watchedMovie}
              id={watchedMovie.kinopoiskId}
            />
          </SelectedFilmCard>
        );
      })}
    </div>
  );
};
