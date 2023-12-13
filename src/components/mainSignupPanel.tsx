/* eslint-disable @typescript-eslint/no-unused-vars */
import { User, createUserWithEmailAndPassword, getRedirectResult, signInWithRedirect } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { FaGoogle, FaTwitch, FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase/config';
import ErrorAlert from './ErrorAlert';

const CenterPanel = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/NewUserInfo');
        } catch (error) {
            setError(error.message);
        }
    }

    const signInWithGoogle = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        try {
            await signInWithRedirect(auth, provider);
            getRedirectResult(auth).then((result) => {
                navigate('/NewUserInfo', { state: { displayName: result?.user.displayName, photo: result?.user.photoURL } });
            });
            
        } catch (error) {
            setError(error.message)
        }
    }
    
    return (
        <>
         {/* conditionally render the error message from state */}

        {error && 
            <ErrorAlert error={error} />
        }
            <form onSubmit={handleSubmit}>
                <div className="hero min-h-screen bg-base-200 bg-home-background">
                    <div className="card w-96 bg-black center-panel hero-content flex-col py-12 px-7">
                        <div className='mb-8'>
                            <h1 className='text-4xl text-center text-sky-500 mb-2'>NOT A PIXIV CLONE</h1>
                            <p className='text- text-center font-semibold'>Create an account</p>
                        </div>
                        <div className='form-control w-full'>
                            <label className='label'>
                                <span className='label-text'>Email</span>
                            </label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail address" className="input input-bordered w-full peer" required />
                        </div>
                        <div className='form-control w-full'>
                            <label className='label'>
                                <span className='label-text'>Password</span>
                            </label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="input input-bordered" required />
                        </div>
                        <div className='form-control w-full'>
                            <label className='label'>
                                <span className='label-text'>Confirm Password</span>
                            </label>
                            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" className="input input-bordered" required />
                        </div>
                        <div className='form-control mt-5 w-60'>
                            <button className='btn hover:bg-sky-800 w-full text-white border-white border-b-8' disabled={!email || !password}>Next</button>
                        </div>
                        <div className="social-signup w-full px-12">
                            <p className='text-xs text-center my-4 mt-7'>Begin with an existing account</p>
                            <div className='homeIcons container flex lg:mx-auto'>
                                <button className="text-2xl btn rounded-full border-0 bg-transparent" onClick={signInWithGoogle}><FaGoogle /></button>
                                <button className="text-2xl btn rounded-full border-0 bg-transparent"><FaXTwitter /></button>
                                <button className="text-2xl btn rounded-full border-0 bg-transparent"><FaTwitch /></button>
                                <button className="text-3xl btn rounded-full border-0 bg-transparent"><FaFacebook /></button>
                            </div>
                        </div>
                        <div className='legalDisclamer'>
                            <p className='text-xs text-center my-4 mt-7'>By signing up, you agree to our Terms, Data Policy and Cookies Policy.</p>
                        </div>
                    </div>
                </div>
            </form>
            <button onClick={() => navigate('/')} className='btn bg-transparent top-3 right-3 absolute'>Go Back</button>
        </>
    );
}

export default CenterPanel;
