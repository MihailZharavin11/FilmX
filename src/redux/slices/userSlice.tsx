import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fireBaseAuth from "../../fireBaseAuth";

enum LoadingStatus {
  IDLE = "idle",
  LOADING = "loading",
  ERROR = "error",
}

interface IUserSlice {
  email: string | null;
  token: string | null;
  id: string | null;
  error: string | null;
  loadingStatus: LoadingStatus;
}

const initialState: IUserSlice = {
  email: null,
  token: null,
  id: null,
  error: null,
  loadingStatus: LoadingStatus.IDLE,
};

export const createNewUser = createAsyncThunk<
  void,
  { email: string; password: string },
  { rejectValue: string }
>(
  "user/createNewUser",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const user = await fireBaseAuth
        .registration(email, password)
        .then((response) => {
          return response;
        });
      if (user) {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );
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
      const user = await fireBaseAuth
        .logIn(email, password)
        .then((response) => {
          return response;
        });
      if (user) {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );
      }
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
    }
  }
);

const handlePendingStatus = (state: IUserSlice) => {
  state.loadingStatus = LoadingStatus.LOADING;
};

const handleFulfilledStatus = (state: IUserSlice) => {
  state.loadingStatus = LoadingStatus.IDLE;
  state.error = "";
};

const handleRejectedStatus = (state: IUserSlice, action: string) => {
  state.loadingStatus = LoadingStatus.ERROR;
  state.error = action;
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removeUser: (state) => {
      state.email = null;
      state.token = null;
      state.id = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewUser.pending, handlePendingStatus)
      .addCase(createNewUser.fulfilled, handleFulfilledStatus)
      .addCase(createNewUser.rejected, (state, action) => {
        if (action.payload) {
          handleRejectedStatus(state, action.payload);
        }
      })
      .addCase(userLogIn.pending, handlePendingStatus)
      .addCase(userLogIn.fulfilled, handleFulfilledStatus)
      .addCase(userLogIn.rejected, (state, action) => {
        if (action.payload) {
          handleRejectedStatus(state, action.payload);
        }
      });
  },
});

const { reducer, actions } = userSlice;

export default reducer;

export const { setUser, removeUser } = actions;
