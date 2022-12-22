import api from "../../api";
import { LoadingStatus } from "./filmItemSlice";
import {
  getMovieByGenre,
  getTopFilms,
  IFilmsState,
  TGenreFilm,
} from "./filmsTopSlice";
import filmsReducer from "../slices/filmsTopSlice";
import {
  TFilmSearchByFiltersResponse_items,
  TFilmSearchResponse_films,
  IResponseTopFilms,
  TTopFilm,
} from "../../api/APItypes";

jest.mock("../../api");
const apiMock = api as jest.Mocked<typeof api>;

const films: TTopFilm = {
  filmId: 123,
  filmLength: "167",
  rating: "8,9",
  ratingChange: "8,2",
  ratingVoteCount: 8,
  year: "1998",
  countries: [
    {
      country: "США",
    },
  ],
  genres: [
    {
      genre: "драма",
    },
    {
      genre: "криминал",
    },
  ],
  nameRu: "Зеленая миля",
  nameEn: "null",
  posterUrl: "https://kinopoiskapiunofficial.tech/images/posters/kp/435.jpg",
  posterUrlPreview:
    "https://kinopoiskapiunofficial.tech/images/posters/kp_small/435.jpg",
};

const genreFilm: TFilmSearchByFiltersResponse_items = {
  countries: [
    {
      country: "USA",
    },
  ],
  genres: [
    {
      genre: "драма",
    },
  ],
  imdbId: "8.0",
  kinopoiskId: 8.8,
  nameEn: "Game of Thrones",
  nameOriginal: "Game of Thrones",
  nameRu: "Игра престолов",
  posterUrl: "img",
  posterUrlPreview: "img",
  ratingImdb: 8.2,
  ratingKinopoisk: 8.8,
  type: "FILM",
  year: 2013,
};

const result: IResponseTopFilms = {
  films: [films],
  pagesCount: 1,
};

describe("test FilmsTopSlice", () => {
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();
  const thunk = getTopFilms({
    categories: "nameOfCategories",
    currentPage: 1,
  });

  const initialState: IFilmsState = {
    filmsByTop: [],
    filmsByGenre: [],
    error: "",
    loadingStatus: LoadingStatus.IDLE,
    totalPage: 0,
  };

  test("testing thunk getTopFilms with resolved", async () => {
    apiMock.getTopFilms.mockResolvedValue(result);

    await thunk(dispatchMock, getStateMock, {});

    const { calls } = dispatchMock.mock;

    const [firstСall, secondСall, thirdCall, fourthCall] = calls;

    expect(firstСall[0].type).toBe("films/getFilms/pending");
    expect(secondСall[0].type).toBe("films/addTopFilms");
    expect(thirdCall[0].type).toBe("films/addTotalPage");
    expect(thirdCall[0].payload).toBe(1);
    expect(fourthCall[0].type).toBe("films/getFilms/fulfilled");
  });

  test("testing thunk getTopFilms with rejected", async () => {
    apiMock.getTopFilms.mockRejectedValue(new Error("error"));
    await thunk(dispatchMock, getStateMock, {});
    const { calls } = dispatchMock.mock;

    const [firstCall, secondCall, thirdCall] = calls;

    expect(firstCall[0].type).toBe("films/getFilms/pending");
    expect(secondCall[0].type).toBe("films/setError");
    expect(secondCall[0].payload).toBe("error");
    expect(thirdCall[0].type).toBe("films/getFilms/rejected");
  });

  test("testing change status getTopFilms.pending actions", () => {
    const state = filmsReducer(
      initialState,
      getTopFilms.pending("", { categories: "somethingCat", currentPage: 1 })
    );
    expect(state.loadingStatus).toBe(LoadingStatus.LOADING);
  });

  test("testing change status getTopFilms.fullfilled actions", () => {
    let nothing: void = undefined;
    const state = filmsReducer(
      initialState,
      getTopFilms.fulfilled(nothing, "", {
        categories: "somethingCat",
        currentPage: 1,
      })
    );
    expect(state.loadingStatus).toBe(LoadingStatus.IDLE);
  });

  test("testing change status getTopFilms.rejected actions", () => {
    const state = filmsReducer(
      initialState,
      getTopFilms.rejected(
        new Error("error"),
        "smth",
        { categories: "categories", currentPage: 1 },
        "error"
      )
    );
    expect(state.loadingStatus).toBe(LoadingStatus.ERROR);
    expect(state).toEqual({
      topFilms: [],
      filmsByGenre: [],
      error: "error",
      loadingStatus: LoadingStatus.ERROR,
      totalPage: 0,
    });
  });

  test("testing thunk getMovieByGenre with resolved", async () => {
    const thunk = getMovieByGenre({ genre: "Genre", currentPage: 1 });

    apiMock.getListFilmsByGenre.mockResolvedValue({
      items: [genreFilm],
      totalPages: 1,
    });

    await thunk(dispatchMock, getStateMock, {});

    const { calls } = dispatchMock.mock;

    const [firstCall, secondCall, thirdCall, fourthCall] = calls;

    expect(firstCall[0].type).toBe("films/getMovieByGenre/pending");
    expect(secondCall[0].type).toBe("films/addFilmsByGenre");
    expect(secondCall[0].payload).toEqual([genreFilm]);
    expect(thirdCall[0].type).toBe("films/addTotalPage");
    expect(thirdCall[0].payload).toBe(1);
    expect(fourthCall[0].type).toBe("films/getMovieByGenre/fulfilled");
  });

  test("testing thunk getMovieByGenre with rejected", async () => {
    const thunk = getMovieByGenre({ genre: "Genre", currentPage: 1 });

    apiMock.getFilmById.mockRejectedValue(new Error("error"));

    await thunk(dispatchMock, getStateMock, {});

    const { calls } = dispatchMock.mock;

    const [firstCall, secondCall, thirdCall] = calls;

    expect(firstCall[0].type).toBe("films/getMovieByGenre/pending");
    expect(secondCall[0].type).toBe("films/setError");
    expect(thirdCall[0].type).toBe("films/getMovieByGenre/rejected");
  });
});
