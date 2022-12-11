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
import { useParams } from "react-router-dom";
import CardInnerHeader from "../CardInnerHeader/CardInnerHeader";
import {
  getDatabase,
  set,
  ref,
  push,
  onValue,
  remove,
} from "firebase/database";
import { getAuth } from "firebase/auth";

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
  const { id } = useParams();
  const [likedMovie, watchedMovie] = useAppSelector(
    iconStateSelector(id ? id : "")
  );
  const auth = getAuth();
  const user = auth.currentUser;
  const userid = user?.uid;
  const db = getDatabase();

  const onClickIcon = (nameIcon: string) => {
    if (selectFilm) {
      if (nameIcon === "heart") {
        dispatch(setFavoriteMovie(selectFilm));
        addFavoriteMovieToDB();
      }
      if (nameIcon === "watched") {
        dispatch(setWatchedMovie(selectFilm));
        addWatchedMovieToDB();
      }
    }
  };

  const addFavoriteMovieToDB = () => {
    const keyForRef = push(ref(db, `users/${userid}/favoriteMovies`));
    set(keyForRef, {
      id,
    });
  };

  const addWatchedMovieToDB = () => {
    const keyForRef = push(ref(db, `users/${userid}/watchedMovie`));
    set(keyForRef, {
      id,
    });
  };

  const removeFromFavorites = () => {
    const refFavoriteMov = ref(db, `users/${userid}/favMovies`);
    onValue(
      refFavoriteMov,
      (snapshot) => {
        snapshot.forEach((element) => {
          const favFilmVal = element.val();
          if (favFilmVal.id === id) {
            remove(element.ref);
          }
        });
      },
      {
        onlyOnce: true,
      }
    );
    dispatch(deleteFavoriteMovie(id));
  };

  const removeFromWatched = () => {
    const refWatchedMovie = ref(db, `users/${userid}/watchedMovie`);
    onValue(
      refWatchedMovie,
      (snapshot) => {
        snapshot.forEach((element) => {
          const wathcedMovie = element.val();
          if (wathcedMovie.id === id) {
            remove(element.ref);
          }
        });
      },
      {
        onlyOnce: true,
      }
    );
    dispatch(deleteWatchedMovie(id));
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
                      onClick={() => removeFromFavorites()}
                      twoToneColor="#ff0daa"
                      key={"heart"}
                    />
                  ) : (
                    <HeartOutlined onClick={() => onClickIcon("heart")} />
                  ),
                  watchedMovie ? (
                    <EyeTwoTone
                      onClick={() => removeFromWatched()}
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
