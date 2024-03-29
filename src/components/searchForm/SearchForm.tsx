import { Button, Form, Input, InputNumber, Select, Slider } from "antd";
import React from "react";
import {
  TFiltersResponse_countries,
  TFiltersResponse_genres,
  TParamsToSearchFilm,
} from "../../api/APItypes";
import styles from "./searchForm.module.scss";

type SearchFormProps = {
  onSubmitForm: (valueFromForm: TParamsToSearchFilm) => void;
  genres: TFiltersResponse_genres[] | null;
  countries: TFiltersResponse_countries[] | null;
  disabled: boolean;
  initialValue: TParamsToSearchFilm;
};

export const SearchForm: React.FC<SearchFormProps> = ({
  onSubmitForm,
  disabled,
  initialValue,
  genres,
  countries,
}) => {
  return (
    <Form
      disabled={disabled}
      initialValues={initialValue}
      onFinish={(valueFromForm: TParamsToSearchFilm) => {
        onSubmitForm(valueFromForm);
      }}
      layout="vertical"
      className={styles.searchForms}
    >
      <div className={styles.searchItem}>
        <Form.Item name={"keyword"} label="Ключевое слово">
          <Input />
        </Form.Item>
        <Form.Item name={"countries"} label="Страна">
          <Select>
            {countries?.map((element) => (
              <Select.Option key={element.id} value={element.country}>
                {element.country}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name={"genres"} label="Жанр">
          <Select>
            {genres?.map((element) => (
              <Select.Option key={element.id} value={element.genre}>
                {element.genre}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name={"order"} label="Сортировка">
          <Select>
            <Select.Option value="">{""}</Select.Option>
            <Select.Option value="RATING">Рейтинг</Select.Option>
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
          <Slider min={0} max={10} step={1} range />
        </Form.Item>
        <Form.Item name={"yearFrom"} label="Минимальный год">
          <InputNumber min={1000} max={2023} step={1} />
        </Form.Item>
        <Form.Item name={"yearTo"} label="Максимальный год">
          <InputNumber min={1000} max={2023} step={1} />
        </Form.Item>
      </div>
      <Form.Item>
        <Button htmlType="submit" size="large" type="primary">
          Search
        </Button>
      </Form.Item>
    </Form>
  );
};
