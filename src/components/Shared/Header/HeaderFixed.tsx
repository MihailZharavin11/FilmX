import React from "react";
import { Button } from "antd";
import { Link, useLocation } from "react-router-dom";
import styles from "./headerFixed.module.scss";
import Logo from "./Logo";
import MenuFixed from "./Menu/MenuFixed";
import SearchField from "./SearchField";
import { Header } from "antd/lib/layout/layout";
import { useAuth } from "../../../hooks/useAuth";

const HeaderFixed: React.FC = () => {
  let { pathname } = useLocation();
  const { isAuth } = useAuth();

  return (
    <Header className={styles.header}>
      <Logo />
      {pathname.includes("/films") && <SearchField />}
      {isAuth ? (
        <MenuFixed />
      ) : (
        <Link to="/login">
          <Button type="ghost">LogIn</Button>
        </Link>
      )}
    </Header>
  );
};

export default HeaderFixed;
