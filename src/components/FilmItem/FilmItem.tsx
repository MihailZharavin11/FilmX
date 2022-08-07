import { Card, Spin } from "antd";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFilmInfo } from "../../redux/slices/filmItemSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { HeartTwoTone, EyeTwoTone, FireTwoTone } from "@ant-design/icons";
import styles from "./filmItem.module.scss";
import { setClassForRaiting } from "../../lib/raitingFunc";

const FilmItem = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { selectFilm, loadingStatus, error } = useAppSelector(
    (state) => state.filmItem
  );

  useEffect(() => {
    if (!id) return;
    dispatch(getFilmInfo(id));
  }, [dispatch, id]);

  if (loadingStatus === "loading") {
    return (
      <Spin
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 70px)",
        }}
        size="large"
      />
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.presentationFilm}>
        <div className={styles.presentationFilm__image}>
          <Card
            style={{ width: "90%" }}
            cover={<img alt="PosterImg" src={selectFilm?.posterUrl} />}
            bodyStyle={{ display: "none" }}
            actions={[
              <HeartTwoTone twoToneColor="#eb2f96" key={"heart"} />,
              <EyeTwoTone key={"eye"} />,
              <FireTwoTone twoToneColor="#fc032c" key={"fire"} />,
            ]}
          ></Card>
        </div>
        <div className={styles.presentationFilm__raiting}>
          <Card
            headStyle={{ textAlign: "center", border: "none" }}
            bodyStyle={{ textAlign: "center", padding: 0 }}
            bordered={false}
            title="IMDB"
          >
            <p
              className={`${styles.presentationFilm__raitingNumber} ${
                styles[setClassForRaiting(selectFilm?.ratingImdb)]
              }`}
            >
              {selectFilm?.ratingImdb}
            </p>
          </Card>
          <Card
            headStyle={{ textAlign: "center", border: "none" }}
            bodyStyle={{ textAlign: "center", padding: 0 }}
            bordered={false}
            title="Kinopoisk"
          >
            <p
              className={`${styles.presentationFilm__raitingNumber} ${
                styles[setClassForRaiting(selectFilm?.ratingKinopoisk)]
              }`}
            >
              {selectFilm?.ratingKinopoisk}
            </p>
          </Card>
        </div>
      </div>
      <div className={styles.description}>
        <div className={styles.description__header}>
          <h1 className={styles.description__headerTitle}>
            {selectFilm?.nameRu ? selectFilm.nameRu : selectFilm?.nameEn}
            {selectFilm?.nameOriginal ? ` (${selectFilm.nameOriginal})` : ""}
          </h1>
          <p className={styles.description__headerYear}>
            {selectFilm?.year} г.
          </p>
          <p className={styles.description__headerSlogan}>
            {selectFilm?.slogan}
          </p>
        </div>
        <div className={styles.description__content}>
          <div className={styles.description__aboutFilm}>
            <h3 className={styles.description__aboutFimTitle}>О фильме</h3>
            <div className={styles.description__aboutFilmTable}>
              <div className={styles.description__aboutFilmTableItem}>
                Страна
              </div>
              <div className={styles.description__aboutFilmTableDescription}>
                {selectFilm?.countries.map((element) => element.country).join()}
              </div>
              <div className={styles.description__aboutFilmTableItem}>
                Длительность фильма
              </div>
              <div className={styles.description__aboutFilmTableDescription}>
                {selectFilm?.filmLength} мин.
              </div>
              <div className={styles.description__aboutFilmTableItem}>3D</div>
              <div className={styles.description__aboutFilmTableDescription}>
                {selectFilm?.has3D ? "Доступен" : "Недоступен"}
              </div>
              <div className={styles.description__aboutFilmTableItem}>IMax</div>
              <div className={styles.description__aboutFilmTableDescription}>
                {selectFilm?.hasImax ? "Доступен" : "Недоступен"}
              </div>
              <div className={styles.description__aboutFilmTableItem}>
                Возраст
              </div>
              <div className={styles.description__aboutFilmTableDescription}>
                {selectFilm?.ratingAgeLimits}+
              </div>
              <div className={styles.description__aboutFilmTableItem}>
                Описание
              </div>
              <div className={styles.description__aboutFilmTableDescription}>
                {selectFilm?.description}
              </div>
            </div>
          </div>
          <div className="description__nav"></div>
        </div>
      </div>
    </div>
  );
};

export default FilmItem;
