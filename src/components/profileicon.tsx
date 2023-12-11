/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, ChangeEvent } from 'react'
import { useAuth } from '../hooks/useAuth'
import { uploadProfilePicture } from '../firebase/config'

import { CgProfile } from "react-icons/cg";
import { useEffect } from 'react';

function ProfilePicture() {
    const { user } = useAuth();
    const [photo, setPhoto] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [photoUrl, setPhotoUrl] = React.useState<string>("https://filestore.community.support.microsoft.com/api/images/0ce956b2-9787-4756-a580-299568810730?upload=true");

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target?.files) setPhoto(e.target.files[0]);
    }

    function handleUpload() {
        if (photo) {uploadProfilePicture(photo, "profile-photos", setIsUploading, user);}
    }

    useEffect(() => {
        if(user?.photoURL){
            setPhotoUrl(user?.photoURL);
        } else {
            console.log("No photo URL");
            //setPhotoUrl("https://filestore.community.support.microsoft.com/api/images/0ce956b2-9787-4756-a580-299568810730?upload=true");
        }
    }, [user])
  return (
    <>
        <div className='items-center flex justify-center w-profile h-profile rounded-[50%] overflow-hidden border-2 border-gray-300 border-solid'>
            <p className='text-4xl'>
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