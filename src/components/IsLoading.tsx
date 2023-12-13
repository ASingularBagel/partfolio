import React from 'react'

const IsLoading = () => {
  return (
    <>
      <div className='bg-gray-400 bg-opacity-40 absolute top-0 bottom-0 left-0 right-0 w-20 h-20 border'>
          <span className="loading loading-ring loading-lg"></span>
      </div> 
    </>

  )
}

export default IsLoading