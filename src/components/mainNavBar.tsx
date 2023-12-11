/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa';

import { useFormControl } from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import Input from '@mui/joy/Input';


import { IoIosArrowDown, IoMdMailUnread, IoIosNotifications } from "react-icons/io";
import { IoMail, IoApps } from "react-icons/io5";

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
            <div className="left-side-pannel flex-row flex items-center justify-center pl-4 pr-4 space-x-5 w-fit h-full">
                <div className="hamburger-menu text-1xl">
                    <FaBars />
                </div>
                <div className="logo">
                    <p>NOT A PIXIV CLONE</p>
                </div>
            </div>
            <div className="search-bar min-w-10 px-10 h-full flex flex-col align-middle justify-center">
                <div className="search-bar-wrapper flex flex-row items-center justify-center space-x-2 input transition-all duration-200 ease-in-out bg-charcoal-surface3 hover:bg-charcoal-transparent-press focus-within:bg-charcoal-surface3">
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
            <div className='right-pannel flex flex-row'>
                <details className="create-post min-w-20 dropdown dropdown-bottom">
                    <summary tabIndex={0} className="m-1 btn btn-md px-6 rounded-full bg-charcoal-surface3 hover:bg-charcoal-surface3-hover color:text1"><p className='text-charcoal-text1 font-sans-serif'>Post your work</p> <IoIosArrowDown /></summary>
                    <div tabIndex={0} className="dropdown-content z-[1] card card-compact w-64 p-2 menu shadow bg-charcoal-surface8 text-white">
                        <div className="card-body">
                            <h4 className="card-title">NOT A PIXIV CLONE</h4>
                            <p>This is a project which aims to clone the Pixiv UI 
                                and functions. This is not a commercial project and
                                is only for personal use. This project is not affiliated
                                with Pixiv in any way.
                            </p>
                            <p>
                                That being said, this project is open source and is
                                available on Github. If you want to contribute, please
                                do so.
                            </p>
                        </div>
                    </div>
                </details>
                <div className="mail">
                    <IoMail />
                    <IoMdMailUnread />
                </div>
                <div className='Notifications'>
                    <IoIosNotifications />
                </div>
                <div className="profile-dropdown"></div>
                <div className="apps">
                    <IoApps />
                </div>
            </div>
        </div>
    </>
  );
}

export default MainNavBar;