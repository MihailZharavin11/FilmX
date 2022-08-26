import { Card } from "antd";
import React from "react";
import { setClassForRaiting } from "../../../lib/raitingFunc";
import styles from "./filmImage.module.scss";
import { HeartTwoTone, EyeTwoTone, FireTwoTone } from "@ant-design/icons";

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
  return (
    <>
      <div className={styles.presentationFilm__image}>
        <Card
          style={{ width: "80%" }}
          cover={<img alt="PosterImg" src={img} />}
          bodyStyle={{ display: "none" }}
          actions={
            actions
              ? [
                  <HeartTwoTone twoToneColor="#eb2f96" key={"heart"} />,
                  <EyeTwoTone key={"eye"} />,
                  <FireTwoTone twoToneColor="#fc032c" key={"fire"} />,
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
