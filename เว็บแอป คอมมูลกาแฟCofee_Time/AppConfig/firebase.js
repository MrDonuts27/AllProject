// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFpVQRCmkiN8apU6QMfNnt9Cj3C8KmajQ",
  authDomain: "coffee-time-76b8f.firebaseapp.com",
  projectId: "coffee-time-76b8f",
  storageBucket: "coffee-time-76b8f.appspot.com",
  messagingSenderId: "39741018966",
  appId: "1:39741018966:web:b920fc1664a3a13023bcf7",
  measurementId: "G-WMYQ9HKJCW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const DB = getFirestore(app);
