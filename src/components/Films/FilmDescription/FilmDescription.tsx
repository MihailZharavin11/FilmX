import React from "react";
import { useAppSelector } from "../../../redux/store";
import styles from "./filmDescription.module.scss";

const FilmDescription = () => {
  const { selectFilm } = useAppSelector((state) => state.filmItem);

  return (
    <div className={styles.description__aboutFilm}>
      <h3 className={styles.description__aboutFimTitle}>О фильме</h3>
      <div className={styles.description__aboutFilmTable}>
        <div className={styles.description__aboutFilmTableItem}>Страна</div>
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
        <div className={styles.description__aboutFilmTableItem}>Возраст</div>
        <div className={styles.description__aboutFilmTableDescription}>
          {selectFilm?.ratingAgeLimits}+
        </div>
        <div className={styles.description__aboutFilmTableItem}>Описание</div>
        <div className={styles.description__aboutFilmTableDescription}>
          {selectFilm?.description}
        </div>
      </div>
    </div>
  );
};

export default FilmDescription;
