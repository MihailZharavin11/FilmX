import { Layout } from 'antd';
import React from 'react';
import FilmContent from '../components/FilmContent/FilmContent';
import FimlsPageHeader from '../components/FilmsPageHeader/FilmsPageHeader';

const { Sider, Content } = Layout;

const Films: React.FC = () => {
  return (
    <Layout>
      <Layout>
        <Sider width={256}>
          <FimlsPageHeader />
        </Sider>
        <Content>
          <FilmContent />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Films;
