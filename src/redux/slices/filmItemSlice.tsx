import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";

const initialState = {
  selectFilm: "",
};

export const getFilmInfo = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("filmItem/getFilmInfo", async (id, { dispatch, rejectWithValue }) => {
  try {
    const abc = await api.getFilmById(id);
  } catch (err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    } else {
      console.log("Error", err);
    }
  }
});

const filmtItemSlice = createSlice({
  name: "filmItem",
  initialState,
  reducers: {
    addItemFilm: (state, action) => {
      state.selectFilm = action.payload;
    },
  },
});

const { reducer, actions } = filmtItemSlice;

export default reducer;

export const { addItemFilm } = actions;
