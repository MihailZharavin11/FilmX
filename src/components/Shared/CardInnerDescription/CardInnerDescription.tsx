import React from "react";
import { TDescriptionValue } from "../../../redux/slices/filmItemSlice";
import CardInnerTable from "../CardInnerTable/CardInnerTable";
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
      <CardInnerTable contentArray={contentArray} />
    </div>
  );
};

export default CardInnerDescription;
