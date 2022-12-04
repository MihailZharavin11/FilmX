import React from "react";
import styles from "./cardInnerTableItem.module.scss";

type CardInnerTableItemProps = {
  title: string;
  value: string | number | boolean;
};

const CardInnerTableItem: React.FC<CardInnerTableItemProps> = ({
  title,
  value,
}) => {
  return (
    <>
      <div className={styles.description__aboutFilmTableItem}>{title}</div>
      <div className={styles.description__aboutFilmTableDescription}>
        {value}
      </div>
    </>
  );
};

export default CardInnerTableItem;
