import React from 'react'
import '../App.css'

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignUp from './SignUp';
import Login  from './Login';

function Landing({ setIsAuth }) {
    return (
        <Router>
            <nav>
                <Link to="/Login"> Login </Link>
                <Link to="/SignUp"> SignUp </Link>
            </nav>
            <Routes>
                <Route path="./SignUp" element={<SignUp />} />
                <Route path="./Login" element={<Login setIsAuth={setIsAuth} />} />
            </Routes>
        </Router>
    )
}

export default Landing