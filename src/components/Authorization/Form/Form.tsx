import React, { useEffect, useState } from "react";
import {
  EyeTwoTone,
  EyeInvisibleTwoTone,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "../authorization.module.scss";
import { Alert, Button, Form, Input, message } from "antd";
import { useAuth } from "../../../hooks/useAuth";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { clearError } from "../../../redux/slices/userSlice";

type FormToAuthenticationProps = {
  handleSubmit: (email: string, password: string) => void;
};

interface FormData {
  email: string;
  password: string;
}

interface StateLocationData {
  from: {
    pathname: string;
  };
}

const FormToAuthentication: React.FC<FormToAuthenticationProps> = ({
  handleSubmit,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { error } = useAppSelector((state) => state.user);
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const stateLocation = location.state as StateLocationData;
  const pathName = stateLocation ? stateLocation.from.pathname : "/";
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuth) {
      message.success("Success");
      debugger;
      setTimeout(() => {
        navigate(pathName);
      }, 2000);
    }
    if (error) {
      message.error(error);
      dispatch(clearError());
    }
  }, [isAuth, navigate, pathName, error, dispatch]);

  const handlePasswordShow = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Form
        name="normal_login"
        className={styles.form}
        initialValues={{ remember: true }}
        onFinish={(e: FormData) => {
          handleSubmit(e.email, e.password);
        }}
      >
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            className={styles.form__input}
            prefix={<MailOutlined />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            className={styles.form__input}
            prefix={<LockOutlined />}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            autoComplete="on"
            suffix={
              showPassword ? (
                <EyeTwoTone onClick={handlePasswordShow} />
              ) : (
                <EyeInvisibleTwoTone onClick={handlePasswordShow} />
              )
            }
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className={`${"login-form-button"} ${styles.form__button}`}
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default FormToAuthentication;
