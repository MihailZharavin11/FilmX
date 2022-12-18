import { Select } from "antd";
import React, { useCallback, useRef, useState } from "react";
import debounce from "lodash.debounce";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  clearQuickSearchMovie,
  searchFilm,
} from "../../../redux/slices/searchSlice";
import { Link } from "react-router-dom";
import styles from "./searchField.module.scss";
import SearchCard from "./SearchCard/SearchCard";

const SearchField: React.FC = () => {
  const [valueSearch, setValueSearch] = useState("");
  const dispatch = useAppDispatch();
  const { quickSearchMovie } = useAppSelector((state) => state.search);
  const inputRef = useRef(null);

  const updateSearchValue = useCallback(
    debounce((valueToSearch: string) => {
      dispatch(searchFilm(valueToSearch));
    }, 1000),
    [inputRef]
  );

  const onChangeInput = (valueToSearch: string) => {
    setValueSearch(valueToSearch);
    updateSearchValue(valueToSearch);
  };

  const handleClickAwaySearch = () => {
    dispatch(clearQuickSearchMovie());
  };

  return (
    <div className={styles.menuWrapper}>
      <Select
        ref={inputRef}
        className={styles.search}
        placeholder="Search..."
        showSearch
        open={quickSearchMovie.length > 0 ? true : false}
        onDropdownVisibleChange={(visible) => {
          if (!visible) {
            handleClickAwaySearch();
          }
        }}
        showArrow={false}
        searchValue={valueSearch}
        onSearch={onChangeInput}
        dropdownRender={() => {
          return (
            <div className={styles.menuInner}>
              {quickSearchMovie.length > 0
                ? quickSearchMovie.map((element) => (
                    <Link
                      key={element.filmId}
                      onClick={() => handleClickAwaySearch()}
                      to={`/films/${element.filmId}`}
                    >
                      <SearchCard
                        filmId={element.filmId}
                        posterUrl={element.posterUrl}
                        nameEn={element.nameEn}
                        rating={element.rating}
                        nameRu={element.nameRu}
                        year={element.year}
                      />
                    </Link>
                  ))
                : null}
            </div>
          );
        }}
      ></Select>
    </div>
  );
};

export default SearchField;
