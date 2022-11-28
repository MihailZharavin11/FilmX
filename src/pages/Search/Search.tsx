import { Col, Pagination, PaginationProps, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { TParamsToSearchFilm } from "../../api";
import FilmCard from "../../components/Films/FilmCard/FilmCard";
import { SearchForm } from "../../components/searchForm/SearchForm";
import { deepSearchFilm } from "../../redux/slices/searchSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import styles from "./search.module.scss";

export type TDeepSearchFilm = {
  searchField: string;
  country: string;
  genre: string;
  sort: string;
  type: string;
  raiting: Array<Number>;
  year: string;
};

export const Search = () => {
  const dispatch = useAppDispatch();
  const [disabled, setDisabled] = useState(false);
  const { deepSearch, total, loadingStatus } = useAppSelector(
    (state) => state.search
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [paramsToSearch, setParamsToSearch] = useState<TParamsToSearchFilm>({
    keyword: "",
    countries: "",
    genres: "",
    order: "",
    type: "",
    raiting: [0, 10],
    yearFrom: 1000,
    yearTo: new Date().getFullYear(),
  });

  const onSubmitForm = async (valueFromForm: TParamsToSearchFilm) => {
    setDisabled(true);
    setParamsToSearch(valueFromForm);
    await dispatch(
      deepSearchFilm({ paramsToSearch: valueFromForm, page: currentPage })
    );
    setDisabled(false);
  };

  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrentPage(page);
    dispatch(deepSearchFilm({ paramsToSearch, page }));
    window.scroll(0, 0);
  };

  return (
    <div className={styles.searchContent}>
      <SearchForm disabled={disabled} onSubmitForm={onSubmitForm} />
      {loadingStatus === "loading" ? (
        <Spin className={styles.loading} size="large" />
      ) : (
        <Row className={styles.film_row} gutter={[0, 30]}>
          {deepSearch?.map((element) => (
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
      )}

      {total && !disabled && (
        <Row className={styles.pagination_row}>
          <Col>
            <Pagination
              simple
              defaultPageSize={20}
              current={currentPage}
              onChange={onChange}
              total={total}
            />
          </Col>
        </Row>
      )}
    </div>
  );
};
