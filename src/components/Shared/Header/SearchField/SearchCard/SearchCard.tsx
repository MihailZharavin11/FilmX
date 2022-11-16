import React from "react";
import { setClassForRaiting } from "../../../../../lib/raitingFunc";
import styles from "./searchCard.module.scss";

type SearchRenderProps = {
  filmId: number;
  posterUrl: string;
  nameEn: string;
  rating: string;
  nameRu: string;
  year: string;
};

const SearchCard: React.FC<SearchRenderProps> = ({
  filmId,
  posterUrl,
  nameEn,
  rating,
  nameRu,
  year,
}) => {
  return (
    <div className={styles.search} key={filmId}>
      <div className={styles.search__image}>
        <img src={posterUrl} alt="poster" />
      </div>
      <div className={styles.search__description}>
        <h4 className={styles.search__descriptionTitle}>{nameEn}</h4>
        <p className={styles.search__descriptionText}>
          <span className={styles.search__descriptionTextRaiting}>
            <span className={styles[setClassForRaiting(Number(rating))]}>
              {rating != null ? rating : "-"}
            </span>
            ,
          </span>
          {nameRu}, {year}
        </p>
      </div>
    </div>
  );
};

export default SearchCard;
