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
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN || "",
  projectId: process.env.PROJECT_ID || "",
  storageBucket: process.env.STORAGE_BUCKET || "",
  messagingSenderId: process.env.MESSAGING_SENDER_ID || "",
  appId: process.env.APP_ID || "",
  measurementId: process.env.MEASUREMENT_ID || "",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);
//Firebase Storage
export const storage = getStorage(app)
