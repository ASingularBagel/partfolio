/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import MainNavBar from '../components/mainNavBar';
import MainContent from '../components/mainContent';

function Main() { 
  return (
    <>
        <div className='bg-charcoal-background1 overflow-hidden h-screen'>
            <MainNavBar />
            <MainContent />
        </div>
    </>

  )
}

export default Main