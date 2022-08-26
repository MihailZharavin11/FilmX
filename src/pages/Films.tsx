import { Layout } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FilmLayout from "../components/Films/FilmLayout/FilmLayout";
import FilmNav from "../components/Films/FilmNav/FilmNav";
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
