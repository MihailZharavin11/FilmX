import { Avatar, List } from "antd";
import React from "react";
import { IActorsById } from "../../../redux/slices/filmItemSlice";
import styles from "./filmList.module.scss";

type FilmListProps = {
  title: string;
  children: JSX.Element;
};
const FilmList: React.FC<FilmListProps> = ({ title, children }) => {
  return (
    <div className="description__nav">
      <h3>{title}</h3>
      {children}
    </div>
  );
};

export default FilmList;
