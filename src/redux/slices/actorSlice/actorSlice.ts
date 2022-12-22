import { createSlice } from "@reduxjs/toolkit";
import { LoadingStatus } from "../../reduxGeneralTypes";
import { getActorById } from "./actorThunk";
import { IActorItemSlice } from "./actorTypes";

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

const { reducer, actions } = actorSlice;

export default reducer;

export const { setActor } = actions;
