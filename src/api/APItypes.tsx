export interface ImageResponse {
  total: number;
  totalPages: number;
  items: TMoviePictures[];
}

export interface IResponseTopFilms {
  films: TTopFilm[];
  pagesCount: number;
}

export interface IFilmSearchResponse {
  keyword: string;
  pagesCount: number;
  searchFilmsCountResult: number;
  films: TFilmSearchResponse_films[];
}

export interface IFiltersResponse {
  genres: TFiltersResponse_genres[];
  countries: TFiltersResponse_countries[];
}

export interface IFilmSearchByFiltersResponse {
  total: number;
  totalPages: number;
  items: TFilmSearchByFiltersResponse_items[];
}

export interface IFilm {
  kinopoiskId: number;
  imdbId: string;
  nameRu: string;
  nameEn: string;
  nameOriginal: string;
  posterUrl: string;
  posterUrlPreview: string;
  coverUrl: string;
  logoUrl: string;
  reviewsCount: number;
  ratingGoodReview: number;
  ratingGoodReviewVoteCount: number;
  ratingKinopoisk: number;
  ratingKinopoiskVoteCount: number;
  ratingImdb: number;
  ratingImdbVoteCount: number;
  ratingFilmCritics: number;
  ratingFilmCriticsVoteCount: number;
  ratingAwait: number;
  ratingAwaitCount: number;
  ratingRfCritics: number;
  ratingRfCriticsVoteCount: number;
  webUrl: string;
  year: number;
  filmLength: number;
  slogan: string;
  description: string;
  shortDescription: string;
  editorAnnotation: string;
  isTicketsAvailable: boolean;
  productionStatus: string;
  type: string;
  ratingMpaa: string;
  ratingAgeLimits: string;
  hasImax: boolean;
  has3D: boolean;
  lastSync: Date;
  countries: TCountry[];
  genres: TGenre[];
  startYear: number;
  endYear: number;
  serial: boolean;
  shortFilm: boolean;
  completed: boolean;
}

export interface IStaffResponse {
  staffId: number;
  nameRu: string;
  nameEn: string;
  description: string;
  posterUrl: string;
  professionText: string;
  professionKey: string;
}

export interface IPersonResponse {
  personId: number;
  webUrl: string;
  nameRu: string;
  nameEn: string;
  sex: string;
  posterUrl: string;
  growth: string;
  birthday: string;
  death: string;
  age: number;
  birthplace: string;
  deathplace: string;
  hasAwards: number;
  profession: string;
  facts: string[];
  spouses: TPersonResponse_spouses[];
  films: TPersonResponse_films[];
}

export type TFilmSearchResponse_films = {
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

export type TMoviePictures = {
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

export type TFiltersResponse_genres = {
  id: number;
  genre: string;
};

export type TFiltersResponse_countries = {
  id: number;
  country: string;
};

export type TFilmSearchByFiltersResponse_items = {
  kinopoiskId: number;
  imdbId: string;
  nameRu: string;
  nameEn: string;
  nameOriginal: string;
  countries: TCountry[];
  genres: TGenre[];
  ratingKinopoisk: number;
  ratingImdb: number;
  year: number;
  type: "FILM" | "TV_SHOW" | "VIDEO" | "MINI_SERIES" | "TV_SERIES" | "UNKNOWN";
  posterUrl: string;
  posterUrlPreview: string;
};

export type TPersonResponse_spouses = {
  personId: number;
  name: string;
  divorced: boolean;
  divorcedReason: string;
  sex: string;
  children: number;
  webUrl: string;
  relation: string;
};

export type TPersonResponse_films = {
  filmId: number;
  nameRu: string;
  nameEn: string;
  raiting: string;
  general: boolean;
  description: string;
  professionKey: string;
};

export type TParamsToSearchFilm = {
  countries: number | string;
  genres: number | string;
  order: string | string;
  type: string | string;
  raiting: Array<Number> | Array<String>;
  yearFrom: number;
  yearTo: number;
  keyword: string;
};

export type TCountry = {
  country: string;
};

export type TGenre = {
  genre: string;
};
