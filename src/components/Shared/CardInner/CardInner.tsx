import React from "react";
import styles from "./cardInner.module.scss";

type CardInnerProps = {
  image: JSX.Element;
  header: JSX.Element;
  description: JSX.Element;
  list: JSX.Element;
};

const CardInner: React.FC<CardInnerProps> = ({
  image,
  header,
  description,
  list,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.presentationFilm}>{image}</div>
      <div className={styles.description}>
        {header}
        <div className={styles.description__content}>
          {description}
          {list}
        </div>
      </div>
    </div>
  );
};

export default CardInner;
