import { Col, Dropdown, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AvatarZone from "../AvatarZone";
import styles from "./menuFixed.module.scss";

const MenuFixed: React.FC = () => {
  let location = useLocation();

  const checkPath = (path: string) => {
    if (path === "/" || path === "/home") {
      return "/home";
    } else if (path.includes("/films")) {
      return "/films";
    }

    return path;
  };

  const [currentLocation, setCurrentLocation] = useState(
    checkPath(location.pathname)
  );

  useEffect(() => {
    if (location) {
      if (currentLocation !== location.pathname) {
        setCurrentLocation(checkPath(location.pathname));
      }
    }
  }, [location, currentLocation]);

  const handleClickMenu = (e: any) => {
    setCurrentLocation(e.key);
  };

  const items = [
    {
      label: "Films",
      key: "/films",
    },
  ];

  return (
    <div className={styles.menuWrapper}>
      <Menu
        className={styles.menu}
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        onClick={handleClickMenu}
        selectedKeys={[currentLocation]}
        items={items.map((element, index) => ({
          key: element.key,
          label: (
            <Link to={element.label.toLocaleLowerCase()}>{element.label}</Link>
          ),
        }))}
      />
      <AvatarZone />
    </div>
  );
};

export default MenuFixed;
