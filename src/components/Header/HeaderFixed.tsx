import { Row } from 'antd';
import React from 'react';
import AvatarZone from './AvatarZone';
import styles from './headerFixed.module.scss';
import Logo from './Logo';
import MenuFixed from './MenuFixed';

const HeaderFixed: React.FC = () => {
  return (
    <div className={styles.header}>
      <Row align="middle">
        <Logo />
        <MenuFixed />
        <AvatarZone />
      </Row>
    </div>
  );
};

export default HeaderFixed;
