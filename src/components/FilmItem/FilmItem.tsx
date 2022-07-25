import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFilmInfo } from "../../redux/slices/filmItemSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import styles from "./filmItem.module.scss";

const FilmItem = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { selectFilm } = useAppSelector((state) => state.filmItem);

  console.log(selectFilm);

  useEffect(() => {
    if (!id) return;
    dispatch(getFilmInfo(id));
  }, [dispatch, id]);

  return (
    <div className={styles.wrapper}>
      <div className="image">img</div>
      <div className="description">desc</div>
    </div>
  );
};

export default FilmItem;
