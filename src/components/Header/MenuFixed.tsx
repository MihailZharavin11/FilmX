import { Col, Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './headerFixed.module.scss';

const MenuFixed: React.FC = () => {
  const items = [
    {
      label: 'Home',
    },
    {
      label: 'Films',
    },
    {
      label: 'Contacts',
    },
  ];

  return (
    <Col span={17}>
      <Menu
        className={styles.menu}
        mode="horizontal"
        defaultSelectedKeys={['1']}
        items={items.map((element, index) => ({
          key: String(index + 1),
          label: <Link to={element.label.toLocaleLowerCase()}>{element.label}</Link>,
        }))}
      />
    </Col>
  );
};

export default MenuFixed;
