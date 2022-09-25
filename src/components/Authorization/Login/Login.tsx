import { Button, Form } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { userLogIn } from "../../../redux/slices/userSlice";
import { useAppDispatch } from "../../../redux/store";
import FormToAuthentication from "../Form/Form";
import styles from "../authorization.module.scss";

type LoginProps = {
  title: string;
};

export const Login: React.FC<LoginProps> = ({ title }) => {
  const dispatch = useAppDispatch();

  const handleLogIn = (email: string, password: string) => {
    const objToLogIn = {
      email,
      password,
    };
    dispatch(userLogIn(objToLogIn));
  };

  return (
    <div className={styles.wrapper}>
      <div className="registration__title">
        <h1 className="registration__title-text">{title}</h1>
      </div>
      <FormToAuthentication handleSubmit={handleLogIn} />

      <Form.Item className={styles.login_button}>
        <div className="login__registration">
          Or <Link to={"/registration"}>Registration</Link>
        </div>
      </Form.Item>
    </div>
  );
};
