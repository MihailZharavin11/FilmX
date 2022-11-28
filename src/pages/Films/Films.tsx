import { Layout } from "antd";
import React from "react";
import FilmNav from "../../components/Films/FilmNav/FilmNav";
import styles from "./films.module.scss";
import { Row } from "antd";

const { Sider, Content } = Layout;

type FilmsProps = {
  children: JSX.Element;
};

const Films: React.FC<FilmsProps> = ({ children }) => {
  return (
    <Layout className={styles.filmLayout}>
      <Sider breakpoint="md" collapsedWidth="35">
        <FilmNav />
      </Sider>
      <Content>
        <Row className={styles.filmRow} gutter={[0, 30]}>
          {children}
        </Row>
      </Content>
    </Layout>
  );
};

export default Films;
