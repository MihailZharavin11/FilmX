import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTopFilms } from "../../redux/slices/filmsTopSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Col, Pagination, PaginationProps, Row, Spin } from "antd";
import FilmCard from "../Films/FilmCard/FilmCard";
import styles from "./filmsByTop.module.scss";

export const FilmsByTop = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();
  const { filmsByTop, totalPage, loadingStatus } = useAppSelector(
    (state) => state.films
  );
  let { categories } = useParams();

  useEffect(() => {
    dispatch(getTopFilms({ categories, currentPage }));
  }, [categories, dispatch, currentPage]);

  if (loadingStatus === "loading") {
    return <Spin className={styles.loading} size="large" />;
  }

  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrentPage(page);
    window.scroll(0, 0);
  };

  return (
    <div>
      <Row className={styles.film_row} gutter={[0, 30]}>
        {filmsByTop?.map((element) => (
          <Col
            className={styles.column}
            key={element.filmId}
            lg={{ span: 4, offset: 1 }}
            md={{ span: 8, offset: 0 }}
            sm={{ span: 12, offset: 1 }}
            xs={{ span: 24, offset: 0 }}
          >
            <FilmCard
              key={element.filmId}
              id={element.filmId}
              posterUrlPreview={element.posterUrlPreview}
              rating={element.rating}
              title={element.nameEn}
            />
          </Col>
        ))}
      </Row>
      <Row className={styles.pagination_row}>
        <Col>
          <Pagination
            className={styles.pagination_row}
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
