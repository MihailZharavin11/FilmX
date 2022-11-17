import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AvatarZone from "../Avatar/Avatar";
import styles from "./menuComponent.module.scss";

const MenuComponent: React.FC = () => {
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

  return (
    <div className={styles.menuWrapper}>
      <AvatarZone />
    </div>
  );
};

export default MenuComponent;
