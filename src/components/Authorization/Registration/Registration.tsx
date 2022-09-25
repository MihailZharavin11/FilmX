import { Button, Form } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { createNewUser } from "../../../redux/slices/userSlice";
import { useAppDispatch } from "../../../redux/store";
import FormToAuthentication from "../Form/Form";
import styles from "../authorization.module.scss";

type RegistrationType = {
  title: string;
};

export const Registration: React.FC<RegistrationType> = ({ title }) => {
  const dispatch = useAppDispatch();

  const handleRegistration = (email: string, password: string) => {
    const objToLogIn = {
      email,
      password,
    };
    dispatch(createNewUser(objToLogIn));
  };

  return (
    <div className={styles.wrapper}>
      <div className="registration__title">
        <h1 className="registration__title-text">{title}</h1>
      </div>

      <FormToAuthentication handleSubmit={handleRegistration} />

      <Form.Item className={styles.login_button}>
        <div className="login__registration">
          Or <Link to={"/login"}>Log In</Link>
        </div>
      </Form.Item>
    </div>
  );
};
