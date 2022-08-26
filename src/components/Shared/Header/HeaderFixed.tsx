import React from "react";
import { Col, Row } from "antd";
import { useLocation } from "react-router-dom";
import AvatarZone from "./AvatarZone";
import styles from "./headerFixed.module.scss";
import Logo from "./Logo";
import MenuFixed from "./MenuFixed";
import SearchField from "./SearchField";

const HeaderFixed: React.FC = () => {
  let { pathname } = useLocation();

  return (
    <div className={styles.header}>
      <Row style={{ padding: "0px 12px" }} align="middle">
        <Col span={4}>
          <Logo />
        </Col>
        <Col span={6}>
          <MenuFixed />
        </Col>
        <Col span={6}>
          {pathname.includes("/films") ? <SearchField /> : null}
        </Col>
        <Col span={3}></Col>
        <Col
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          span={5}
        >
          <AvatarZone />
        </Col>
      </Row>
    </div>
  );
};

export default HeaderFixed;