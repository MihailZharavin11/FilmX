import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import api, { TGenre } from "../../../api/index";
import { useAppSelector } from "../../../redux/store";
import styles from "./filmNav.module.scss";

type MenuItem = Required<MenuProps>["items"][number];

type TItemCategories = {
  name: string;
  path: string;
};

const FilmNav: React.FC = () => {
  const { loadingStatus } = useAppSelector((state) => state.films);
  const [genre, setGenre] = useState<TGenre[] | null>();
  const navigate = useNavigate();
  const location = useLocation();
  console.log("render");

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
      "/films/TOP/TOP_250_BEST_FILMS",
      <MailOutlined />,
      itemTopCategories.map((element, index) => {
        return getItem(element.name, `/films/TOP/${element.path}`);
      })
    ),
    getItem(
      "Genre",
      "/films/GENRE/0",
      <AppstoreOutlined />,
      genre?.map((element, index) => {
        return element.genre
          ? getItem(element.genre, `/films/genre/${index + 1}`)
          : null;
      })
    ),
    getItem("Search", "/search", <SettingOutlined />),
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
