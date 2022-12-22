import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import api from "../../api";
import { IPersonResponse } from "../../api/APItypes";
import { RootState } from "../store";
import { LoadingStatus } from "./filmItemSlice";

export interface IActorItemSlice {
  selectActors: null | IPersonResponse;
  loadingStatus: LoadingStatus;
  error: null | string;
}

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
      debugger;
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
  state.error = null;
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
        value: selectActors?.films.length || "",
      },
    ];
    return descriptionValue;
  }
);

const { reducer, actions } = actorSlice;

export default reducer;

export const { setActor } = actions;
