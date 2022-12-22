import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api";
import {
  TFilmSearchByFiltersResponse_items,
  TFilmSearchResponse_films,
  TParamsToSearchFilm,
} from "../../api/APItypes";

interface ISearchState {
  quickSearchMovie: TFilmSearchResponse_films[];
  deepSearch: TFilmSearchByFiltersResponse_items[];
  total: number | null;
  error: string;
  loadingStatus: LoadingStatus;
}

enum LoadingStatus {
  IDLE = "idle",
  LOADING = "loading",
  ERROR = "error",
}

const initialState: ISearchState = {
  quickSearchMovie: [],
  deepSearch: [],
  total: null,
  error: "",
  loadingStatus: LoadingStatus.IDLE,
};

const handlePendingStatus = (state: ISearchState) => {
  state.loadingStatus = LoadingStatus.LOADING;
};

const handleFulfilledStatus = (state: ISearchState) => {
  state.loadingStatus = LoadingStatus.IDLE;
  state.error = "";
};

const handleRejectedStatus = (state: ISearchState, action: string) => {
  state.loadingStatus = LoadingStatus.ERROR;
  state.error = action;
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addQuickSearchMovie: (
      state,
      action: PayloadAction<TFilmSearchResponse_films[]>
    ) => {
      state.quickSearchMovie = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    addDeepSearchMovie: (
      state,
      action: PayloadAction<TFilmSearchByFiltersResponse_items[]>
    ) => {
      state.deepSearch = action.payload;
    },
    addTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
    clearQuickSearchMovie: (state) => {
      state.quickSearchMovie = [];
    },
    clearDeepSearchMovie: (state) => {
      state.deepSearch = [];
      state.total = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchFilm.pending, handlePendingStatus)
      .addCase(searchFilm.fulfilled, handleFulfilledStatus)
      .addCase(searchFilm.rejected, (state, action) => {
        if (action.payload) {
          state.loadingStatus = LoadingStatus.ERROR;
          handleRejectedStatus(state, action.payload);
        }
      })
      .addCase(deepSearchFilm.pending, handlePendingStatus)
      .addCase(deepSearchFilm.fulfilled, handleFulfilledStatus)
      .addCase(deepSearchFilm.rejected, (state, action) => {
        if (action.payload) {
          state.loadingStatus = LoadingStatus.ERROR;
          handleRejectedStatus(state, action.payload);
        }
      });
  },
});

export const searchFilm = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("films/searchFilm", async (searchValue, { dispatch, rejectWithValue }) => {
  try {
    const { films } = await api.getFilmByKeyWords(searchValue);
    if (films.length > 0) {
      dispatch(addQuickSearchMovie(films));
    } else {
      dispatch(clearQuickSearchMovie());
    }
  } catch (err) {
    if (err instanceof Error) {
      dispatch(setError(err.message));
      return rejectWithValue(err.message);
    } else {
      console.log("Error", err);
    }
  }
});

export const deepSearchFilm = createAsyncThunk<
  void,
  { paramsToSearch: TParamsToSearchFilm; page: number },
  { rejectValue: string }
>(
  "films/deepSearchFilm",
  async ({ paramsToSearch, page }, { dispatch, rejectWithValue }) => {
    try {
      const foundMovies = await api.getFilmsBySearch(paramsToSearch, page);
      const { items, total } = foundMovies;
      dispatch(addDeepSearchMovie(items));
      dispatch(addTotal(total));
    } catch (err) {
      if (err instanceof Error) {
        dispatch(setError(err.message));
        return rejectWithValue(err.message);
      } else {
        console.log("Error", err);
      }
    }
  }
);

const { reducer, actions } = searchSlice;

export default reducer;

export const {
  addQuickSearchMovie,
  setError,
  addDeepSearchMovie,
  addTotal,
  clearQuickSearchMovie,
  clearDeepSearchMovie,
} = actions;
