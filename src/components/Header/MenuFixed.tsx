import { Col, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import styles from "./headerFixed.module.scss";

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
      label: "Home",
      key: "/home",
    },
    {
      label: "Films",
      key: "/films",
    },
    {
      label: "Contacts",
      key: "/contacts",
    },
  ];

  return (
    <Col span={17}>
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
    </Col>
  );
};

export default MenuFixed;
