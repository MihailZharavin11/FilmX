import React, { useState } from "react";
import {
  EyeTwoTone,
  EyeInvisibleTwoTone,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";
import styles from "./formToAuthentication.module.scss";
import { Button, Form, Input } from "antd";

type FormToAuthenticationProps = {
  handleSubmit: (email: string, password: string) => void;
  titleButton: string;
};

interface FormData {
  email: string;
  password: string;
}

const FormToAuthentication: React.FC<FormToAuthenticationProps> = ({
  handleSubmit,
  titleButton,
}) => {
  const [showPassword, setShowPassword] = useState(false);

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
        {titleButton}
      </Button>
    </Form>
  );
};

export default FormToAuthentication;
