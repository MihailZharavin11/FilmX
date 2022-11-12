import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import React from "react";
import ContentHome from "../../components/HomeContent/ContentHome";

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
