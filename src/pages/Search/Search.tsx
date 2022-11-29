import { Col, Pagination, PaginationProps, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api, { TCountry, TGenre, TParamsToSearchFilm } from "../../api";
import FilmCard from "../../components/Films/FilmCard/FilmCard";
import { SearchForm } from "../../components/searchForm/SearchForm";
import {
  clearDeepSearchMovie,
  deepSearchFilm,
} from "../../redux/slices/searchSlice";
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

type TParams = {
  keyword?: string | string[];
  countries?: string | string[];
  genres?: string | string[];
  order?: string | string[];
  type?: string | string[];
  raiting?: string | string[];
  yearFrom?: string | string[];
  yearTo?: string | string[];
};

export const Search = () => {
  const dispatch = useAppDispatch();
  const [disabled, setDisabled] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { deepSearch, total, loadingStatus } = useAppSelector(
    (state) => state.search
  );
  const [genres, setGenres] = useState<TGenre[]>();
  const [countries, setCountries] = useState<TCountry[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [paramsToSearch, setParamsToSearch] = useState<TParamsToSearchFilm>({
    keyword: searchParams.get("keyword") || "",
    countries: searchParams.get("countries") || "",
    genres: searchParams.get("genres") || "",
    order: searchParams.get("order") || "",
    type: searchParams.get("type") || "",
    raiting: searchParams.get("raiting")?.split("-") || [0, 10],
    yearFrom: Number(searchParams.get("yearFrom")) || 1000,
    yearTo: Number(searchParams.get("yearTo")) || new Date().getFullYear(),
  });

  useEffect(() => {
    api.getCategoriesAndCountries().then((response) => {
      setGenres([{ id: 0, genre: "" }, ...response.genres]);
      setCountries([{ id: 0, country: "" }, ...response.countries]);
    });
    if (searchParams.toString()) {
      dispatch(deepSearchFilm({ paramsToSearch, page: currentPage }));
    }
    return () => {
      dispatch(clearDeepSearchMovie());
    };
  }, []);

  const paramsForURL = (valueFromForm: TParamsToSearchFilm) => {
    const params: TParams = {};
    if (valueFromForm.keyword) params.keyword = valueFromForm.keyword;
    if (valueFromForm.countries)
      params.countries = valueFromForm.countries.toString();
    if (valueFromForm.genres) params.genres = valueFromForm.genres.toString();

    if (valueFromForm.order) params.order = valueFromForm.order.toString();
    if (valueFromForm.type) params.type = valueFromForm.type.toString();
    params.raiting = `${valueFromForm.raiting[0]}-${valueFromForm.raiting[1]}`;
    params.yearFrom = valueFromForm.yearFrom.toString();
    params.yearTo = valueFromForm.yearTo.toString();
    return params;
  };

  const onSubmitForm = async (valueFromForm: TParamsToSearchFilm) => {
    const objToSearch = {
      ...valueFromForm,
      countries:
        countries?.find(
          (element) => element.country === valueFromForm.countries
        )?.id || "",
      genres:
        genres?.find((element) => element.genre === valueFromForm.genres)?.id ||
        "",
    };
    const params = paramsForURL(valueFromForm);
    setDisabled(true);
    setParamsToSearch(valueFromForm);
    setSearchParams(params);
    await dispatch(
      deepSearchFilm({ paramsToSearch: objToSearch, page: currentPage })
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
      <SearchForm
        initialValue={paramsToSearch}
        genres={genres ? genres : null}
        countries={countries ? countries : null}
        disabled={disabled}
        onSubmitForm={onSubmitForm}
      />
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
