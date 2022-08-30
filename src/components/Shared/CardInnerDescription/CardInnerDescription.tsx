import React from "react";
import { TDescriptionValue } from "../../../redux/slices/filmItemSlice";
import CardInnerTableItem from "../CardInnerTableItem/CardInnerTableItem";
import styles from "./cardInnerDescription.module.scss";

type FilmDescriptionProps = {
  title: string;
  contentArray: TDescriptionValue[];
};

const CardInnerDescription: React.FC<FilmDescriptionProps> = ({
  title,
  contentArray,
}) => {
  return (
    <div className={styles.description__aboutFilm}>
      <h3 className={styles.description__aboutFimTitle}>{title}</h3>
      <div className={styles.description__aboutFilmTable}>
        {contentArray.map((element) => {
          if (element.title && element.value) {
            return (
              <CardInnerTableItem title={element.title} value={element.value} />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default CardInnerDescription;
