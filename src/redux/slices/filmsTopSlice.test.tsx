import api from "../../api";
import { getTopFilms, TData, TTopFilm } from "./filmsTopSlice";

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

const result: TData = {
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
});
