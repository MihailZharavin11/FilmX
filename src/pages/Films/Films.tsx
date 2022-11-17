import { Layout } from "antd";
import React from "react";
import FilmLayout from "../../components/Films/FilmLayout/FilmLayout";
import FilmNav from "../../components/Films/FilmNav/FilmNav";

const { Sider, Content } = Layout;

const Films: React.FC = () => {
  return (
    <Layout>
      <Layout>
        <Sider breakpoint="md" collapsedWidth="80">
          <FilmNav />
        </Sider>
        <Content>
          <FilmLayout />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Films;
