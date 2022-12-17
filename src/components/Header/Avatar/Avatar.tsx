import { Dropdown } from "antd";
import React from "react";
import type { MenuProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styles from "./avatar.module.scss";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../redux/store";
import { userLogOut } from "../../../redux/slices/userSlice";

const Avatar: React.FC = () => {
  const dipatch = useAppDispatch();

  const logOut = () => {
    dipatch(userLogOut());
  };

  const items: MenuProps["items"] = [
    {
      label: <Link to={"/favorite"}>Favorite Films</Link>,
      key: "item-1",
    },
    {
      label: <Link to={"/watched"}>Watched Films</Link>,
      key: "item-2",
    },
    {
      label: (
        <Link onClick={logOut} to={"/"}>
          Log Out
        </Link>
      ),
      key: " item-3",
    },
  ];

  return (
    <div className={styles.avatarWrapper}>
      <Dropdown menu={{ items }}>
        <UserOutlined className={styles.avatar} />
      </Dropdown>
    </div>
  );
};

export default Avatar;
