import { Header } from "antd/lib/layout/layout";
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HeaderFixed from "./components/Header/HeaderFixed";
import Films from "./pages/Films";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header className="header">
        <HeaderFixed />
      </Header>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/films" element={<Films />}>
          {/* <Route path=":categories" element={<Films />} />
          <Route path="genre" element={<div>asd</div>} /> */}
        </Route>
        <Route path="/films/TOP/:categories" element={<Films />} />
        <Route path="/films/GENRE/:genre" element={<Films />} />
      </Routes>
    </div>
  );
};

export default App;
