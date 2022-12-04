import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import FilmContent from "./components/Films/FilmContent/FilmContent";
import Films from "./pages/Films/Films";
import Home from "./pages/Home/Home";
import EmptyContent from "./components/EmptyContent/EmptyContent";
import ActorContent from "./components/Actors/ActorContent/ActorContent";
import RequireAuth from "./hoc/RequireAuth";
import { useAppDispatch } from "./redux/store";
import { createNewUser, fetchUser, userLogIn } from "./redux/slices/userSlice";
import { message, Spin } from "antd";
import HeaderComponent from "./components/Header/HeaderComponent";
import { Search } from "./pages/Search/Search";
import { FilmsByTop } from "./components/FilmsByTop/FilmsByTop";
import { FilmsByGenre } from "./components/FilmsByGenre/FilmsByGenre";
import { Authorization } from "./components/Authorization/Authorization/Authorization";

interface StateLocationData {
  from: {
    pathname: string;
  };
}

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const stateLocation = location.state as StateLocationData;
  const pathName = stateLocation ? stateLocation.from.pathname : "/";
  const [disabledButton, setDisabledButton] = useState(false);

  const handleRegistration = async (email: string, password: string) => {
    setDisabledButton(true);
    const userToRegistration = {
      email,
      password,
    };
    const { meta, payload } = await dispatch(createNewUser(userToRegistration));
    if (meta.requestStatus === "fulfilled") {
      message.success("You have successfully registered");
      setTimeout(() => {
        navigate("/");
        setDisabledButton(false);
      }, 2000);
    }
    if (meta.requestStatus === "rejected" && payload) {
      message.error(payload);
      setDisabledButton(false);
    }
  };

  const handleLogIn = async (email: string, password: string) => {
    setDisabledButton(true);
    const userToLogIn = {
      email,
      password,
    };
    const { meta, payload } = await dispatch(userLogIn(userToLogIn));
    if (meta.requestStatus === "fulfilled") {
      message.success("You have successfully logged in");
      setTimeout(() => {
        navigate(pathName);
        setDisabledButton(false);
      }, 2000);
    }
    if (meta.requestStatus === "rejected" && payload) {
      message.error(payload);
      setDisabledButton(false);
    }
  };

  useEffect(() => {
    dispatch(fetchUser({ setLoading }));
  }, [dispatch]);

  if (loading) {
    return (
      <Spin
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
        size="large"
      />
    );
  }

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
            <Authorization
              disabledButton={disabledButton}
              title="Registration"
              redirectName="Login"
              handleAuthorization={handleRegistration}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Authorization
              disabledButton={disabledButton}
              title="Login"
              redirectName="Registration"
              handleAuthorization={handleLogIn}
            />
          }
        />

        <Route path="*" element={<EmptyContent />} />
      </Routes>
    </div>
  );
};

export default App;
