/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { useAuth } from '../hooks/useAuth'
import  UploadIll  from '../components/uploadIllustration'
import MainNavBar from '../components/mainNavBar';



function UploadIllustration() {
    const { user } = useAuth();

  return (
    <div className='bg-charcoal-background2 h-screen'>
      <MainNavBar />
      <UploadIll />
    </div>

  )
}

export default UploadIllustration