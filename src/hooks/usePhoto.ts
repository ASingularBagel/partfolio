/* eslint-disable @typescript-eslint/no-unused-vars */
// usePhoto.ts
import { useState, ChangeEvent, useEffect } from 'react';
import { useAuth } from './useAuth';
import { uploadProfilePicture } from '../firebase/config';

export function usePhoto() {
    const { user } = useAuth();

    const [isUploading, setIsUploading] = useState(false);
    const [photoUrl, setPhotoUrl] = useState<string>("https://filestore.community.support.microsoft.com/api/images/0ce956b2-9787-4756-a580-299568810730?upload=true");
    const [photo, setPhoto] = useState<File | null>(null);

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

  return { user, photo, handleChange, handleUpload, photoUrl, isUploading: setIsUploading };
}