import React from "react";
import {
  deleteWatchedFilm,
  setWatchedFilm,
} from "../../redux/slices/userSlice/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { EyeTwoTone, EyeOutlined } from "@ant-design/icons";
import {
  addMovieToDB,
  removeMovieFromDB,
} from "../../fireBase/fireBaseDB/fireBaseDB";
import { getAuth } from "firebase/auth";
import styles from "./buttonViewFilm.module.scss";
import { IFilm } from "../../api/APItypes";
import { iconStateSelector } from "../../redux/slices/userSlice/userSelectors";

type ViewButtonProps = {
  film: IFilm | null;
  id: number | undefined;
};

export const ButtonViewFilm: React.FC<ViewButtonProps> = ({ film, id }) => {
  const { checkWatched } = useAppSelector(iconStateSelector(id));
  const dispatch = useAppDispatch();
  const auth = getAuth();
  const user = auth.currentUser;
  const userid = user?.uid;

  const addMovieToWatched = () => {
    if (film && id) {
      dispatch(setWatchedFilm(film));
      addMovieToDB(`users/${userid}/watchedMovie`, id);
    }
  };

  const deleteMovieFromWatched = () => {
    if (id) {
      removeMovieFromDB(`users/${userid}/watchedMovie`, id);
      dispatch(deleteWatchedFilm(id));
    }
  };

  return (
    <>
      {checkWatched ? (
        <EyeTwoTone
          className={styles.icon}
          onClick={(e) => {
            e.stopPropagation();
            deleteMovieFromWatched();
          }}
          key={"eye"}
        />
      ) : (
        <EyeOutlined
          className={styles.icon}
          onClick={(e) => {
            e.stopPropagation();
            addMovieToWatched();
          }}
        />
      )}
    </>
  );
};
