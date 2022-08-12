import api from "../../api";
import { getFilmInfo, IFilmById } from "./filmItemSlice";

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

test("testing thunk getFilmInfo", async () => {
  const thunk = getFilmInfo("435");
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();

  apiMock.getFilmById.mockReturnValue(Promise.resolve(result));

  await thunk(dispatchMock, getStateMock, {});

  const { calls } = dispatchMock.mock;

  const [start, middle, end] = calls;
  expect(start[0].type).toBe("filmItem/getFilmInfo/pending");
  expect(middle[0].type).toBe("filmItem/addItemFilm");
  expect(middle[0].payload).toBe(result);
  expect(end[0].type).toBe("filmItem/getFilmInfo/fulfilled");
});
