import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyBtk0292M0Xv-TaQSVYqVWEcJjYXSxb64I",
  authDomain: "filmx-3e598.firebaseapp.com",
  databaseURL:
    "https://filmx-3e598-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "filmx-3e598",
  storageBucket: "filmx-3e598.appspot.com",
  messagingSenderId: "89904142865",
  appId: "1:89904142865:web:464b1601f48e931c05efb0",
  measurementId: "G-S690W5S9KX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
