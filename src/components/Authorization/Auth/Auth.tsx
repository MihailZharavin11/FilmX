import React from "react";
import styles from "./auth.module.scss";

type AuthProps = {
  title: string;
  children: JSX.Element;
};

const Auth: React.FC<AuthProps> = ({ title, children }) => {
  return (
    <div className={styles.registration}>
      <div className="registration__title">
        <h1 className="registration__title-text">{title}</h1>
      </div>

      <div className={styles.form}>{children}</div>
    </div>
  );
};

export default Auth;
