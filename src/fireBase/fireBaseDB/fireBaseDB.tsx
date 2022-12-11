import { getAuth } from "firebase/auth";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";

export const addMovieToDB = (url: string, id: number) => {
  const db = getDatabase();
  const keyForRef = push(ref(db, url));
  set(keyForRef, {
    id,
  });
};

export const removeMovieFromDB = (url: string, id: number) => {
  const db = getDatabase();
  const refFavoriteMov = ref(db, url);
  onValue(
    refFavoriteMov,
    (snapshot) => {
      snapshot.forEach((element) => {
        const favFilmVal = element.val();
        if (favFilmVal.id === id) {
          remove(element.ref);
        }
      });
    },
    {
      onlyOnce: true,
    }
  );
};
