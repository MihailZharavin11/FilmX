import { Button, Tooltip } from "antd";
import React from "react";
import { setClassForRaiting } from "../../lib/raitingFunc";
import styles from "./selectedFilmCard.module.scss";
import { useNavigate } from "react-router-dom";
import { TCountry } from "../../api/APItypes";

type TSelectedFilmCardProps = {
  id: number;
  number: number;
  image: string;
  nameRu: string;
  nameEn: string;
  nameOriginal: string;
  year: number;
  filmLength: number;
  countries: TCountry[];
  raiting: number;
  deleteButtonHandler: (id: number) => void;
  children: JSX.Element;
};

export const SelectedFilmCard: React.FC<TSelectedFilmCardProps> = ({
  id,
  number,
  image,
  nameRu,
  nameEn,
  nameOriginal,
  year,
  filmLength,
  countries,
  raiting,
  deleteButtonHandler,
  children,
}) => {
  const navigate = useNavigate();

  const trimTitle = (cardTitle: string) => {
    return cardTitle.length > 20 ? (
      <Tooltip title={cardTitle}>{cardTitle.substring(0, 20) + "..."}</Tooltip>
    ) : (
      cardTitle
    );
  };

  return (
    <div
      onClick={() => navigate(`/films/${id}`)}
      className={styles.cardWrapper}
    >
      <div className={styles.cardNumber}>
        <h1>{number + 1}</h1>
      </div>
      <div className={styles.cardImmage}>
        <img src={image} alt="Poster" />
      </div>
      <div className={styles.cardDescription}>
        <h1 className={styles.cardTitle}>{trimTitle(nameRu || nameEn)}</h1>
        <p className={styles.cardSubTitle}>
          {nameEn || nameOriginal}, {year}, {filmLength} мин.
        </p>
        <p>
          {countries.map((country, index) => {
            if (countries.length === index + 1) {
              return country.country;
            }
            return country.country + ", ";
          })}
        </p>
        <p className={`${setClassForRaiting(raiting)} ${styles.cardRaiting}`}>
          {raiting}
        </p>
      </div>
      <div className={styles.cardButton}>
        {children}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            deleteButtonHandler(id);
          }}
          danger
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
