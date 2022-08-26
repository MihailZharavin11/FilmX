import React, { useEffect, useState } from "react";
import {
  UserOutlined,
  EyeTwoTone,
  EyeInvisibleTwoTone,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import styles from "../forms.module.scss";
import { useAppDispatch } from "../../../../redux/store";
import { createNewUser } from "../../../../redux/slices/userSlice";
import { useAuth } from "../../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const FormToRegistration: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  const changeShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  const onFinish = ({
    email,
    password,
  }: {
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
