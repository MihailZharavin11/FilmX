import { Avatar, Col, Dropdown, Menu, Typography } from "antd";
import React from "react";
import { UserOutlined, SmallDashOutlined } from "@ant-design/icons";
import styles from "./headerFixed.module.scss";
import { Link } from "react-router-dom";

const AvatarZone = () => {
  const dropMenu = (
    <Menu
      selectable
      items={[
        {
          key: "LogIn",
          label: <Link to="/login">Log In</Link>,
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
