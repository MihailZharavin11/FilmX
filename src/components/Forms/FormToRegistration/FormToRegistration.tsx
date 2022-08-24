import React, { useState } from "react";
import {
  UserOutlined,
  EyeTwoTone,
  EyeInvisibleTwoTone,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import styles from "../forms.module.scss";
import fireBaseAuth from "../../../fireBaseAuth";
import { useAppDispatch } from "../../../redux/store";
import { createNewUser, setUser } from "../../../redux/slices/userSlice";

const FormToRegistration: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();

  const changeShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onFinish = ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    dispatch(createNewUser({ email, password }));
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
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
        <Input prefix={<MailOutlined />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          prefix={<LockOutlined />}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          suffix={
            showPassword ? (
              <EyeTwoTone onClick={changeShowPassword} />
            ) : (
              <EyeInvisibleTwoTone onClick={changeShowPassword} />
            )
          }
        />
      </Form.Item>

      <Form.Item className={styles.login_button}>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormToRegistration;
