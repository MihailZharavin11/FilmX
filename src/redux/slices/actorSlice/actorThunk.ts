import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";
import { setActor } from "./actorSlice";

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
