import { Col, Pagination, PaginationProps, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieByGenre } from "../../redux/slices/filmsTopSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import FilmCard from "../Films/FilmCard/FilmCard";
import styles from "./filmsByGenre.module.scss";

export const FilmsByGenre = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();
  const { filmsByGenre, totalPage, loadingStatus } = useAppSelector(
    (state) => state.films
  );
  const { genre } = useParams();

  useEffect(() => {
    if (genre) {
      dispatch(getMovieByGenre({ genre, currentPage }));
    }
  }, [currentPage, dispatch, genre]);

  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrentPage(page);
    window.scroll(0, 0);
  };

  if (loadingStatus) {
    if (loadingStatus === "loading") {
      return <Spin className={styles.loading} size="large" />;
    }
  }

  return (
    <div>
      <Row className={styles.film_row} gutter={[0, 30]}>
        {filmsByGenre?.map((element) => (
          <Col
            className={styles.column}
            key={element.kinopoiskId}
            lg={{ span: 4, offset: 1 }}
            md={{ span: 8, offset: 0 }}
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
        ))}
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
