import { getAuth } from "firebase/auth";
import { ButtonViewFilm } from "../../components/ButtonViewFilm/ButtonViewFilm";
import { removeMovieFromDB } from "../../fireBase/fireBaseDB/fireBaseDB";
import { deleteFavoriteFilm } from "../../redux/slices/userSlice/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { SelectedFilmCard } from "../../components/SelectedFilmCard/SelectedFilmCard";
import styles from "./favoriteFilms.module.scss";
import { Pagination, PaginationProps } from "antd";
import { useEffect, useState } from "react";
import EmptyContent from "../../components/EmptyContent/EmptyContent";

export const FavoriteFilms = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { favoriteFilms } = useAppSelector((state) => state.user);
  const auth = getAuth();
  const user = auth.currentUser;
  const userid = user?.uid;
  const lastIndex = currentPage * 3;
  const firstIndex = lastIndex - 3;
  const totalPage = Math.ceil(favoriteFilms.length / 3);

  useEffect(() => {
    if (currentPage > totalPage && totalPage > 0) {
      setCurrentPage(totalPage);
    }
  }, [currentPage, totalPage]);

  if (!favoriteFilms.length) {
    return (
      <EmptyContent
        description="У вас еще нет просмотренных фильмов"
        buttonTitle="Перейти к фильмам"
        buttonUrl="/films"
      />
    );
  }

  const deleteFilmFromDBFavorite = (filmID: number) => {
    removeMovieFromDB(`users/${userid}/favoriteMovies`, filmID);
    dispatch(deleteFavoriteFilm(filmID));
  };

  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrentPage(page);
    window.scroll(0, 0);
  };

  return (
    <div className={styles.favoriteWrapper}>
      <div className={styles.favoriteCards}>
        {favoriteFilms
          .map((favoriteMovie, index) => {
            return (
              <SelectedFilmCard
                key={favoriteMovie.kinopoiskId}
                id={favoriteMovie.kinopoiskId}
                number={firstIndex + index}
                image={favoriteMovie.posterUrlPreview}
                nameRu={favoriteMovie.nameRu}
                nameEn={favoriteMovie.nameEn}
                nameOriginal={favoriteMovie.nameOriginal}
                year={favoriteMovie.year}
                filmLength={favoriteMovie.filmLength}
                countries={favoriteMovie.countries}
                raiting={favoriteMovie.ratingKinopoisk}
                deleteButtonHandler={deleteFilmFromDBFavorite}
              >
                <ButtonViewFilm
                  film={favoriteMovie}
                  id={favoriteMovie.kinopoiskId}
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
