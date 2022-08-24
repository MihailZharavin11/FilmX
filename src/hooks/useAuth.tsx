import { useAppSelector } from "../redux/store";

export const useAuth = () => {
  const { email, token, id } = useAppSelector((state) => state.user);

  return {
    isAuth: !!email,
    email,
    token,
    id,
  };
};
