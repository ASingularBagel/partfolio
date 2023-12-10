/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { auth } from '../firebase/config'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

import { FaBars } from 'react-icons/fa';

import MainNavBar from '../components/mainNavBar';

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
        <MainNavBar />
        <button className='btn' onClick={handleLogout}>
            LOG OUT
        </button>
    </>

  )
}

export default Main