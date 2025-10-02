// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";

// Replace with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyCresFCf8cEaqsPqmRGJNpQ5xqSjnhgw4w",
  authDomain: "the-indian-compass.firebaseapp.com",
  projectId: "the-indian-compass",
  storageBucket: "the-indian-compass.firebasestorage.app",
  messagingSenderId: "733603672241",
  appId: "1:733603672241:web:6240d17e41ac26a78a7290",
  measurementId: "G-B45WB938LL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider, signInWithPopup };
