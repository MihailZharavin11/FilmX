export interface ImageResponse {
  total: number;
  totalPages: number;
  items: IMoviePictures[];
}

export interface IResponseTopFilms {
  films: TTopFilm[];
  pagesCount: number;
}

export interface FilmSearchResponse {
  keyword: string;
  pagesCount: number;
  searchFilmsCountResult: number;
  films: FilmSearchResponse_films[];
}

export type FilmSearchResponse_films = {
  filmId: number;
  nameRu: string;
  nameEn: string;
  type: string;
  year: string;
  description: string;
  filmLength: string;
  countries: TCountry[];
  genres: TGenre[];
  rating: string;
  ratingVoteCount: number;
  posterUrl: string;
  posterUrlPreview: string;
};

export type IMoviePictures = {
  imageUrl: string;
  previewUrl: string;
};

export type TTopFilm = {
  filmId: number;
  nameRu: string;
  nameEn: string;
  year: string;
  filmLength: string;
  countries: TCountry[];
  genres: TGenre[];
  rating: string;
  ratingVoteCount: number;
  posterUrl: string;
  posterUrlPreview: string;
  ratingChange?: any;
};

export type TCountry = {
  country: string;
};

export type TGenre = {
  genre: string;
};
