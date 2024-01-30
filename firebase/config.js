// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDn9nk8P13AArMi8zzzG4bYOsyQlvDDOwA",
  authDomain: "acm-venezuela-3ef23.firebaseapp.com",
  projectId: "acm-venezuela-3ef23",
  storageBucket: "acm-venezuela-3ef23.appspot.com",
  messagingSenderId: "77502892655",
  appId: "1:77502892655:web:f2b18c671ad9508af59b9a",
  measurementId: "G-B56GC5ENZ0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);
//Firebase Storage
export const storage = getStorage(app)
