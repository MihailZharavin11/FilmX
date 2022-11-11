import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch } from "../redux/store";
import { setUser } from "../redux/slices/userSlice";

type RequireAuthProps = {
  children: JSX.Element;
};

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const { isAuth } = useAuth();
  const location = useLocation();
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
        } else {
          navigate("/login", {
            state: {
              from: location,
            },
          });
        }
      });
    }
  }, [auth, dispatch, isAuth, navigate, location]);

  if (!isAuth) {
    return null;
  }

  return children;
};

export default RequireAuth;
