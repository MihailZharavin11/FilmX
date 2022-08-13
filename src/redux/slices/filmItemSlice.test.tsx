import api from "../../api";
import { getFilmInfo, IFilmById, LoadingStatus } from "./filmItemSlice";
import filmItemReducer from "./filmItemSlice";

jest.mock("../../api");

const apiMock = api as jest.Mocked<typeof api>;

const result: IFilmById = {
  countries: [
    {
      country: "США",
    },
  ],
  description: `Пол Эджкомб — начальник блока смертников в тюрьме «Холодная гора», 
  каждый из узников которого однажды проходит «зеленую милю» по пути к месту казни. 
  Пол повидал много заключённых и надзирателей за время работы. 
  Однако гигант Джон Коффи, обвинённый в страшном преступлении, 
  стал одним из самых необычных обитателей блока.`,
  slogan: "Пол Эджкомб не верил в чудеса. Пока не столкнулся с одним из них",
  filmLength: 189,
  genres: [
    {
      genre: "драма",
    },
    {
      genre: "криминал",
    },
  ],
  has3D: false,
  hasImax: false,
  nameRu: "Зеленая миля",
  nameEn: "null",
  nameOriginal: "The Green Mile",
  posterUrl: "https://kinopoiskapiunofficial.tech/images/posters/kp/435.jpg",
  posterUrlPreview:
    "https://kinopoiskapiunofficial.tech/images/posters/kp_small/435.jpg",
  ratingKinopoisk: 9.1,
  ratingImdb: 8.6,
  ratingAgeLimits: 16,
  type: "FILM",
  year: 1999,
};

describe("test filmItemSlice", () => {
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();
  const initialState = {
    selectFilm: null,
    loadingStatus: LoadingStatus.IDLE,
    error: null,
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
