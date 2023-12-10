import React from 'react'
import { auth } from '../firebase/config'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

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
    <button className='btn' onClick={handleLogout}>
        LOG OUT
    </button>
  )
}

export default Main