import { getAuth } from "firebase/auth";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { IFilm } from "../../api/APItypes";

export const addMovieToDB = (url: string, film: IFilm) => {
  const db = getDatabase();
  const keyForRef = push(ref(db, url));
  set(keyForRef, film);
};

export const removeMovieFromDB = (url: string, idFilmToDelete: number) => {
  const db = getDatabase();
  const refFavoriteMov = ref(db, url);
  onValue(
    refFavoriteMov,
    (snapshot) => {
      snapshot.forEach((element) => {
        const favFilmVal: IFilm = element.val();
        if (favFilmVal.kinopoiskId === idFilmToDelete) {
          remove(element.ref);
        }
      });
    },
    {
      onlyOnce: true,
    }
  );
};
