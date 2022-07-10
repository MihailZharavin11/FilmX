import { Layout } from 'antd';
import { Header, Content, Footer } from 'antd/lib/layout/layout';
import React from 'react';
import ContentHome from '../components/Content/ContentHome';
import HeaderFixed from '../components/Header/HeaderFixed';

const Home: React.FC = () => {
  return (
    <div className="home">
      <Layout>
        <Content>
          <ContentHome />
        </Content>
      </Layout>
    </div>
  );
};

export default Home;
