import React from "react";
import styles from "./cardInnerList.module.scss";

type CardInnerListProps = {
  title: string;
  children: JSX.Element;
};
const CardInnerList: React.FC<CardInnerListProps> = ({ title, children }) => {
  return (
    <div className={styles.description__nav}>
      <h3>{title}</h3>
      {children}
    </div>
  );
};

export default CardInnerList;
