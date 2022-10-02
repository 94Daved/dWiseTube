// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBB7B_48ApOtWguFN7GZM2pjyINob2A0VY",
  authDomain: "dwisetube.firebaseapp.com",
  projectId: "dwisetube",
  storageBucket: "dwisetube.appspot.com",
  messagingSenderId: "99041008515",
  appId: "1:99041008515:web:a0f1867989da31951ff4b6",
  measurementId: "G-RMWXR9GQZZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
