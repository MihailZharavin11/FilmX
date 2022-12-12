import React from "react";
import styles from "./authorization.module.scss";

type AuthorizationProps = {
  title: string;
  children: JSX.Element;
};

export const Authorization: React.FC<AuthorizationProps> = ({
  title,
  children,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className="registration__title">
        <h1 className="registration__title-text">{title}</h1>
      </div>
      {children}
    </div>
  );
};
