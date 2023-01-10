import { Card } from "antd";
import React from "react";
import { setClassForRaiting } from "../../../lib/raitingFunc";
import styles from "./cardInnerImage.module.scss";
import { useAppSelector } from "../../../redux/store";
import CardInnerHeader from "../CardInnerHeader/CardInnerHeader";
import { ButtonViewFilm } from "../../ButtonViewFilm/ButtonViewFilm";
import { ButtonFavoriteFilm } from "../../ButtonFavoriteFilm/ButtonFavoriteFilm";

type FilmImageProps = {
  img: string | undefined;
  actions: boolean;
  ratingImdb?: number;
  ratingKinopoisk?: number;
};

export const CardInnerImage: React.FC<FilmImageProps> = ({
  img,
  ratingImdb,
  ratingKinopoisk,
  actions,
}) => {
  const selectFilm = useAppSelector((state) => state.filmItem.selectFilm);

  return (
    <>
      <div className={styles.presentationFilm__image}>
        <Card
          className={styles.card}
          cover={<img alt="PosterImg" src={img} />}
          bodyStyle={{ display: "none" }}
          actions={
            actions
              ? [
                  <ButtonFavoriteFilm
                    film={selectFilm}
                    id={selectFilm?.kinopoiskId}
                  />,
                  <ButtonViewFilm
                    film={selectFilm}
                    id={selectFilm?.kinopoiskId}
                  />,
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
