import { Dropdown } from "antd";
import React from "react";
import type { MenuProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styles from "./headerFixed.module.scss";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../redux/store";
import { userLogOut } from "../../../redux/slices/userSlice";

const AvatarZone: React.FC = () => {
  const dipatch = useAppDispatch();

  const logOut = () => {
    dipatch(userLogOut());
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <Link onClick={logOut} to={"/"}>
          Log Out
        </Link>
      ),
      key: " item-1",
    },
  ];

  return (
    <div className={styles.avatar}>
      <Dropdown menu={{ items }}>
        <UserOutlined
          style={{
            fontSize: "25px",
          }}
        />
      </Dropdown>
    </div>
  );
};

export default AvatarZone;
