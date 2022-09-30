import React from "react";
import styles from "./cardInner.module.scss";

type CardInnerProps = {
  image: JSX.Element;
  header: JSX.Element;
  description: JSX.Element;
  list: JSX.Element;
  movieImages?: JSX.Element;
};

const CardInner: React.FC<CardInnerProps> = ({
  image,
  header,
  description,
  list,
  movieImages,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.film}>
        <div className={styles.film__image}>{image}</div>
        <div className={styles.film__description}>
          {header}
          <div className={styles.description__content}>
            {description}
            {list}
          </div>
        </div>
      </div>
      {movieImages}
    </div>
  );
};

export default CardInner;
