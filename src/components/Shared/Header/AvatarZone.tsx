import { Avatar, Dropdown, Menu, Typography } from "antd";
import React from "react";
import { UserOutlined, SmallDashOutlined } from "@ant-design/icons";
import styles from "./headerFixed.module.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useAppDispatch } from "../../../redux/store";
import { removeUser } from "../../../redux/slices/userSlice";

const AvatarZone: React.FC = () => {
  const { isAuth } = useAuth();
  const dipatch = useAppDispatch();

  const logOut = () => {
    dipatch(removeUser());
  };

  const dropMenu = (
    <Menu
      selectable
      items={[
        {
          key: "LogIn",
          label: isAuth ? (
            <Link onClick={logOut} to="/">
              Log Out
            </Link>
          ) : (
            <Link to="/login">Log In</Link>
          ),
        },
      ]}
    />
  );

  return (
    <div className={styles.avatar}>
      <Avatar
        className={styles.avatarImage}
        size={40}
        icon={<UserOutlined />}
      />
      <Dropdown overlay={dropMenu}>
        <Typography.Link>
          <SmallDashOutlined className={styles.dropMenu} />
        </Typography.Link>
      </Dropdown>
    </div>
  );
};

export default AvatarZone;
