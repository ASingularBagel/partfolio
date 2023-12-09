import React from 'react';
import { FaGoogle, FaTwitch, FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

const CenterPanel = () => {
  return (
    <div className='hero min-h-screen bg-base-200'>
      <div className="card w-96 bg-slate-600 center-panel hero-content flex-col py-12 px-7">
        <div className='mb-8'>
          <h1 className='text-4xl text-center text-sky-500 mb-2'>NOT A PIXIV CLONE</h1>
          <p className='text- text-center'>where fandoms come to die</p>
        </div>
        <div className="reg-signup grid grid-flow-row auto-rows-max align-middle md:auto-rows-min space-y-3 min-w-full">
          <button className='btn rounded-full min-w-full '>Create an account</button>
          <button className='btn rounded-full bg-transparent'>Log into existing account</button>
        </div>
        <div className="social-signup">
          <p className='text-xs text-center my-4 mt-7'>Begin with an existing account</p>
          <div className='homeIcons container flex space-x-4 lg:mx-auto'>
            <button className="text-2xl btn rounded-full border-0 bg-transparent"><FaGoogle /></button>
            <button className="text-2xl btn rounded-full border-0 bg-transparent"><FaXTwitter /></button>
            <button className="text-2xl btn rounded-full border-0 bg-transparent"><FaTwitch /></button>
            <button className="text-3xl btn rounded-full border-0 bg-transparent"><FaFacebook /></button>
          </div>
        </div>
        <div className='legalDisclamer'>
          <p className='text-xs text-center my-4 mt-7'>By signing up, you agree to our Terms, Data Policy and Cookies Policy.</p>
        </div>
      </div>
    </div>

  );
};

export default CenterPanel;