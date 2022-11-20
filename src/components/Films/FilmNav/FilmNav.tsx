import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import api, { TGenre } from "../../../api/index";
import { useAppSelector } from "../../../redux/store";
import styles from "./filmNav.module.scss";

type MenuItem = Required<MenuProps>["items"][number];

type TItemCategories = {
  name: string;
  path: string;
};

const FilmNav: React.FC = () => {
  const [current, setCurrent] = useState("0");
  const { loadingStatus } = useAppSelector((state) => state.films);
  const [genre, setGenre] = useState<TGenre[] | null>();

  useEffect(() => {
    api.getCategoriesAndCountries().then((response) => {
      setGenre(response.genres);
    });
  }, []);

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
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

  const itemTopCategories: TItemCategories[] = [
    {
      name: "Top250 Films",
      path: "TOP_250_BEST_FILMS",
    },
    {
      name: "Top100 Popular Films",
      path: "TOP_100_POPULAR_FILMS",
    },
    {
      name: "Top Await Films",
      path: "TOP_AWAIT_FILMS",
    },
  ];

  const items: MenuItem[] = [
    getItem(
      "TOP",
      "sub1",
      <MailOutlined />,
      itemTopCategories.map((element, index) => {
        return getItem(
          <Link to={`/films/TOP/${element.path}`}>{element.name}</Link>,
          index
        );
      })
    ),
    getItem(
      "Genre",
      "sub2",
      <AppstoreOutlined />,
      genre?.map((element, index) => {
        return element.genre
          ? getItem(
              <Link to={`/films/GENRE/${index + 1}`}>{element.genre}</Link>,
              index + element.genre
            )
          : null;
      })
    ),
    getItem(<Link to={`/search`}>Search</Link>, "sub3", <SettingOutlined />),
  ];

  return (
    <Menu
      className={styles.menu}
      disabled={loadingStatus === "loading" ? true : false}
      onClick={onClick}
      selectedKeys={[current]}
      mode="inline"
      items={items}
    />
  );
};

export default FilmNav;
