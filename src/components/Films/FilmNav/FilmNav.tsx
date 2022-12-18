import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  ArrowUpOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import api, { TFilmByGenre } from "../../../api/index";
import { useAppSelector } from "../../../redux/store";
import styles from "./filmNav.module.scss";

type MenuItem = Required<MenuProps>["items"][number];

type TItemTopCategories = {
  name: string;
  path: string;
};

const FilmNav: React.FC = () => {
  const { loadingStatus } = useAppSelector((state) => state.films);
  const [genre, setGenre] = useState<TFilmByGenre[] | null>();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    api.getCategoriesAndCountries().then((response) => {
      setGenre(response.genres);
    });
  }, []);

  const onClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const itemTopCategories: TItemTopCategories[] = [
    {
      name: "Топ250 фильмов",
      path: "TOP_250_BEST_FILMS",
    },
    {
      name: "Топ100 популярных фильмов",
      path: "TOP_100_POPULAR_FILMS",
    },
    {
      name: "Топ ожидаемых",
      path: "TOP_AWAIT_FILMS",
    },
  ];

  const items: MenuItem[] = [
    getItem(
      "Топ",
      "/films/TOP",
      <ArrowUpOutlined />,
      itemTopCategories.map((element) => {
        return getItem(element.name, `/films/TOP/${element.path}`);
      })
    ),
    getItem(
      "Жанры",
      "Genre",
      <AppstoreOutlined />,
      genre?.map((element, index) => {
        return element.genre
          ? getItem(element.genre, `/films/genre/${index + 1}`)
          : null;
      })
    ),
    getItem("Поиск", "/search", <SearchOutlined />),
  ];

  return (
    <Menu
      className={styles.menu}
      defaultSelectedKeys={[location.pathname]}
      disabled={loadingStatus === "loading" ? true : false}
      onSelect={onClick}
      mode="inline"
      items={items}
    />
  );
};

export default FilmNav;
