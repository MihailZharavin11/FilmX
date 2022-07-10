import axios from 'axios';

const getTopFilms = async () => {
  const films = await axios
    .get('https://imdb-api.com/en/API/Top250TVs/k_gbwirt8c')
    .then((response) => {
      const data = response.data.items;
      return data;
    });
  return films;
};

export default { getTopFilms };
