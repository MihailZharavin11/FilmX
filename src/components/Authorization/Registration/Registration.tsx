import { Form, message } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createNewUser } from "../../../redux/slices/userSlice";
import { useAppDispatch } from "../../../redux/store";
import FormToAuthentication from "../Form/FormToAuthentication";
import styles from "./registration.module.scss";

export const Registration = () => {
  const [disabledButton, setDisabledButton] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleRegistration = async (email: string, password: string) => {
    setDisabledButton(true);
    const userToRegistration = {
      email,
      password,
    };
    const { meta, payload } = await dispatch(createNewUser(userToRegistration));
    if (meta.requestStatus === "fulfilled") {
      message.success("You have successfully registered");
      setTimeout(() => {
        navigate("/");
        setDisabledButton(false);
      }, 2000);
    }
    if (meta.requestStatus === "rejected" && payload) {
      message.error(payload);
      setDisabledButton(false);
    }
  };
  return (
    <>
      <FormToAuthentication
        disabledButton={disabledButton}
        handleSubmit={handleRegistration}
        titleButton={"Registration"}
      />

      <Form.Item className={styles.login_button}>
        Or
        <Link to={`/login`}> login</Link>
      </Form.Item>
    </>
  );
};
