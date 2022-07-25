import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFilmInfo } from "../../redux/slices/filmItemSlice";
import { useAppDispatch } from "../../redux/store";
import styles from "./filmItem.module.scss";

const FilmItem = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!id) return;
    dispatch(getFilmInfo(id));
  });

  return (
    <div className={styles.wrapper}>
      <div className="image">img</div>
      <div className="description">desc</div>
    </div>
  );
};

export default FilmItem;
