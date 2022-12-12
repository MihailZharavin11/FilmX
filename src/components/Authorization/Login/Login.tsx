import { Form, message } from "antd";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userLogIn } from "../../../redux/slices/userSlice";
import { useAppDispatch } from "../../../redux/store";
import FormToAuthentication from "../Form/FormToAuthentication";
import styles from "./login.module.scss";

interface StateLocationData {
  from: {
    pathname: string;
  };
}

export const Login = () => {
  const [disabledButton, setDisabledButton] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const stateLocation = location.state as StateLocationData;
  const pathName = stateLocation ? stateLocation.from.pathname : "/";

  const handleLogIn = async (email: string, password: string) => {
    setDisabledButton(true);
    const userToLogIn = {
      email,
      password,
    };
    const { meta, payload } = await dispatch(userLogIn(userToLogIn));
    if (meta.requestStatus === "fulfilled") {
      message.success("You have successfully logged in");
      setTimeout(() => {
        navigate(pathName);
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
        handleSubmit={handleLogIn}
        titleButton={"Login"}
      />

      <Form.Item className={styles.login_button}>
        Or
        <Link to={`/registration`}> registration</Link>
      </Form.Item>
    </>
  );
};
