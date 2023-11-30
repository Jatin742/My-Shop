// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCia-jGuoAuINoQjvetlcqqJsiGUYIZjy0",
  authDomain: "next-app-f9dba.firebaseapp.com",
  projectId: "next-app-f9dba",
  storageBucket: "next-app-f9dba.appspot.com",
  messagingSenderId: "913036720372",
  appId: "1:913036720372:web:3a064a317603fb772c06a1",
  measurementId: "G-DRBJD19CMT"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;