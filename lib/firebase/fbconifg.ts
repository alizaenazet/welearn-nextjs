// Import the functions you need from the SDKs you need
import { cookies } from "next/headers";
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmwXmKKWUBXTdTVrafwjhaUJerFd1dN10",
  authDomain: "welearngamacitra.firebaseapp.com",
  projectId: "welearngamacitra",
  storageBucket: "welearngamacitra.appspot.com",
  messagingSenderId: "790256732582",
  appId: "1:790256732582:web:b305d30eb301f0b593e767"
};

// Initialize Firebase

export const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(firebaseApp);