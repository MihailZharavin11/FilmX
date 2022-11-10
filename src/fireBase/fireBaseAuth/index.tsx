import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";

const logIn = async (email: string, password: string) => {
  const auth = getAuth();
  const { user } = await setPersistence(auth, browserSessionPersistence).then(
    () => {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      return signInWithEmailAndPassword(auth, email, password);
    }
  );
  return user;
};

const signOut = async () => {
  const auth = getAuth();
  await auth.signOut();
  return auth.currentUser ? false : true;
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
  signOut,
};
