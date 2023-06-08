// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
​​import {
  ​​  getAuth,
  ​​  signInWithPopup,
  ​​  signInWithEmailAndPassword,
  ​​  createUserWithEmailAndPassword,
  ​​  sendPasswordResetEmail,
  ​​  signOut,
  ​​} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfIyMGMOnUJKxT0OgurVbEjSXeh1GYNls",
  authDomain: "todo-app-ef311.firebaseapp.com",
  projectId: "todo-app-ef311",
  storageBucket: "todo-app-ef311.appspot.com",
  messagingSenderId: "850702107426",
  appId: "1:850702107426:web:146d192290f0eca8eadb7b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db  = getFirestore(app);
export const auth  = getAuth(app);