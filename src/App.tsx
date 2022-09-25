import { Header } from "antd/lib/layout/layout";
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HeaderFixed from "./components/Shared/Header/HeaderFixed";
import FilmContent from "./components/Films/FilmContent/FilmContent";
import Films from "./pages/Films";
import Home from "./pages/Home";
import EmptyContent from "./components/Shared/EmptyContent/EmptyContent";
import ActorContent from "./components/Actors/ActorContent/ActorContent";
import RequireAuth from "./hoc/RequireAuth";
import { Login } from "./components/Authorization/Login/Login";
import { Registration } from "./components/Authorization/Registration/Registration";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header className="header">
        <HeaderFixed />
      </Header>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/films"
          element={
            <RequireAuth>
              <Films />
            </RequireAuth>
          }
        />
        <Route path="/films/TOP/:categories" element={<Films />} />
        <Route path="/films/GENRE/:genre" element={<Films />} />
        <Route path="/films/:id" element={<FilmContent />} />
        <Route path="/actor/:id" element={<ActorContent />} />
        <Route
          path="/registration"
          element={<Registration title="Registration" />}
        />
        <Route path="/login" element={<Login title="Log In" />} />

        <Route path="*" element={<EmptyContent />} />
      </Routes>
    </div>
  );
};

export default App;
