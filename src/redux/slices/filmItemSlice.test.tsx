import api from "../../api";
import { getFilmInfo, LoadingStatus } from "./filmItemSlice";
import filmItemReducer from "./filmItemSlice";
import { IFilm } from "../../api/APItypes";

jest.mock("../../api");

const apiMock = api as jest.Mocked<typeof api>;

const result: IFilm = {
  kinopoiskId: 301,
  imdbId: "tt0133093",
  nameRu: "Матрица",
  nameEn: "The Matrix",
  nameOriginal: "The Matrix",
  posterUrl: "https://kinopoiskapiunofficial.tech/images/posters/kp/301.jpg",
  posterUrlPreview:
    "https://kinopoiskapiunofficial.tech/images/posters/kp_small/301.jpg",
  coverUrl:
    "https://avatars.mds.yandex.net/get-ott/1672343/2a0000016cc7177239d4025185c488b1bf43/orig",
  logoUrl:
    "https://avatars.mds.yandex.net/get-ott/1648503/2a00000170a5418408119bc802b53a03007b/orig",
  reviewsCount: 293,
  ratingGoodReview: 88.9,
  ratingGoodReviewVoteCount: 257,
  ratingKinopoisk: 8.5,
  ratingKinopoiskVoteCount: 524108,
  ratingImdb: 8.7,
  ratingImdbVoteCount: 1729087,
  ratingFilmCritics: 7.8,
  ratingFilmCriticsVoteCount: 155,
  ratingAwait: 7.8,
  ratingAwaitCount: 2,
  ratingRfCritics: 7.8,
  ratingRfCriticsVoteCount: 31,
  webUrl: "https://www.kinopoisk.ru/film/301/",
  year: 1999,
  filmLength: 136,
  slogan: "Добро пожаловать в реальный мир",
  description: "Жизнь Томаса Андерсона разделена на две части:",
  shortDescription:
    "Хакер Нео узнает, что его мир — виртуальный. Выдающийся экшен, доказавший, что зрелищное кино может быть умным",
  editorAnnotation:
    "Фильм доступен только на языке оригинала с русскими субтитрами",
  isTicketsAvailable: false,
  productionStatus: "POST_PRODUCTION",
  type: "FILM",
  ratingMpaa: "r",
  ratingAgeLimits: "age16",
  hasImax: false,
  has3D: false,
  lastSync: new Date("2021-07-29T20:07:49.109817"),
  countries: [
    {
      country: "США",
    },
  ],
  genres: [
    {
      genre: "фантастика",
    },
  ],
  startYear: 1996,
  endYear: 1996,
  serial: false,
  shortFilm: false,
  completed: false,
};

describe("test filmItemSlice", () => {
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();
  const initialState = {
    selectFilm: null,
    actors: [],
    loadingStatus: LoadingStatus.IDLE,
    error: null,
    moviePictures: [],
  };

  test("testing thunk getFilmInfo with resolved", async () => {
    const thunk = getFilmInfo("435");

    apiMock.getFilmById.mockResolvedValue(result);

    await thunk(dispatchMock, getStateMock, {});

    const { calls } = dispatchMock.mock;

    const [start, middle, end] = calls;
    expect(start[0].type).toBe("filmItem/getFilmInfo/pending");
    expect(middle[0].type).toBe("filmItem/addItemFilm");
    expect(middle[0].payload).toBe(result);
    expect(end[0].type).toBe("filmItem/getFilmInfo/fulfilled");
  });

  test("testing thunk getFilmInfo with rejected", async () => {
    const thunk = getFilmInfo("435");

    apiMock.getFilmById.mockRejectedValue(new Error("error"));

    await thunk(dispatchMock, getStateMock, {});

    const { calls } = dispatchMock.mock;

    const [start, middle] = calls;
    expect(start[0].type).toBe("filmItem/getFilmInfo/pending");
    expect(middle[0].type).toBe("filmItem/getFilmInfo/rejected");
    expect(middle[0].payload).toBe("error");
  });

  test("testing change status with getFilmInfo.pending actions", () => {
    const state = filmItemReducer(initialState, getFilmInfo.pending("", ""));
    expect(state.loadingStatus).toBe(LoadingStatus.LOADING);
  });

  test("testing change status with getFilmInfo.fullfilled actions", () => {
    let nothing: void = undefined;
    const state = filmItemReducer(
      initialState,
      getFilmInfo.fulfilled(nothing, "", "")
    );
    expect(state.loadingStatus).toBe(LoadingStatus.IDLE);
  });

  test("testing change status with getFilmInfo.rejected actions", () => {
    const state = filmItemReducer(
      initialState,
      getFilmInfo.rejected(
        new Error("error"),
        "something",
        "something",
        "error"
      )
    );
    expect(state.loadingStatus).toBe("error");
    expect(state).toEqual({
      selectFilm: null,
      loadingStatus: LoadingStatus.ERROR,
      error: "error",
    });
  });
});
