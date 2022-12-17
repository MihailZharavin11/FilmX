import { getAuth } from "firebase/auth";
import { ButtonViewFilm } from "../../components/ButtonViewFilm/ButtonViewFilm";
import { removeMovieFromDB } from "../../fireBase/fireBaseDB/fireBaseDB";
import { deleteFavoriteFilm } from "../../redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { SelectedFilmCard } from "../../components/SelectedFilmCard/SelectedFilmCard";
import styles from "./favoriteFilms.module.scss";

export const FavoriteFilms = () => {
  const dispatch = useAppDispatch();
  const { favoriteFilms } = useAppSelector((state) => state.user);
  const auth = getAuth();
  const user = auth.currentUser;
  const userid = user?.uid;

  const deleteFilmFromDBFavorite = (filmID: number) => {
    removeMovieFromDB(`users/${userid}/favoriteMovies`, filmID);
    dispatch(deleteFavoriteFilm(filmID));
  };

  return (
    <div className={styles.favoriteWrapper}>
      {favoriteFilms.map((favoriteMovie, index) => {
        return (
          <SelectedFilmCard
            key={favoriteMovie.kinopoiskId}
            id={favoriteMovie.kinopoiskId}
            number={index}
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
      })}
    </div>
  );
};
