import { Select } from "antd";
import React, { useCallback, useRef, useState } from "react";
import debounce from "lodash.debounce";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { searchFilm } from "../../../redux/slices/searchSlice";
import styles from "../headerFixed.module.scss";
import { setClassForRaiting } from "../../../lib/raitingFunc";
import { Link } from "react-router-dom";

const SearchField: React.FC = () => {
  const [valueSearch, setValueSearch] = useState<string>("");
  const dispatch = useAppDispatch();
  const { filmBySearch } = useAppSelector((state) => state.search);
  const inputRef = useRef(null);

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
    <>
      <Select
        ref={inputRef}
        style={{
          width: "100%",
        }}
        placeholder="Search..."
        showSearch
        showArrow={false}
        searchValue={valueSearch}
        onSearch={onChangeInput}
        dropdownRender={() => {
          return (
            <>
              {filmBySearch.length > 0
                ? filmBySearch.map((element) => {
                    return (
                      <Link to={`/films/${element.filmId}`}>
                        <div className={styles.search} key={element.filmId}>
                          <div className={styles.search__image}>
                            <img src={element.posterUrl} alt="poster" />
                          </div>
                          <div className={styles.search__description}>
                            <h4 className={styles.search__descriptionTitle}>
                              {element.nameEn}
                            </h4>
                            <p className={styles.search__descriptionText}>
                              <span
                                className={
                                  styles.search__descriptionTextRaiting
                                }
                              >
                                <span
                                  className={
                                    styles[
                                      setClassForRaiting(Number(element.rating))
                                    ]
                                  }
                                >
                                  {element.rating}
                                </span>
                                ,
                              </span>
                              {element.nameRu}, {element.year}
                            </p>
                          </div>
                        </div>
                      </Link>
                    );
                  })
                : "Ничего не найдено..."}{" "}
            </>
          );
        }}
      ></Select>
    </>
  );
};

export default SearchField;
