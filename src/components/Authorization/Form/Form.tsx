import React, { useEffect, useState } from "react";
import {
  EyeTwoTone,
  EyeInvisibleTwoTone,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "../authorization.module.scss";
import { Button, Form, Input } from "antd";
import { useAuth } from "../../../hooks/useAuth";

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
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const stateLocation = location.state as StateLocationData;
  const pathName = stateLocation ? stateLocation.from.pathname : "/";

  useEffect(() => {
    if (isAuth) {
      navigate(pathName);
    }
  }, [isAuth, navigate, pathName]);

  const handlePasswordShow = () => {
    setShowPassword(!showPassword);
  };

  return (
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
  );
};

export default FormToAuthentication;
