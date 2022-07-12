import axios from 'axios';
import { Film } from '../redux/slices/filmsTopSlice';

const getTopFilms = async (categoriesArgs?: string) => {
  let categories = categoriesArgs;

  if (!categories) {
    categories = 'Top250TVs';
  }
  const films: Film[] = await axios
    .get(`https://imdb-api.com/en/API/${categories}/k_gbwirt8c`)
    .then((response) => {
      const data: Film[] = response.data.items;
      return data;
    });
  return films;
};

export default { getTopFilms };
