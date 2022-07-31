import { Select } from "antd";
import React, { useState } from "react";
import debounce from "lodash.debounce";
import { useAppDispatch } from "../../redux/store";
import { searchFilm } from "../../redux/slices/filmsTopSlice";

const SearchField = () => {
  const [valueSearch, setValueSearch] = useState("");
  const dispatch = useAppDispatch();
  const { Option } = Select;

  const handleSearch = debounce((str: string) => {
    debugger;
    dispatch(searchFilm(str));
  }, 1000);

  const handleChange = (value: string) => {
    setValueSearch(value);
  };

  return (
    <>
      <Select
        style={{
          width: "100%",
        }}
        placeholder="Search..."
        showSearch
        value={valueSearch}
        onChange={handleChange}
        onSearch={handleSearch}
        showArrow={false}
      >
        <Option key={"as"}>{"item"}</Option>
      </Select>
    </>
  );
};

export default SearchField;
