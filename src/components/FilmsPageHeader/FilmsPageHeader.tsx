import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

type TItemCategories = {
  name: string;
  path: string;
};

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const itemTop = ['Top250 Films', 'Top100 Popular Films', 'Top Await Films'];
const itemTopCategories: TItemCategories[] = [
  {
    name: 'Top250 Films',
    path: 'TOP_250_BEST_FILMS',
  },
  {
    name: 'Top100 Popular Films',
    path: 'TOP_100_POPULAR_FILMS',
  },
  {
    name: 'Top Await Films',
    path: 'TOP_AWAIT_FILMS',
  },
];

const items: MenuItem[] = [
  getItem(
    'TOP',
    'sub1',
    <MailOutlined />,
    itemTopCategories.map((element, index) => {
      return getItem(<Link to={element.path}>{element.name}</Link>, index);
    }),
  ),
  getItem('Categories', 'sub2', <AppstoreOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),
  getItem('Most Popular', 'sub4', <SettingOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),
];

const FimlsPageHeader: React.FC = () => {
  const [current, setCurrent] = useState('0');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 256, height: 500 }}
      selectedKeys={[current]}
      mode="inline"
      items={items}
    />
  );
};

export default FimlsPageHeader;
