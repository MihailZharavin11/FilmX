import axios from 'axios';
import { TData } from '../redux/slices/filmsTopSlice';

const getTopFilms = async (currentPage: number, categoriesArgs?: string) => {
  let categories = categoriesArgs;

  if (!categories) {
    categories = 'TOP_250_BEST_FILMS';
  }

  const data = await axios({
    method: 'GET',
    url: `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=${categories}&page=${currentPage}`,
    headers: {
      'X-API-KEY': 'da939efc-f1df-48db-92a8-f687212274b5',
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    const { films, pagesCount }: TData = response.data;
    return { films, pagesCount };
  });

  return data;
};

export default { getTopFilms };
