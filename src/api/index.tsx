import axios from "axios";
import { TActor } from "../redux/slices/actorSlice";
import { IActorsById, IFilmById } from "../redux/slices/filmItemSlice";
import { TData, TGenreFilm, TTopFilm } from "../redux/slices/filmsTopSlice";

type TCategories = {
  genres: TGenre[];
};

export type TGenre = {
  id: number;
  genre: string;
};

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

const getTopFilms = async (currentPage: number, categoriesArgs?: string) => {
  let categories = categoriesArgs;

  if (!categories) {
    categories = "TOP_250_BEST_FILMS";
  }

  const data = await instanceV2_2
    .get(`/top?type=${categories}&page=${currentPage}`)
    .then((response) => {
      const { films, pagesCount }: TData = response.data;
      return { films, pagesCount };
    });

  return data;
};

const getCategories = async () => {
  const data = await instanceV2_2.get("/filters").then((response) => {
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
  const data = await instanceV2_2
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

const getFilmById = async (id: string) => {
  const film = await instanceV2_2.get(`/${id}`).then((response) => {
    return response.data;
  });
  const FilmById: IFilmById = {
    countries: film.countries,
    description: film.description,
    filmLength: film.filmLength,
    genres: film.genres,
    has3D: film.has3D,
    hasImax: film.hasImax,
    nameEn: film.nameEn,
    nameOriginal: film.nameOriginal,
    nameRu: film.nameRu,
    posterUrl: film.posterUrl,
    posterUrlPreview: film.posterUrlPreview,
    ratingAgeLimits: parseInt(film.ratingAgeLimits.match(/\d+/)),
    ratingImdb: film.ratingImdb,
    ratingKinopoisk: film.ratingKinopoisk,
    slogan: film.slogan,
    type: film.type,
    year: film.year,
  };
  return FilmById;
};

export const getActorsById = async (id: string) => {
  const foundActors: IActorsById[] = await axios
    .get(`https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${id}`, {
      headers: {
        "X-API-KEY": "da939efc-f1df-48db-92a8-f687212274b5",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    });
  return foundActors.slice(0, 5);
};

export const getActorInfoById = async (id: string) => {
  const actor: TActor = await axios
    .get(`https://kinopoiskapiunofficial.tech/api/v1/staff/${id}`, {
      headers: {
        "X-API-KEY": "da939efc-f1df-48db-92a8-f687212274b5",
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data);
  const foundActor = {
    personId: actor.personId,
    nameRu: actor.nameRu,
    nameEn: actor.nameEn,
    posterUrl: actor.posterUrl,
    growth: actor.growth,
    birthday: new Date(actor.birthday).toLocaleDateString("ru-RU"),
    death: actor.death,
    age: actor.age,
    films: actor.films.slice(0, 5),
    filmsLength: actor.films.length,
    profession: actor.profession,
  };
  debugger;
  return foundActor;
};

const getFilmBySearchValue = async (searchValue: string) => {
  const searchFilmValue: TTopFilm[] = await instanceV2_1
    .get(`/search-by-keyword?keyword=${searchValue}&page=1`)
    .then((response) => {
      const { films } = response.data;
      return films;
    });
  return searchFilmValue;
};

export default {
  getTopFilms,
  getCategories,
  getListFilmsByGenre,
  getFilmById,
  getFilmBySearchValue,
  getActorsById,
  getActorInfoById,
};
