import React, { useEffect, useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import api, { TCountry, TGenre } from '../../api/index';
import { useAppSelector } from '../../redux/store';

type MenuItem = Required<MenuProps>['items'][number];

type TItemCategories = {
  name: string;
  path: string;
};

const FimlsPageHeader: React.FC = () => {
  const [current, setCurrent] = useState('0');
  const { loadingStatus } = useAppSelector((state) => state.films);
  const [genre, setGenre] = useState<TGenre[] | null>();
  const [country, setCountry] = useState<TCountry[] | null>();

  useEffect(() => {
    api.getCategories().then((response) => {
      setGenre(response.genres);
      setCountry(response.countries);
    });
  }, []);

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
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
    getItem(
      'Genre',
      'sub2',
      <AppstoreOutlined />,
      genre?.map((element, index) => {
        return element.genre ? getItem(element.genre, index + element.genre) : null;
      }),
    ),
    getItem('Most Popular', 'sub4', <SettingOutlined />, [
      getItem('Option 9', '9'),
      getItem('Option 10', '10'),
      getItem('Option 11', '11'),
      getItem('Option 12', '12'),
    ]),
  ];

  return (
    <Menu
      disabled={loadingStatus === 'loading' ? true : false}
      onClick={onClick}
      style={{ width: 256, height: 500 }}
      selectedKeys={[current]}
      mode="inline"
      items={items}
    />
  );
};

export default FimlsPageHeader;
