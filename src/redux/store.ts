import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import filmsSlice from './slices/filmsTopSlice';
import filmItemSlice from './slices/filmItemSlice';
import searchSlice from './slices/searchSlice';

export const store = configureStore({
  reducer: {
    films: filmsSlice,
    filmItem:filmItemSlice,
    search:searchSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
