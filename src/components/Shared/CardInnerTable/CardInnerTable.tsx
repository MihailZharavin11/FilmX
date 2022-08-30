import React from "react";
import { TDescriptionValue } from "../../../redux/slices/filmItemSlice";
import CardInnerTableItem from "../CardInnerTableItem/CardInnerTableItem";
import styles from "./cardInnerTable.module.scss";

type CardInnerTableProps = {
  contentArray: TDescriptionValue[];
};

const CardInnerTable: React.FC<CardInnerTableProps> = ({ contentArray }) => {
  return (
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
  );
};

export default CardInnerTable;
