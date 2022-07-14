import axios, { AxiosResponse } from 'axios';
import { TData } from '../redux/slices/filmsTopSlice';

type TCategories = {
  genres: TGenre[];
  countries: TCountry[];
};

export type TGenre = {
  id: number;
  genre: string;
};

export type TCountry = {
  id: number;
  country: string;
};

const instance = axios.create({
  baseURL: 'https://kinopoiskapiunofficial.tech/api/v2.2/films/',
  headers: {
    'X-API-KEY': 'da939efc-f1df-48db-92a8-f687212274b5',
    'Content-Type': 'application/json',
  },
});

const getTopFilms = async (currentPage: number, categoriesArgs?: string) => {
  let categories = categoriesArgs;

  if (!categories) {
    categories = 'TOP_250_BEST_FILMS';
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
  const data = await instance.get('/filters').then((response) => {
    const { genres, countries }: TCategories = response.data;
    return { genres, countries };
  });

  return data;
};

export default { getTopFilms, getCategories };
