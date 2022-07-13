import { Header } from 'antd/lib/layout/layout';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HeaderFixed from './components/Header/HeaderFixed';
import Films from './pages/Films';
import Home from './pages/Home';

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
          <Route path=":categories" element={<Films />} />
        </Route>
        {/* <Route path="/films/:categories" element={<>asd</>} /> */}
      </Routes>
    </div>
  );
};

export default App;
