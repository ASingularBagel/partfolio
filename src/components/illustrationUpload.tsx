/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

// TODO : Create page for uploading illustrations
function IllustrationUpload() {

    
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    
  return (
    <>

    </>
  )
}

export default IllustrationUpload