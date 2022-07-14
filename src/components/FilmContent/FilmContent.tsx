import { Col, Pagination, Row, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { getFilms } from '../../redux/slices/filmsTopSlice';
import FilmItem from '../FilmItem/FilmItem';
import styles from './filmContent.module.scss';
import type { PaginationProps } from 'antd';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useParams } from 'react-router-dom';

const FilmContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();
  const { topFilms, totalPage, loadingStatus } = useAppSelector((state) => state.films);
  let { categories } = useParams();

  useEffect(() => {
    dispatch(getFilms({ categories, currentPage }));
  }, [dispatch, categories, currentPage]);

  const renderFilmItem = topFilms.map((element) => (
    <Col className={styles.column} span={6}>
      <FilmItem
        key={element.filmId}
        title={element.nameEn ? element.nameEn : element.nameRu}
        rating={element.rating}
        posterUrlPreview={element.posterUrlPreview}
      />
    </Col>
  ));

  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  };

  if (loadingStatus === 'loading') {
    return <Spin className={styles.loading} size="large" />;
  }

  return (
    <>
      <Row
        style={{
          marginTop: '30px',
        }}
        gutter={[0, 30]}>
        {renderFilmItem}
      </Row>
      <Row
        style={{
          margin: '20px 0px',
        }}>
        <Col push={1} span={10}>
          <Pagination
            simple
            defaultPageSize={20}
            current={currentPage}
            onChange={onChange}
            total={20 * totalPage}
          />
        </Col>
      </Row>
    </>
  );
};

export default FilmContent;
