import { Card } from "antd";
import React from "react";
import { setClassForRaiting } from "../../../lib/raitingFunc";
import styles from "./cardInnerImage.module.scss";
import {
  HeartTwoTone,
  EyeTwoTone,
  HeartOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  deleteFavoriteMovie,
  deleteWatchedMovie,
  iconStateSelector,
  setFavoriteMovie,
  setWatchedMovie,
} from "../../../redux/slices/userSlice";
import CardInnerHeader from "../CardInnerHeader/CardInnerHeader";
import { getAuth } from "firebase/auth";
import {
  addMovieToDB,
  removeMovieFromDB,
} from "../../../fireBase/fireBaseDB/fireBaseDB";

type FilmImageProps = {
  img: string | undefined;
  actions: boolean;
  ratingImdb?: number;
  ratingKinopoisk?: number;
};

const FilmImage: React.FC<FilmImageProps> = ({
  img,
  ratingImdb,
  ratingKinopoisk,
  actions,
}) => {
  const selectFilm = useAppSelector((state) => state.filmItem.selectFilm);
  const dispatch = useAppDispatch();
  const [likedMovie, watchedMovie] = useAppSelector(
    iconStateSelector(selectFilm?.kinopoiskId ? selectFilm.kinopoiskId : null)
  );
  const auth = getAuth();
  const user = auth.currentUser;
  const userid = user?.uid;

  const onClickIcon = (nameIcon: "heart" | "watched") => {
    if (selectFilm) {
      if (nameIcon === "heart") {
        dispatch(setFavoriteMovie(selectFilm));
        addMovieToDB(`users/${userid}/favoriteMovies`, selectFilm.kinopoiskId);
      }
      if (nameIcon === "watched") {
        dispatch(setWatchedMovie(selectFilm));
        addMovieToDB(`users/${userid}/watchedMovie`, selectFilm.kinopoiskId);
      }
    }
  };

  return (
    <>
      <div className={styles.titleMobile}>
        <CardInnerHeader
          title={selectFilm?.nameEn ? selectFilm.nameEn : ""}
          titleOriginal={selectFilm?.nameOriginal}
          subTitle={selectFilm?.year + " год"}
          text={selectFilm?.slogan}
        />
      </div>

      <div className={styles.presentationFilm__image}>
        <Card
          className={styles.card}
          cover={<img alt="PosterImg" src={img} />}
          bodyStyle={{ display: "none" }}
          actions={
            actions
              ? [
                  likedMovie ? (
                    <HeartTwoTone
                      onClick={() => {
                        if (selectFilm) {
                          removeMovieFromDB(
                            `users/${userid}/favoriteMovies`,
                            selectFilm.kinopoiskId
                          );
                          dispatch(deleteFavoriteMovie(selectFilm.kinopoiskId));
                        }
                      }}
                      twoToneColor="#ff0daa"
                      key={"heart"}
                    />
                  ) : (
                    <HeartOutlined onClick={() => onClickIcon("heart")} />
                  ),
                  watchedMovie ? (
                    <EyeTwoTone
                      onClick={() => {
                        if (selectFilm) {
                          removeMovieFromDB(
                            `users/${userid}/watchedMovie`,
                            selectFilm.kinopoiskId
                          );
                          dispatch(deleteWatchedMovie(selectFilm.kinopoiskId));
                        }
                      }}
                      key={"eye"}
                    />
                  ) : (
                    <EyeOutlined onClick={() => onClickIcon("watched")} />
                  ),
                ]
              : []
          }
        ></Card>
      </div>
      <div className={styles.presentationFilm__raiting}>
        {ratingImdb && (
          <Card
            headStyle={{ textAlign: "center", border: "none" }}
            bodyStyle={{ textAlign: "center", padding: 0 }}
            bordered={false}
            title="IMDB"
          >
            <p
              className={`${styles.presentationFilm__raitingNumber} ${
                styles[setClassForRaiting(ratingImdb)]
              }`}
            >
              {ratingImdb}
            </p>
          </Card>
        )}
        {ratingKinopoisk && (
          <Card
            headStyle={{ textAlign: "center", border: "none" }}
            bodyStyle={{ textAlign: "center", padding: 0 }}
            bordered={false}
            title="Kinopoisk"
          >
            <p
              className={`${styles.presentationFilm__raitingNumber} ${
                styles[setClassForRaiting(ratingKinopoisk)]
              }`}
            >
              {ratingKinopoisk}
            </p>
          </Card>
        )}
      </div>
    </>
  );
};

export default FilmImage;
