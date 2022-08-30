import { Header } from "antd/lib/layout/layout";
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HeaderFixed from "./components/Shared/Header/HeaderFixed";
import FilmContent from "./components/Films/FilmContent/FilmContent";
import Films from "./pages/Films";
import Home from "./pages/Home";
import EmptyContent from "./components/Shared/EmptyContent/EmptyContent";
import Auth from "./components/Authorization/Auth/Auth";
import FormToRegistration from "./components/Authorization/Forms/FormToRegistration/FormToRegistration";
import FormToLogIn from "./components/Authorization/Forms/FormToLogIn/FormToLogIn";
import ActorContent from "./components/Actors/ActorContent/ActorContent";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header className="header">
        <HeaderFixed />
      </Header>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/films" element={<Films />} />
        <Route path="/films/TOP/:categories" element={<Films />} />
        <Route path="/films/GENRE/:genre" element={<Films />} />
        <Route path="/films/:id" element={<FilmContent />} />
        <Route path="/actor/:id" element={<ActorContent />} />
        <Route
          path="/registration"
          element={
            <Auth title="Registration" children={<FormToRegistration />} />
          }
        />
        <Route
          path="/login"
          element={<Auth title="Log In" children={<FormToLogIn />} />}
        />

        <Route path="*" element={<EmptyContent />} />
      </Routes>
    </div>
  );
};

export default App;
