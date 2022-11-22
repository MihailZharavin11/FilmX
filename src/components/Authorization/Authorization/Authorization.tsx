import { Form } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import FormToAuthentication from "../Form/FormToAuthentication";
import styles from "./authorization.module.scss";

type AuthorizationProps = {
  handleAuthorization: (email: string, password: string) => void;
  title: string;
  redirectName: string;
};

export const Authorization: React.FC<AuthorizationProps> = ({
  handleAuthorization,
  title,
  redirectName,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className="registration__title">
        <h1 className="registration__title-text">{title}</h1>
      </div>
      <FormToAuthentication
        handleSubmit={handleAuthorization}
        titleButton={title}
      />

      <Form.Item className={styles.login_button}>
        <div className="login__registration">
          Or{" "}
          <Link to={`/${redirectName.toLocaleLowerCase()}`}>
            {redirectName.toLocaleLowerCase()}
          </Link>
        </div>
      </Form.Item>
    </div>
  );
};
