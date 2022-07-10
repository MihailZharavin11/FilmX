import { Avatar, Col, Dropdown, Menu, Typography } from 'antd';
import React from 'react';
import { UserOutlined, SmallDashOutlined } from '@ant-design/icons';
import styles from './headerFixed.module.scss';

const AvatarZone = () => {
  const dropMenu = (
    <Menu
      selectable
      defaultSelectedKeys={['3']}
      items={[
        {
          key: '1',
          label: 'Item 1',
        },
        {
          key: '2',
          label: 'Item 2',
        },
        {
          key: '3',
          label: 'Item 3',
        },
      ]}
    />
  );

  return (
    <Col span={3}>
      <div className={styles.avatar}>
        <Avatar className={styles.avatarImage} size={40} icon={<UserOutlined />} />
        <Dropdown overlay={dropMenu}>
          <Typography.Link>
            <SmallDashOutlined className={styles.dropMenu} />
          </Typography.Link>
        </Dropdown>
      </div>
    </Col>
  );
};

export default AvatarZone;
