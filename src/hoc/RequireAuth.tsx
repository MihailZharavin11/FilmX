import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch } from "../redux/store";
import { setUser } from "../redux/slices/userSlice";

type RequireAuthProps = {
  children: JSX.Element;
};

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const { isAuth } = useAuth();

  if (!isAuth) {
    return <Navigate to={"/login"} />;
  }

  return children;
};

export default RequireAuth;
