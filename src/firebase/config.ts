// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1qaLQXpTyabgrvBSEytzESHkfe4hT_cc",
  authDomain: "partfolio-project.firebaseapp.com",
  projectId: "partfolio-project",
  storageBucket: "partfolio-project.appspot.com",
  messagingSenderId: "1084826388216",
  appId: "1:1084826388216:web:fdd9a3136e7c7b7d7add0d",
  measurementId: "G-9GC5XVZTPZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export { auth };
// const analytics = getAnalytics(app);