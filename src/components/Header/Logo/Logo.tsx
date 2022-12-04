import React from "react";
import { Link } from "react-router-dom";
import styles from "./logo.module.scss";

const Logo: React.FC = () => {
  return (
    <Link to="/">
      <h1 className={styles.logo}>FilmX</h1>
    </Link>
  );
};

export default Logo;
