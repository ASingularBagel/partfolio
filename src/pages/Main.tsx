/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { auth } from '../firebase/config'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import Profile from '../components/profileicon';

import MainNavBar from '../components/mainNavBar';
import { AuthContext } from './../context/auth';
import { userInfo } from 'os';

function Main() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try{
            await signOut(auth)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }  
  return (
    <>
        <div className='bg-charcoal-background1 overflow-hidden h-screen'>
            <MainNavBar />
            <button className='btn' onClick={handleLogout}>
                LOG OUT
            </button>
        </div>
    </>

  )
}

export default Main