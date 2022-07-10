import { Col } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './headerFixed.module.scss';

const Logo: React.FC = () => {
  return (
    <Col span={4}>
      <Link to="/">
        <h1 className={styles.logo}>FilmX</h1>
      </Link>
    </Col>
  );
};

export default Logo;
