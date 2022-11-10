import { Form, message } from "antd";
import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearError, userLogIn } from "../../../redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import FormToAuthentication from "../Form/Form";
import styles from "../authorization.module.scss";
import { useAuth } from "../../../hooks/useAuth";

type LoginProps = {
  title: string;
};

interface StateLocationData {
  from: {
    pathname: string;
  };
}

export const Login: React.FC<LoginProps> = ({ title }) => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const stateLocation = location.state as StateLocationData;
  const pathName = stateLocation ? stateLocation.from.pathname : "/";

  const handleLogIn = async (email: string, password: string) => {
    const userToLogIn = {
      email,
      password,
    };
    const { meta, payload } = await dispatch(userLogIn(userToLogIn));
    if (meta.requestStatus === "fulfilled") {
      message.success("You have successfully logged in");
      setTimeout(() => {
        navigate(pathName);
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
      <FormToAuthentication handleSubmit={handleLogIn} />

      <Form.Item className={styles.login_button}>
        <div className="login__registration">
          Or <Link to={"/registration"}>Registration</Link>
        </div>
      </Form.Item>
    </div>
  );
};
