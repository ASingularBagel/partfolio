/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent } from 'react'
import { useAuth } from '../hooks/useAuth'
import { fetchIllustration, uploadIllustration } from '../firebase/config'
import { useFetchImage } from '../hooks/useFetchImage'

export const MainContent = () => {
  const{ user } = useAuth();
  const [photo, setPhoto] = React.useState<File | null>(null);
  const { data, loading, setLoading } = useFetchImage("53478");

  return (
    <>
    <div>
      <input type="file" className='file-input' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        if ((e.target as HTMLInputElement)?.files) {
          const file = (e.target as HTMLInputElement)?.files?.[0];
          if (file) {
            setPhoto(file);
          }
        }
      }}/>
      <button className='btn' onClick={() => {
        if (photo) {
          uploadIllustration(photo, "Test", ["New", "Test"], () => setLoading(true), user);
        }
      }}>Upload</button>
    </div>
    <div className='Image w-20 h-20'>
      {data && 
        <>
          <img src={data.image} alt="" />
          <p>{data.title}</p>
        </>
      }
    </div>
    </>
  )
}

export default MainContent