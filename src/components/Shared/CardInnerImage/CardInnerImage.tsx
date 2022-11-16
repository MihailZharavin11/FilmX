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
  iconStateSelector,
  setFavoriteMovie,
  setWatchedMovie,
} from "../../../redux/slices/userSlice";
import { useParams } from "react-router-dom";
import CardInnerHeader from "../CardInnerHeader/CardInnerHeader";

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

  const onClickIcon = (nameIcon: string) => {
    if (selectFilm) {
      const movieToSend = {
        id,
        nameEn: selectFilm.nameEn ? selectFilm.nameEn : selectFilm.nameOriginal,
        ratingImdb: selectFilm.ratingImdb,
        posterUrl: selectFilm.posterUrl,
        year: selectFilm.year,
      };
      if (nameIcon === "heart") {
        dispatch(setFavoriteMovie(movieToSend));
      }
      if (nameIcon === "watched") {
        dispatch(setWatchedMovie(movieToSend));
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
                      onClick={() => onClickIcon("heart")}
                      twoToneColor="#ff0daa"
                      key={"heart"}
                    />
                  ) : (
                    <HeartOutlined onClick={() => onClickIcon("heart")} />
                  ),
                  watchedMovie ? (
                    <EyeTwoTone
                      onClick={() => onClickIcon("watched")}
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
