import { Form, message } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { createNewUser } from "../../../redux/slices/userSlice";
import { useAppDispatch } from "../../../redux/store";
import FormToAuthentication from "../Form/Form";
import styles from "../authorization.module.scss";

type RegistrationType = {
  title: string;
};

export const Registration: React.FC<RegistrationType> = ({ title }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRegistration = async (email: string, password: string) => {
    const objToLogIn = {
      email,
      password,
    };
    const { meta, payload } = await dispatch(createNewUser(objToLogIn));
    if (meta.requestStatus === "fulfilled") {
      message.success("You have successfully registered");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
    if (meta.requestStatus === "rejected" && payload) {
      message.error(payload);
    }
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
