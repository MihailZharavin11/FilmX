import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

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
