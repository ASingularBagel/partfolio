import React from 'react'

const IsLoading = () => {
  return (
    <>
      <div className='fixed inset-0 flex justify-center items-center'>
        <div className='w-20 h-20 border rounded-full flex bg-transparent justify-center items-center'>
          <span className="loading loading-ring loading-lg"></span>
        </div>
      </div>
    </>
  )
}

export default IsLoading