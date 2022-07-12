import React, { useEffect } from 'react';
import { Film } from '../../redux/slices/filmsTopSlice';
import FilmItem from '../FilmItem/FilmItem';

type FilmContentProps = {
  films: Film[];
};

const FilmContent: React.FC<FilmContentProps> = ({ films }) => {
  const renderFilmItem = films.map((element) => (
    <FilmItem
      key={element.id}
      title={element.title}
      imDbRating={element.imDbRating}
      image={element.image}
    />
  ));

  return <div>{renderFilmItem}</div>;
};

export default FilmContent;
