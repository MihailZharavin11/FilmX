import { Button, Form, Input, InputNumber, Select, Slider } from "antd";
import React, { useEffect, useState } from "react";
import api, { TCountry, TGenre } from "../../api";
import styles from "./search.module.scss";

export const Search = () => {
  const [genres, setGenres] = useState<TGenre[] | null>();
  const [countries, setCountries] = useState<TCountry[] | null>();

  useEffect(() => {
    api.getCategoriesAndCountries().then((response) => {
      setGenres([{ id: 0, genre: "" }, ...response.genres]);
      setCountries([{ id: 0, country: "" }, ...response.countries]);
    });
  }, []);

  const submitSearchButton = (e: any) => {
    console.log("asd");
    debugger;
  };

  return (
    <div className={styles.searchContent}>
      <Form
        onFinish={(e) => {
          console.log(e);
        }}
        layout="vertical"
        className={styles.searchForms}
      >
        <div className={styles.searchItem}>
          <Form.Item name={"searchField"} label="Ключевое слово">
            <Input />
          </Form.Item>
          <Form.Item name={"country"} label="Страна">
            <Select>
              {countries?.map((element) => (
                <Select.Option key={element.id} value={element.country}>
                  {element.country}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name={"genre"} label="Жанр">
            <Select>
              {genres?.map((element) => (
                <Select.Option key={element.id} value={element.genre}>
                  {element.genre}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name={"sort"} label="Сортировка">
            <Select>
              <Select.Option value="">{""}</Select.Option>
              <Select.Option value="RAITING">Рейтинг</Select.Option>
              <Select.Option value="NUM_VOTE">По популярности</Select.Option>
              <Select.Option value="YEAR">Год</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name={"type"} label="Тип фильма">
            <Select>
              <Select.Option value="">{""}</Select.Option>
              <Select.Option value="FILM">Фильм</Select.Option>
              <Select.Option value="TV_SHOW">TV шоу</Select.Option>
              <Select.Option value="TV_SERIES">TV сериал</Select.Option>
              <Select.Option value="MINI_SERIES">Мини сериал</Select.Option>
              <Select.Option value="ALL">Все</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name={"raiting"} label="Рейтинг">
            <Slider min={0} max={10} step={0.1} range />
          </Form.Item>
          <Form.Item name={"year"} label="Год">
            <InputNumber min={1000} max={2022} step={1} />
          </Form.Item>
        </div>
        <Form.Item>
          <Button
            onSubmit={submitSearchButton}
            htmlType="submit"
            size="large"
            type="primary"
          >
            Search
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
