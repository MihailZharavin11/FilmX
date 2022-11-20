import { Form, Input, InputNumber, Select, Slider } from "antd";
import React, { useEffect, useState } from "react";
import api, { TCountry, TGenre } from "../../api";
import FilmNav from "../../components/Films/FilmNav/FilmNav";
import styles from "./search.module.scss";

export const Search = () => {
  const [genres, setGenres] = useState<TGenre[] | null>();
  const [countries, setCountries] = useState<TCountry[] | null>();

  useEffect(() => {
    api.getCategoriesAndCountries().then((response) => {
      setGenres(response.genres);
      setCountries(response.countries);
    });
  }, []);

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.navigation}>
        <FilmNav />
      </div>
      <div className={styles.searchContent}>
        <div className={styles.searchFormsWrapper}>
          <Form className={styles.searchForms}>
            <Form.Item label="Ключевое слово">
              <Input />
            </Form.Item>
            <Form.Item label="Страна">
              <Select>
                {countries?.map((element) => (
                  <Select.Option key={element.id} value={element.country}>
                    {element.country}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Жанр">
              <Select>
                {genres?.map((element) => (
                  <Select.Option key={element.id} value={element.genre}>
                    {element.genre}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Сортировка">
              <Select>
                <Select.Option value="RAITING">Рейтинг</Select.Option>
                <Select.Option value="NUM_VOTE">По популярности</Select.Option>
                <Select.Option value="YEAR">Год</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Тип фильма">
              <Select>
                <Select.Option value="FILM">Фильм</Select.Option>
                <Select.Option value="TV_SHOW">TV шоу</Select.Option>
                <Select.Option value="TV_SERIES">TV сериал</Select.Option>
                <Select.Option value="MINI_SERIES">Мини сериал</Select.Option>
                <Select.Option value="ALL">Все</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Рейтинг от">
              <InputNumber min={1} max={10} />
            </Form.Item>
            <Form.Item label="Рейтинг">
              <Slider min={0} max={10} step={1} range defaultValue={[0, 10]} />
            </Form.Item>
            <Form.Item label="Год">
              <InputNumber min={1000} max={2022} step={1} />
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
