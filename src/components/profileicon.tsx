/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, ChangeEvent } from 'react'
import { useAuth } from '../hooks/useAuth'
import { usePhoto}  from '../hooks/usePhoto'
import { uploadProfilePicture } from '../firebase/config'

import { CgProfile } from "react-icons/cg";
import { useEffect } from 'react';

function ProfilePicture() {
    const { photoUrl } = usePhoto();
  return (
    <>
        <div className='items-center flex justify-center rounded-[50%] overflow-hidden border-2 border-gray-300 border-solid'>
            <p className=''>
                <img className='bg-cover object-scale-down overflow-hidden' src={photoUrl} alt="avatar" />
            </p>
        </div>
        {/*<div>
            <input type="file" onChange={handleChange} />
            <button className="btn" disabled={isUploading || !photo || !user} onClick={handleUpload}>Upload</button>
        </div>*/}
    </>
  )
}

export default ProfilePicture