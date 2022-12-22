import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";
import api from "../../../api";
import fireBaseAuth from "../../../fireBase/fireBaseAuth";
import {
  clearFavoriteFilms,
  clearWatchedFilms,
  removeUser,
  setFavoriteFilm,
  setUser,
  setWatchedFilm,
} from "./userSlice";

export const fetchUser = createAsyncThunk<
  void,
  { setLoading: (args: boolean) => void },
  { rejectValue: string }
>("user/fetchUser", async ({ setLoading }, { dispatch, rejectWithValue }) => {
  try {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            email: user.email || "",
            id: user.uid,
            token: user.refreshToken,
          })
        );
      }
      setLoading(false);
    });
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
  }
});

export const getDataFromDB = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("user/getDataFromDB", async (id, { dispatch, rejectWithValue }) => {
  try {
    const db = getDatabase();
    const refFavoriteMovie = ref(db, `users/${id}/favoriteMovies`);
    const refWatchedMovie = ref(db, `users/${id}/watchedMovie`);
    onValue(
      refFavoriteMovie,
      (snapshot) => {
        snapshot.forEach((element) => {
          if (element.exists()) {
            api.getFilmById(element.val().id).then((response) => {
              dispatch(setFavoriteFilm(response));
            });
          }
        });
      },
      {
        onlyOnce: true,
      }
    );
    onValue(
      refWatchedMovie,
      (snapshot) => {
        snapshot.forEach((element) => {
          if (element.exists()) {
            api.getFilmById(element.val().id).then((response) => {
              dispatch(setWatchedFilm(response));
            });
          }
        });
      },
      {
        onlyOnce: true,
      }
    );
  } catch (err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
  }
});

export const createNewUser = createAsyncThunk<
  void,
  { email: string; password: string },
  { rejectValue: string }
>(
  "user/createNewUser",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const userToRegister = await fireBaseAuth.registration(email, password);
      if (userToRegister) {
        dispatch(userLogIn({ email, password }));
      }
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const userLogIn = createAsyncThunk<
  void,
  { email: string; password: string },
  { rejectValue: string }
>(
  "user/userLogIn",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const userToLogIn = await fireBaseAuth
        .logIn(email, password)
        .then((response) => {
          return response;
        });
      if (userToLogIn) {
        dispatch(
          setUser({
            email: userToLogIn.email || "",
            id: userToLogIn.uid,
            token: userToLogIn.refreshToken,
          })
        );
        dispatch(getDataFromDB(userToLogIn.uid));
      }
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const userLogOut = createAsyncThunk<void, void, { rejectValue: string }>(
  "user/userLogOut",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const logOut = await fireBaseAuth.signOut();
      if (logOut) {
        dispatch(removeUser());
        dispatch(clearFavoriteFilms());
        dispatch(clearWatchedFilms());
      } else {
        rejectWithValue("Ошибка выхода, попробуйте еще раз...");
      }
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
    }
  }
);
