import React, {useEffect} from 'react'
import '../App.css'

import { auth, provider } from '../App';
import { signInWithRedirect, getRedirectResult } from 'firebase/auth';

function Login({ setIsAuth }) {
    function signInWithGoogle() {
        signInWithRedirect(auth, provider);
    }
    
    useEffect(() => {
        getRedirectResult(auth)
        .then((result) => {
            if (result) {
                // The signed-in user info.
                const user = result.user;
                // User is now logged in
                setIsAuth(true);
                // even when browser closes
                localStorage.setItem('isAuth', true);
            }
        }).catch((error) => {
            console.error(error);
        });
    }, []); // The empty array means this effect runs once after the first render

    return (
        <div className='loginPage'>
            <p>Sign in with Google to continue</p>
            <button className='login-with-google-btn' onClick={signInWithGoogle}>
                Sign in with Google
            </button>
        </div>
    );
}

export default Login;