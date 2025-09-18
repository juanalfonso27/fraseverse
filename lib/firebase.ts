// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: "studio-8796513175-54517",
  appId: "1:328726928315:web:23a42f4d09fc21e847829e",
  storageBucket: "studio-8796513175-54517.firebasestorage.app",
  apiKey: "AIzaSyCNtzNmELdOmcYER5mES3gAzzeYobwIZ5Y",
  authDomain: "studio-8796513175-54517.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "328726928315"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
