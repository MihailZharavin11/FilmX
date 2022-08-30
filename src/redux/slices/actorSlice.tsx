import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import api from "../../api";
import { RootState } from "../store";
import { LoadingStatus } from "./filmItemSlice";

export interface IActorItemSlice {
  selectActors: null | TActor;
  loadingStatus: LoadingStatus;
  error: null | string;
}

type TFilmActor = {
  filmId: number;
  nameRu: string;
  nameEn: string;
  rating: string;
  general: true;
  description: string;
  professionKey: string;
};

export type TActor = {
  personId: number;
  nameRu: string;
  nameEn: string;
  posterUrl: string;
  growth: number;
  birthday: string;
  death: null | string;
  age: number;
  films: TFilmActor[];
  filmsLength: number;
  profession: string;
};

export const getActorById = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("actor/getActorById", async (id, { dispatch, rejectWithValue }) => {
  try {
    const actor = await api.getActorInfoById(id);
    dispatch(setActor(actor));
  } catch (err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
  }
});

const initialState: IActorItemSlice = {
  selectActors: null,
  loadingStatus: LoadingStatus.IDLE,
  error: null,
};

const handlePendingStatus = (state: IActorItemSlice) => {
  state.loadingStatus = LoadingStatus.LOADING;
};

const handleFulfilledStatus = (state: IActorItemSlice) => {
  state.loadingStatus = LoadingStatus.IDLE;
  state.error = "";
};

const handleRejectedStatus = (state: IActorItemSlice, action: string) => {
  state.loadingStatus = LoadingStatus.ERROR;
  state.error = action;
};

const actorSlice = createSlice({
  name: "actor",
  initialState,
  reducers: {
    setActor: (state, action) => {
      state.selectActors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getActorById.pending, handlePendingStatus)
      .addCase(getActorById.fulfilled, handleFulfilledStatus)
      .addCase(getActorById.rejected, (state, action) => {
        if (action.payload) {
          handleRejectedStatus(state, action.payload);
        }
      });
  },
});

export const descriptionActorSelector = createSelector(
  (state: RootState) => state.actor.selectActors,
  (selectActors) => {
    const descriptionValue = [
      {
        title: "Возраст",
        value: selectActors?.age || "",
      },
      {
        title: "Профессия",
        value: selectActors?.profession || "",
      },
      {
        title: "Дата рождения",
        value: selectActors?.birthday || "",
      },
      {
        title: "Дата смерти",
        value: selectActors?.death || "",
      },
      {
        title: "Рост",
        value: selectActors?.growth || "",
      },
      {
        title: "Количество фильмов",
        value: selectActors?.filmsLength || "",
      },
    ];
    return descriptionValue;
  }
);

const { reducer, actions } = actorSlice;

export default reducer;

export const { setActor } = actions;
