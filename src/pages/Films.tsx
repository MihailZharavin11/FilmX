import { Layout } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FilmContent from "../components/FilmContent/FilmContent";
import FimlsPageHeader from "../components/FilmsPageHeader/FilmsPageHeader";
import { useAuth } from "../hooks/useAuth";

const { Sider, Content } = Layout;

const Films: React.FC = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  if (!isAuth) {
    return null;
  }

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
