import React from 'react';
import './App.css';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
/*import { useCollectionData } from 'react-firebase-hooks/firestore';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';*/

import Home from './pages/Home';
import Landing from './pages/Landing';

const firebaseConfig = ({ 
  apiKey: "AIzaSyA1qaLQXpTyabgrvBSEytzESHkfe4hT_cc",
  authDomain: "partfolio-project.firebaseapp.com",
  projectId: "partfolio-project",
  storageBucket: "partfolio-project.appspot.com",
  messagingSenderId: "1084826388216",
  appId: "1:1084826388216:web:fdd9a3136e7c7b7d7add0d",
  measurementId: "G-9GC5XVZTPZ"
})
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
// const firestore = getFirestore(app);

function App() {
  const [isAuth, setIsAuth] = useAuthState(auth);

  return (
    <div className="App">
      <section>
        {isAuth ? <Home /> : <Landing setIsAuth={setIsAuth}/>}
      </section>
    </div>
  );
}

export default App;

export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
