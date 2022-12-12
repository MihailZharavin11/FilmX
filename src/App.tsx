import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import FilmContent from "./components/Films/FilmContent/FilmContent";
import Films from "./pages/Films/Films";
import Home from "./pages/Home/Home";
import EmptyContent from "./components/EmptyContent/EmptyContent";
import ActorContent from "./components/Actors/ActorContent/ActorContent";
import RequireAuth from "./hoc/RequireAuth";
import { useAppDispatch } from "./redux/store";
import { fetchUser, getDataFromDB } from "./redux/slices/userSlice";
import HeaderComponent from "./components/Header/HeaderComponent";
import { Search } from "./pages/Search/Search";
import { FilmsByTop } from "./components/FilmsByTop/FilmsByTop";
import { FilmsByGenre } from "./components/FilmsByGenre/FilmsByGenre";
import { Authorization } from "./components/Authorization/Authorization/Authorization";
import { getAuth } from "firebase/auth";
import { Registration } from "./components/Authorization/Registration/Registration";
import { Login } from "./components/Authorization/Login/Login";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const idUser = getAuth().currentUser?.uid;

  useEffect(() => {
    dispatch(fetchUser());
    if (idUser) {
      dispatch(getDataFromDB(idUser));
    }
  }, [dispatch, idUser]);

  return (
    <div className="App">
      <HeaderComponent />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/films"
          element={
            <RequireAuth>
              <Films>
                <FilmsByTop />
              </Films>
            </RequireAuth>
          }
        />
        <Route
          path="/films/TOP/:categories"
          element={
            <RequireAuth>
              <Films>
                <FilmsByTop />
              </Films>
            </RequireAuth>
          }
        />
        <Route
          path="/films/GENRE/:genre"
          element={
            <RequireAuth>
              <Films>
                <FilmsByGenre />
              </Films>
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
          path="/search"
          element={
            <Films>
              <Search />
            </Films>
          }
        />
        <Route
          path="/registration"
          element={
            <Authorization title="Registration">
              <Registration />
            </Authorization>
          }
        />
        <Route
          path="/login"
          element={
            <Authorization title="Login">
              <Login />
            </Authorization>
          }
        />

        <Route path="*" element={<EmptyContent />} />
      </Routes>
    </div>
  );
};

export default App;
