/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';

import { FaBars } from 'react-icons/fa';

import { IoIosNotifications } from "react-icons/io";
import { IoMail, IoApps } from "react-icons/io5";


import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';



import ProfileDropdown from './profileicondropdown';
import PostYourWork from './postYourWork';


const MainNavBar = () => {
    const displaySearchBar = () => {
        console.log("Search bar clicked");
    }

    const [isOverlayVisible, setIsOverlayVisible] = useState(false);

    const handleSearchBarFocus = () => {
        displaySearchBar();
        if (!isOverlayVisible) {
            const overlay = document.createElement('div');
            overlay.classList.add('search-bar-overlay');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
            overlay.style.zIndex = '1';
            overlay.style.pointerEvents = 'none';  // Initially set to none, then to auto after the transition.
            overlay.style.transition = 'background-color 0.2s ease-in-out, backdrop-filter 0.2s ease-in-out';
            overlay.style.backdropFilter = 'blur(0px)';  // Start with no blur.
    
            // Append the overlay to the body before starting the transition.
            document.body.appendChild(overlay);
    
            // Force reflow to ensure styles are applied.
            void overlay.offsetWidth;
    
            // Start transition.
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
            overlay.style.backdropFilter = 'blur(2px)';
            overlay.style.pointerEvents = 'auto';  // Now make it clickable once visible.
    
            overlay.addEventListener('click', handleOverlayClick);
            setIsOverlayVisible(true);
        }
        
    };
    
    const handleOverlayClick = () => {
        const overlay = document.querySelector('.search-bar-overlay');
        if (overlay) {
            // Start fade out
            const overlay = document.querySelector('.search-bar-overlay') as HTMLElement;
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
            overlay.style.backdropFilter = 'blur(0px)';
            overlay.style.pointerEvents = 'none';
    
            // Wait for the transition to complete before removing the overlay
            setTimeout(() => {
                overlay.removeEventListener('click', handleOverlayClick);
                overlay.remove();
                setIsOverlayVisible(false);
            }, 200); // This should match your transition duration
        }
    };

  return (
    <>
        <div className="nav-bar-wrapper flex-row flex items-center bg-charcoal-background1 relative top-0 h-16 justify-between z-10">
            <div className="left-side-pannel flex-row flex items-center justify-start px-4 h-full">
                <div className="drawer">
                    <input id="left-drawer" type="checkbox" className="drawer-toggle " />
                    <div className="drawer-content">
                        <label htmlFor="left-drawer" className="btn btn-ghost no-animation drawer-button"> <FaBars /></label>
                    </div> 
                    <div className="drawer-side">
                        <label htmlFor="left-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <li><a>Sidebar Item 1</a></li>
                        <li><a>Sidebar Item 2</a></li>
                        
                        </ul>
                    </div>
                </div>
                <div className="logo w-full px-10 h-full items-center justify-center flex ">
                    <p className='text-charcoal-text1' style={{ whiteSpace: 'nowrap' }}>NOT A PIXIV CLONE</p>
                </div>
            </div>
            <div className="search-bar min-w-100 pl-10 pr-4 h-full flex flex-col align-middle justify-center">
                <div className="search-bar-wrapper flex flex-row items-center justify-center input transition-all duration-200 ease-in-out bg-charcoal-surface3 hover:bg-charcoal-transparent-press focus-within:bg-charcoal-surface3">
                    <div
                        className="search-input"
                        onFocus={() => {
                            handleSearchBarFocus();
                        }}
                    >
                        <Paper
                            component="form"
                            sx={{
                                p: '2px 4px',
                                display: 'flex',
                                alignItems: 'center',
                                width: 500,
                                backgroundColor: 'transparent',
                                transition: 'all 0.2s ease-in-out',
                                boxShadow: 'none',
                            }}
                        >
                            <SearchIcon color="action" />
                            <Divider sx={{ height: 28, m: 0.5, display: 'none' }} orientation="vertical" />
                            <InputBase
                                sx={{
                                    ml: 1,
                                    flex: 1,
                                    color: 'RGB(214,214,214)',
                                    fontFamily: 'Arial',
                                    fontSize: '1rem',
                                    height: '2.5rem',
                                    border: 'none',
                                }}
                                placeholder="Search works"
                            />
                            <Divider sx={{ height: 28, m: 0.5, display: 'none' }} orientation="vertical" />
                        </Paper>
                    </div>
                </div>
            </div>
            <div className='right-pannel flex flex-row justify-between min-w-fit'> 
                <div className="relative mr-10 inline-block w-fit" onClick={handleOverlayClick}>
                    <PostYourWork />
                </div>
                <div className="mail flex flex-row items-center px-4 text-2xl">
                    <IoMail />
                </div>
                <div className='Notifications flex items-center px-4 text-2xl'>
                    <IoIosNotifications />
                </div>
                <div className='profile-drop-down-container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ProfileDropdown />
                </div>
                <div className="apps flex items-center px-4 text-2xl">
                    <IoApps />
                </div>
            </div>
        </div>
    </>
  );
}

export default MainNavBar;