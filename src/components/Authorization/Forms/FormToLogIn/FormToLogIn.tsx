import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import {
  EyeTwoTone,
  EyeInvisibleTwoTone,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import styles from "../forms.module.scss";
import { useAppDispatch } from "../../../../redux/store";
import { userLogIn } from "../../../../redux/slices/userSlice";
import { useAuth } from "../../../../hooks/useAuth";

const FormToLogIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { isAuth } = useAuth();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const changeShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();

  const onFinish = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    dispatch(userLogIn({ email, password }));
    form.resetFields();
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

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
          autoComplete="on"
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
        <div className="login__registration">
          Or <Link to="/registration">register now!</Link>
        </div>
      </Form.Item>
    </Form>
  );
};

export default FormToLogIn;
