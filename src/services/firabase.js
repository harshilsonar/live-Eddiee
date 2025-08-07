import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0bqEtHRdADXrzlU0KFoHVWnfpWsi36hs",
  authDomain: "fir-project-e2342.firebaseapp.com",
  projectId: "fir-project-e2342",
  storageBucket: "fir-project-e2342.firebasestorage.app",
  messagingSenderId: "602103489462",
  appId: "1:602103489462:web:d8ae98c1c81293f1c8d717"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);