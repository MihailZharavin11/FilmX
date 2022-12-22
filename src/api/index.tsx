import axios from "axios";
import {
  IFilm,
  IFilmSearchByFiltersResponse,
  IFilmSearchResponse,
  IFiltersResponse,
  ImageResponse,
  IResponseTopFilms,
  IPersonResponse,
  IStaffResponse,
  TParamsToSearchFilm,
} from "./APItypes";

const instanceV2_2 = axios.create({
  baseURL: "https://kinopoiskapiunofficial.tech/api/v2.2/films",
  headers: {
    "X-API-KEY": "da939efc-f1df-48db-92a8-f687212274b5",
    "Content-Type": "application/json",
  },
});

const instanceV2_1 = axios.create({
  baseURL: "https://kinopoiskapiunofficial.tech/api/v2.1/films",
  headers: {
    "X-API-KEY": "da939efc-f1df-48db-92a8-f687212274b5",
    "Content-Type": "application/json",
  },
});

const instanceV1 = axios.create({
  baseURL: "https://kinopoiskapiunofficial.tech/api/v1/",
  headers: {
    "X-API-KEY": "da939efc-f1df-48db-92a8-f687212274b5",
    "Content-Type": "application/json",
  },
});

const getTopFilms = async (
  currentPage: number,
  categoriesArgs: string = "TOP_250_BEST_FILMS"
) => {
  const { data } = await instanceV2_2.get<IResponseTopFilms>(
    `/top?type=${categoriesArgs}&page=${currentPage}`
  );

  return data;
};

const getCategoriesAndCountries = async () => {
  const { data } = await instanceV2_2.get<IFiltersResponse>("/filters");
  const { countries, genres } = data;
  return { genres, countries };
};

const getListFilmsByGenre = async (currentPage: number, genreArgs?: string) => {
  let genre = Number(genreArgs);

  if (!genre) genre = 1;

  const { data } = await instanceV2_2.get<IFilmSearchByFiltersResponse>(
    `?genres=${genreArgs}&order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=${currentPage}`
  );

  const { items, totalPages } = data;
  return { items, totalPages };
};

const getFilmById = async (id: string) => {
  const { data } = await instanceV2_2.get<IFilm>(`/${id}`);
  return data;
};

export const getActorsByFilmId = async (id: string) => {
  const { data } = await instanceV1.get<IStaffResponse[]>(`staff?filmId=${id}`);
  return data.slice(0, 5);
};

export const getActorInfoById = async (id: string) => {
  const { data } = await instanceV1.get<IPersonResponse>(`staff/${id}`);
  return data;
};

const getFilmByKeyWords = async (searchValue: string) => {
  const { data } = await instanceV2_1.get<IFilmSearchResponse>(
    `/search-by-keyword?keyword=${searchValue}&page=1`
  );
  return data;
};

const getFilmsBySearch = async (
  {
    countries,
    genres,
    order,
    type,
    raiting,
    yearFrom,
    yearTo,
    keyword,
  }: TParamsToSearchFilm,
  page: number
) => {
  const { data } = await instanceV2_2.get<IFilmSearchByFiltersResponse>(
    `https://kinopoiskapiunofficial.tech/api/v2.2/films?countries=${countries}&genres=${genres}&order=${order}&type=${type}&ratingFrom=${Number(
      raiting[0]
    )}&ratingTo=${Number(
      raiting[1]
    )}&yearFrom=${yearFrom}&yearTo=${yearTo}&keyword=${keyword}&page=${page}`
  );
  return data;
};

const getMoviePictures = async (id: string) => {
  const { data } = await instanceV2_2.get<ImageResponse>(
    `/${id}/images?type=STILL&page=1`
  );
  return data.items;
};

export default {
  getTopFilms,
  getCategoriesAndCountries,
  getListFilmsByGenre,
  getFilmById,
  getFilmByKeyWords,
  getActorsByFilmId,
  getActorInfoById,
  getMoviePictures,
  getFilmsBySearch,
};
