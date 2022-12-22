import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import filmsSlice from "./slices/filmsTopSlice/filmsTopSlice";
import filmItemSlice from "./slices/filmItemSlice/filmItemSlice";
import searchSlice from "./slices/searchSlice/searchSlice";
import userSlice from "./slices/userSlice/userSlice";
import actorSlice from "./slices/actorSlice/actorSlice";

export const store = configureStore({
  reducer: {
    films: filmsSlice,
    filmItem: filmItemSlice,
    search: searchSlice,
    user: userSlice,
    actor: actorSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
