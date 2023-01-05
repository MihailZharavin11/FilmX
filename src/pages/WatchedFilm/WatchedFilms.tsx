import { Pagination, PaginationProps } from "antd";
import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { ButtonFavoriteFilm } from "../../components/ButtonFavoriteFilm/ButtonFavoriteFilm";
import { SelectedFilmCard } from "../../components/SelectedFilmCard/SelectedFilmCard";
import { removeMovieFromDB } from "../../fireBase/fireBaseDB/fireBaseDB";
import { deleteWatchedFilm } from "../../redux/slices/userSlice/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import styles from "./watchedFilms.module.scss";

export const WatchedFilms = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();
  const { watchedFilms } = useAppSelector((state) => state.user);
  const auth = getAuth();
  const user = auth.currentUser;
  const userid = user?.uid;
  const lastIndex = currentPage * 3;
  const firstIndex = lastIndex - 3;
  const totalPage = Math.ceil(watchedFilms.length / 3);

  useEffect(() => {
    if (currentPage > totalPage && totalPage > 0) {
      setCurrentPage(totalPage);
    }
  }, [currentPage, totalPage]);

  const deleteMovieFromWatched = (filmID: number) => {
    removeMovieFromDB(`users/${userid}/watchedMovie`, filmID);
    dispatch(deleteWatchedFilm(filmID));
  };

  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrentPage(page);
    window.scroll(0, 0);
  };

  return (
    <div className={styles.watchedWrapper}>
      <div className={styles.watchedCards}>
        {watchedFilms
          .map((watchedMovie, index) => {
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
          })
          .slice(firstIndex, lastIndex)}
      </div>
      <div className={styles.pagination}>
        <Pagination
          simple
          defaultPageSize={1}
          current={currentPage}
          onChange={onChange}
          total={totalPage}
        />
      </div>
    </div>
  );
};
