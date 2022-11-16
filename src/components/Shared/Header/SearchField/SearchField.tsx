import { Select } from "antd";
import React, { useCallback, useRef, useState } from "react";
import debounce from "lodash.debounce";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { searchFilm } from "../../../../redux/slices/searchSlice";
import { Link } from "react-router-dom";
import styles from "./searchField.module.scss";
import SearchCard from "./SearchCard/SearchCard";

const SearchField: React.FC = () => {
  const [valueSearch, setValueSearch] = useState<string>("");
  const dispatch = useAppDispatch();
  const { filmBySearch } = useAppSelector((state) => state.search);
  const inputRef = useRef(null);
  const [openDropDown, setOpenDropDown] = useState(false);

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(searchFilm(str));
    }, 1000),
    [inputRef]
  );

  const onChangeInput = (str: string) => {
    setValueSearch(str);
    updateSearchValue(str);
  };

  return (
    <div className={styles.menuWrapper}>
      <Select
        ref={inputRef}
        className={styles.search}
        placeholder="Search..."
        showSearch
        open={openDropDown}
        onDropdownVisibleChange={(visible) => setOpenDropDown(visible)}
        showArrow={false}
        searchValue={valueSearch}
        onSearch={onChangeInput}
        dropdownRender={() => {
          return (
            <>
              {filmBySearch.length > 0
                ? filmBySearch.map((element) => (
                    <Link
                      onClick={() => setOpenDropDown(false)}
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
                : "Ничего не найдено..."}{" "}
            </>
          );
        }}
      ></Select>
    </div>
  );
};

export default SearchField;
