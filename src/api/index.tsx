import axios, { AxiosResponse } from "axios";
import { TData, TGenreFilm, TTopFilm } from "../redux/slices/filmsTopSlice";

type TCategories = {
  genres: TGenre[];
};

export type TGenre = {
  id: number;
  genre: string;
};

const instance = axios.create({
  baseURL: "https://kinopoiskapiunofficial.tech/api/v2.2/films",
  headers: {
    "X-API-KEY": "da939efc-f1df-48db-92a8-f687212274b5",
    "Content-Type": "application/json",
  },
});

const getTopFilms = async (currentPage: number, categoriesArgs?: string) => {
  let categories = categoriesArgs;

  if (!categories) {
    categories = "TOP_250_BEST_FILMS";
  }

  const data = await instance
    .get(`/top?type=${categories}&page=${currentPage}`)
    .then((response) => {
      const { films, pagesCount }: TData = response.data;
      return { films, pagesCount };
    });

  return data;
};

const getCategories = async () => {
  const data = await instance.get("/filters").then((response) => {
    const { genres }: TCategories = response.data;
    return { genres };
  });

  return data;
};

const getListFilmsByGenre = async (currentPage: number, genreArgs?: string) => {
  let genre = Number(genreArgs);

  if (!genre) {
    genre = 1;
  }
  const data = await instance
    .get(
      `?genres=${genreArgs}&order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=${currentPage}`
    )
    .then((response) => {
      const { items, totalPages }: { items: TGenreFilm[]; totalPages: number } =
        response.data;
      return { items, totalPages };
    });
  return data;
};

export default { getTopFilms, getCategories, getListFilmsByGenre };
