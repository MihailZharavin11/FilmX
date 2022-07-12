import { Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FilmContent from '../components/FilmContent/FilmContent';
import FilmItem from '../components/FilmItem/FilmItem';
import FimlsPageHeader from '../components/FilmsPageHeader/FilmsPageHeader';
import { getFilms, getTopFilms } from '../redux/slices/filmsTopSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';

const { Header, Footer, Sider, Content } = Layout;

const Films: React.FC = () => {
  const dispatch = useAppDispatch();
  const [counter, setCounter] = useState(20);
  const films = useAppSelector(getTopFilms(counter));
  let { categories } = useParams();
  console.log(films);

  useEffect(() => {
    dispatch(getFilms(categories));
  }, [counter, dispatch, categories]);

  return (
    <Layout>
      <Layout>
        <Sider width={256}>
          <FimlsPageHeader />
        </Sider>
        <Content>
          <FilmContent films={films} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Films;
