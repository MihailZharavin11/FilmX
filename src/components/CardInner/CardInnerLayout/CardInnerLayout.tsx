import React from "react";
import styles from "./cardInnerLayout.module.scss";

type CardInnerProps = {
  image: JSX.Element;
  header: JSX.Element;
  description: JSX.Element;
  list: JSX.Element;
  movieImages?: JSX.Element;
};

export const CardInnerLayout: React.FC<CardInnerProps> = ({
  image,
  header,
  description,
  list,
  movieImages,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.film}>
        <div className={styles.filmImage}>{image}</div>
        <div className={styles.filmDescription}>
          <div className={styles.filmHeader}>{header}</div>
          <div className={styles.descriptionContent}>{description}</div>
        </div>
        <div className={styles.filmActors}>{list}</div>
      </div>
      <div className={styles.filmScreenShot}>{movieImages}</div>
    </div>
  );
};
