/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent } from 'react'
import { useRef } from 'react'
import { uploadPost, uploadIllustrationsToPost, rollbackChanges, operationsToRollback } from '../firebase/config';
import { useAuth } from '../hooks/useAuth';
import { User } from 'firebase/auth';

export const UploadIll = () => {
  const {user} = useAuth(); 
  const fixedWidth = '9rem'
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploaded, setIsUploaded] = React.useState(false)
  const [selectedFiles, setSelectedFiles] = React.useState<File[] | null>(null);
  const [illustrationNumber, setIllustrationNumber] = React.useState<number>(0);
  const [packageSize, setPackageSize] = React.useState<number>(0);
  const [imagePreviews, setImagePreviews] = React.useState<string[]>([]);

  const handleButtonClick = () => {
    // Trigger the file input when the button is clicked
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e : any) => {
    console.log("input changed function called")
    console.log(e.target.files)

    // Gather the file(s) from the file input
    const files = Array.from(e.target.files);
    setSelectedFiles(files as File[]); // Save the FileList object in state
    const previews = files.map((value: unknown, index: number, array: unknown[]) => {
      const file = value as File;
      setIllustrationNumber(illustrationNumber + 1);
      return URL.createObjectURL(file);
    });
    setImagePreviews(previews);
    setIsUploaded(true);
  }

  async function handleUpload() {
    // Suppose you have a state variable for the post's metadata
    const title = "Example Title";
    const tags = ["Tag1", "Tag2"];
    //const user = {/* The current user object from Firebase */};
    // Set loading true
  
    try {
      const postId = await uploadPost(title, tags, user as User, () => {true});
      if (postId) {
        const filesArray = Array.from(selectedFiles || []);
        await uploadIllustrationsToPost(postId, filesArray, user as User, () => {true});
      }
      console.log('All files have been successfully uploaded.');
      // Clear the local state on successful upload
      setSelectedFiles([]);
      setImagePreviews([]);
    } catch (error) {
      console.error('File upload failed, rolling back:', error);
      // Perform a rollback if upload fails
      rollbackChanges(operationsToRollback, () => {true});
    } finally {
      //setLoading(false);
    }
  }

  if(isUploaded) { () => {
    
  }}
    
  function handleRemoveImage(index: number): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className='wrapper'>
      {isUploaded ? (
        <div>
            <div className='enumeration flex flex-row items-center justify-start min-w-full h-10 bg-charcoal-surface6-press text-charcoal-text1 px-4'>
              <p className='mr-4'>Illustrations</p> <p className='mr-3'>{illustrationNumber} Pieces</p><p>{packageSize} (size)</p>
            </div>
            <div className='image-previews h-fit min-w-full py-5 bg-charcoal-surface9'>
              {imagePreviews.length === 1 ? (
                <div className='' style={{ minHeight: '40rem', maxHeight: '50rem', width: '100%' }}>
                <div className='wrapper flex items-center justify-center' style={{ minHeight: '40rem', maxHeight: '50rem', width: '100%' }}>
                  <div className='image-preview h-[40rem] w-[40rem] bg-charcoal-surface1-press flex items-center justify-center'>
                    <img src={imagePreviews[0]} alt='preview' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'scale-down' }} />
                    {/* Button to remove the image, if needed */}
                    
                  </div>
                </div>
              </div>

              ) : (
                imagePreviews.map((preview, index) => (
                  <div key={index} className='image-preview w-'>
                    <img src={preview} alt='preview' />
                    <button className='btn submit-btn rounded-full bg-charcoal-brand-press text-charcoal-text1 btn-wide mt-12 mb-3' onClick={() => handleRemoveImage(index)}>
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>
        </div>
      ) : (
        <div>
          <div className='type-selector flex flex-row min-w-full h-10 bg-charcoal-surface6-press text-charcoal-text1 items-center justify-center px-80 '>
            <div className='illustration h-full items-center flex flex-wrap-reverse justify-center bg-red-400' style={{ minWidth : fixedWidth }}>
              <p>Illustrations</p>
            </div>
            <div className='animation h-full items-center flex justify-center bg-orange-400 max-w-[15%] min-w-[15%]' style={{ minWidth : fixedWidth }}>
              <p>Animations</p>
            </div>
            <div className='Manga h-full items-center flex justify-center bg-blue-400 max-w-[15%] min-w-[15%]' style={{ minWidth : fixedWidth }}> 
              <p>Manga</p>
            </div>
            <div className='Novel h-full items-center flex justify-center bg-violet-400 max-w-[15%] min-w-[15%]' style={{ minWidth : fixedWidth }}> 
              <p>Novel</p>
            </div>
          </div>
          <div className='Main'>
            <div className='upload h-fit bg-charcoal-surface9 items-center justify-center flex flex-col text-charcoal-text1'>
                {/* Hidden file input */}
                <input
                type="file"
                ref={fileInputRef}
                className="file-input"
                accept="image/jpeg, image/gif, image/png"
                multiple
                style={{ display: 'none' }} // hide the file input field
                onChange={(e) => {setIsUploaded(true), handleFileInputChange(e)}}
              />
              {/* Custom button that opens file explorer context */}
              <button className='btn submit-btn rounded-full bg-charcoal-brand-press text-charcoal-text1 btn-wide mt-12 mb-3' onClick={handleButtonClick}>
                Add images
              </button>
              <div className='items-center justify-center flex flex-col mb-5'>
                <p className=''>JPEG / GIF / PNG</p>
                  <p className='text-xs'>
                  You can upload up to 32 MB per file and a maximum of 200 files
                  (the total file size must be less than 200 MB)
                  </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadIll