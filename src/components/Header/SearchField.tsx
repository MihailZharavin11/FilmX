import { Select, Spin } from "antd";
import React, { useCallback, useRef, useState } from "react";
import debounce from "lodash.debounce";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { searchFilm } from "../../redux/slices/searchSlice";

const SearchField = () => {
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
                      <div
                        style={{
                          color: "black",
                        }}
                        key={element.filmId}
                      >
                        {element.nameEn}
                      </div>
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
