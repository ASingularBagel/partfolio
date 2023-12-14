/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { usePhoto } from '../hooks/usePhoto';

import ProfilePicture from './profileicon';

import InfoAlert from './InfoAlert';
import ErrorAlert from './ErrorAlert';

import { updateUserMetadata } from '../firebase/config';

const NewUserPanel = () => {
  const { user }= useAuth(); 

  const navigate = useNavigate();

  const [error, setError] = useState<string>('');
  
  const [username, setUsername] = useState<string>('');
  const [accountName, setAccountName] = useState<string>('');

  const [noUsername, setNoUsername] = useState<boolean>(true);
  const [noAccountName, setNoAccountName] = useState<boolean>(true);
  const [noProfilePicture, setNoProfilePicture] = useState<boolean>(true);

  const { photo, photoUrl, handleChange, handleUpload, isUploading } = usePhoto();

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertText, setAlertText] = useState('');
  const [alertConfirm, setAlertConfirm] = useState(() => () => {});
  const [alertDeny, setAlertDeny] = useState(() => () => {});

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      if (!photo && noProfilePicture) {
        setAlertText('Continue without a profile picture?');
        setAlertConfirm(() => () => { setNoProfilePicture(false); setShowAlert(false); });
        setAlertDeny(() => () => { setShowAlert(false); });
        setShowAlert(true);

        if (!username && noUsername) {
          setAlertText('Continue without a username?');
          setAlertConfirm(() => () => { setNoUsername(false); setShowAlert(false); });
          setAlertDeny(() => () => { setShowAlert(false); });
          setShowAlert(true);

          if (!accountName && noAccountName) {
            setAlertText('Continue without an account name?');
            setAlertConfirm(() => () => { setNoAccountName(false); setShowAlert(false); });
            setAlertDeny(() => () => { setShowAlert(false); });
            setShowAlert(true);
            return;
          }
          return;
        }
        return;
      }
    
      if (accountName.includes(' ')) {
        setError('Account name cannot contain spaces');
        return;
      }
      
      try {
        await updateUserMetadata(user, ["user"], isUploading, accountName, username, photo);
          // TODO : Send email verification
        navigate('/Main');
      } catch (error) {
          setError(error.message);
      }
  }
    return (
      <form>
        {/* ... */}
        {showAlert && <InfoAlert text={alertText} confirm={alertConfirm} deny={alertDeny} />}
        {error && <ErrorAlert error={error} />}
        {/* ... */}
          <div className="hero min-h-screen bg-base-200 bg-home-background">
              <div className="card w-fit bg-black center-panel hero-content flex-col lg:flex-row-reverse  py-12 px-7">
                  <div className='mb-8'>
                      <h1 className='text-4xl text-center text-sky-500 mb-2'>Welcome !</h1>
                      <p className='text- text-center font-semibold'>A few more things before we get started...</p>
                  </div>
                  <div className='form-signup'>
                    <p className='text-center font-semibold'>Let's get your profile configured</p>
                    <div className='form-control w-full'>
                        <label className='label'>
                            <span className='label-text'>Username</span>
                        </label>
                        <input type="input" value = {username} onChange={(e) => setUsername(e.target.value)} placeholder="This will be your display name" className="input input-bordered w-full peer"/>
                    </div>
                    <div className='form-control w-full'>
                        <label className='label'>
                            <span className='label-text'>Account name</span>
                        </label>
                        <input type="input"value = {accountName} onChange={(e) => setAccountName(e.target.value)} placeholder="This will be your @ title" className="input input-bordered" />
                    </div>
                    <div className='form-control w-full profile-picture-field mt-10 mb-24'>
                        <label className='label mb-5'>
                            <span className='label-text'>Upload a profile picture</span>
                        </label>
                        <div className='w-profile-md h-profile-md'>
                          <ProfilePicture /><input type="file" className='file-input mt-4' onChange={handleChange}/>
                        </div> 
                    </div>
                    <div className='form-control w-60 align-center justify-center relative '>
                        <button className='btn hover:bg-sky-800 w-full text-white border-white border-b-8' onClick={(e) => { handleSubmit(e) }} >Next</button>
                    </div>
                    <div className='legalDisclamer'>
                        <p className='text-xs text-center my-4 mt-7'>By signing up, you agree to our Terms, Data Policy and Cookies Policy.</p>
                    </div>
                  </div>
                  
              </div>
          </div>
      </form>
    )
  
}

export default NewUserPanel