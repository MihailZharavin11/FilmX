import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../../api';

export interface IFilmsState {
  topFilms: Film[] | [];
  error: string;
  loadingStatus: LoadingStatus;
}

enum LoadingStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  ERROR = 'error',
}

type Film = {
  id: string;
  rank: string;
  title: string;
  fullTitle: string;
  year: string;
  image: string;
  crew: string;
  imDbRating: string;
  imDbRatingCount: string;
};

const initialState: IFilmsState = {
  topFilms: [],
  error: '',
  loadingStatus: LoadingStatus.IDLE,
};

export const getFilms = createAsyncThunk<void, void, { rejectValue: string }>(
  'films/getFilms',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const films: Film[] = await api.getTopFilms();
      dispatch(addFilms(films));
    } catch (err) {
      if (err instanceof Error) {
        dispatch(setError(err.message));
        return rejectWithValue(err.message);
      } else {
        console.log('Unexpected error', err);
      }
    }
  },
);

const handlePendingStatus = (state: IFilmsState) => {
  state.loadingStatus = LoadingStatus.LOADING;
};

const handleFulfilledStatus = (state: IFilmsState) => {
  state.loadingStatus = LoadingStatus.IDLE;
  state.error = '';
};

const handleRejectedStatus = (state: IFilmsState, action: string) => {
  state.loadingStatus = LoadingStatus.ERROR;
  state.error = action;
  debugger;
};

const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    addFilms: (state, action) => {
      state.topFilms = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFilms.pending, handlePendingStatus)
      .addCase(getFilms.fulfilled, handleFulfilledStatus)
      .addCase(getFilms.rejected, (state, action) => {
        state.loadingStatus = LoadingStatus.ERROR;
        if (action.payload) {
          handleRejectedStatus(state, action.payload);
        }
      });
  },
});

const { reducer, actions } = filmsSlice;

export default reducer;

export const { addFilms, setError } = actions;
