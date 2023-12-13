import React from 'react'
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

import { auth } from '../firebase/config'
import { signOut } from 'firebase/auth'

function ProfileDropdown() {
  const { user } = useAuth();
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
    <div className='card-body h-fit'>
        <div className='card-title'>
            <p className=''>{ user?.displayName || "Anonymous" }</p>
        </div>
        <div className=''>
            <button className='btn' onClick={handleLogout}>
              LOG OUT
            </button>
        </div>
    </div>
  )
}

export default ProfileDropdown