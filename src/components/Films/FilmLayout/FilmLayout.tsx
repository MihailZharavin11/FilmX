import { Col, Pagination, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import {
  getMovieByGenre,
  getTopFilms,
  TGenreFilm,
  TTopFilm,
} from "../../../redux/slices/filmsTopSlice";
import FilmCard from "../FilmCard/FilmCard";
import styles from "./filmLayout.module.scss";
import type { PaginationProps } from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { useParams } from "react-router-dom";

const FilmLayout: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();
  const { films, totalPage, loadingStatus } = useAppSelector(
    (state) => state.films
  );
  let { categories, genre } = useParams();

  useEffect(() => {
    if (categories || (!genre && !categories)) {
      dispatch(getTopFilms({ categories, currentPage }));
    }
    if (genre) {
      dispatch(getMovieByGenre({ genre, currentPage }));
    }
  }, [dispatch, categories, currentPage, genre]);

  if (loadingStatus === "loading") {
    return <Spin className={styles.loading} size="large" />;
  }

  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrentPage(page);
    window.scroll(0, 0);
  };

  const isTopFilm = (film: TTopFilm[] | TGenreFilm[]): film is TTopFilm[] => {
    return (film as TTopFilm[])[0].filmId !== undefined;
  };

  const renderFilmItem = () => {
    if (films) {
      if (isTopFilm(films)) {
        return films.map((element) => (
          <Col
            key={element.filmId}
            className={styles.column}
            lg={{ span: 4, offset: 1 }}
            md={{ span: 8, offset: 0 }}
            sm={{ span: 12, offset: 1 }}
            xs={{ span: 24, offset: 0 }}
          >
            <FilmCard
              key={element.filmId}
              id={element.filmId}
              title={element.nameEn ? element.nameEn : element.nameRu}
              rating={element.rating ? element.rating : element.year}
              posterUrlPreview={element.posterUrlPreview}
            />
          </Col>
        ));
      } else {
        return films.map((element) => (
          <Col
            key={element.kinopoiskId}
            className={styles.column}
            lg={{ span: 6, offset: 0 }}
            md={{ span: 8, offset: 1 }}
            sm={{ span: 12, offset: 1 }}
            xs={{ span: 24, offset: 1 }}
          >
            <FilmCard
              key={element.kinopoiskId}
              id={element.kinopoiskId}
              title={element.nameEn ? element.nameEn : element.nameRu}
              rating={element.ratingKinopoisk}
              posterUrlPreview={element.posterUrlPreview}
            />
          </Col>
        ));
      }
    }
  };

  return (
    <div>
      <Row className={styles.film_row} gutter={[0, 30]}>
        {renderFilmItem()}
      </Row>
      <Row className={styles.pagination_row}>
        <Col>
          <Pagination
            simple
            defaultPageSize={20}
            current={currentPage}
            onChange={onChange}
            total={20 * totalPage}
          />
        </Col>
      </Row>
    </div>
  );
};

export default FilmLayout;
