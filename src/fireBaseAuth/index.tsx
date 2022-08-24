import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const logIn = async (email: string, password: string) => {
  const auth = getAuth();
  const user = await signInWithEmailAndPassword(auth, email, password).then(
    ({ user }) => {
      return user;
    }
  );
  return user;
};

const registration = async (email: string, password: string) => {
  const auth = getAuth();
  const user = await createUserWithEmailAndPassword(auth, email, password).then(
    ({ user }) => {
      return user;
    }
  );
  return user;
};

export default {
  logIn,
  registration,
};
