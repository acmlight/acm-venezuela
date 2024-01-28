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
  apiKey: "AIzaSyBbHxusLngd5fUKfExxxqlwKLG0L1pc6EM",
  authDomain: "acm-venezuela.firebaseapp.com",
  projectId: "acm-venezuela",
  storageBucket: "acm-venezuela.appspot.com",
  messagingSenderId: "793618920788",
  appId: "1:793618920788:web:22c9e58b938b1eec3544c1",
  measurementId: "G-C6RNGT3XYT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);
//Firebase Storage
export const storage = getStorage(app)
