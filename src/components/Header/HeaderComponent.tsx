import React from "react";
import { Button } from "antd";
import { Link, useLocation } from "react-router-dom";
import styles from "./headerComponent.module.scss";
import Logo from "./Logo/Logo";
import SearchField from "./SearchField/SearchField";
import { Header } from "antd/lib/layout/layout";
import { useAuth } from "../../hooks/useAuth";
import MenuComponent from "./Menu/MenuComponent";

const HeaderComponent: React.FC = () => {
  let { pathname } = useLocation();
  const { isAuth } = useAuth();

  return (
    <Header className={styles.header}>
      <Logo />
      {pathname.includes("/films") && <SearchField />}
      {isAuth ? (
        <MenuComponent />
      ) : (
        <Link to="/login">
          <Button type="ghost">LogIn</Button>
        </Link>
      )}
    </Header>
  );
};

export default HeaderComponent;
