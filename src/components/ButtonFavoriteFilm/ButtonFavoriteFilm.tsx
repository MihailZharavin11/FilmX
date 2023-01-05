import React from "react";
import {
  deleteFavoriteFilm,
  setFavoriteFilm,
} from "../../redux/slices/userSlice/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { HeartTwoTone, HeartOutlined } from "@ant-design/icons";
import {
  addMovieToDB,
  removeMovieFromDB,
} from "../../fireBase/fireBaseDB/fireBaseDB";
import { getAuth } from "firebase/auth";
import styles from "./buttonFavoriteFilm.module.scss";
import { IFilm } from "../../api/APItypes";
import { iconStateSelector } from "../../redux/slices/userSlice/userSelectors";

type ButtonFavoriteFilmProps = {
  film: IFilm | null;
  id: number | undefined;
};

export const ButtonFavoriteFilm: React.FC<ButtonFavoriteFilmProps> = ({
  film,
  id,
}) => {
  const dispatch = useAppDispatch();
  const { checkLikes } = useAppSelector(iconStateSelector(id));
  const auth = getAuth();
  const user = auth.currentUser;
  const userid = user?.uid;

  const addFilmToFavorite = () => {
    if (film) {
      dispatch(setFavoriteFilm(film));
      addMovieToDB(`users/${userid}/favoriteMovies`, film);
    }
  };

  const deleteFilmFromFavorite = () => {
    if (film) {
      removeMovieFromDB(`users/${userid}/favoriteMovies`, film.kinopoiskId);
      dispatch(deleteFavoriteFilm(film.kinopoiskId));
    }
  };

  return (
    <>
      {checkLikes ? (
        <HeartTwoTone
          className={styles.icon}
          onClick={(e) => {
            e.stopPropagation();
            deleteFilmFromFavorite();
          }}
          twoToneColor="#ff0daa"
          key={"heart"}
        />
      ) : (
        <HeartOutlined
          className={styles.icon}
          onClick={(e) => {
            e.stopPropagation();
            addFilmToFavorite();
          }}
        />
      )}
    </>
  );
};
