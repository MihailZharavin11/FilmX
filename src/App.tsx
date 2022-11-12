import { Header } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HeaderFixed from "./components/Shared/Header/HeaderFixed";
import FilmContent from "./components/Films/FilmContent/FilmContent";
import Films from "./pages/Films/Films";
import Home from "./pages/Home/Home";
import EmptyContent from "./components/Shared/EmptyContent/EmptyContent";
import ActorContent from "./components/Actors/ActorContent/ActorContent";
import RequireAuth from "./hoc/RequireAuth";
import { Login } from "./components/Authorization/Login/Login";
import { Registration } from "./components/Authorization/Registration/Registration";
import { useAuth } from "./hooks/useAuth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAppDispatch } from "./redux/store";
import { setUser } from "./redux/slices/userSlice";

const App: React.FC = () => {
  const { isAuth } = useAuth();
  const dispatch = useAppDispatch();
  const auth = getAuth();

  useEffect(() => {
    if (!isAuth) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(
            setUser({
              email: user.email,
              id: user.uid,
              token: user.refreshToken,
            })
          );
        }
      });
    }
  }, [auth, dispatch, isAuth]);

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
        <Route
          path="/films/TOP/:categories"
          element={
            <RequireAuth>
              <Films />
            </RequireAuth>
          }
        />
        <Route
          path="/films/GENRE/:genre"
          element={
            <RequireAuth>
              <Films />
            </RequireAuth>
          }
        />
        <Route
          path="/films/:id"
          element={
            <RequireAuth>
              <FilmContent />
            </RequireAuth>
          }
        />
        <Route
          path="/actor/:id"
          element={
            <RequireAuth>
              <ActorContent />
            </RequireAuth>
          }
        />
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
