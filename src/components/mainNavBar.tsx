/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa';
import { CiImageOn } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowDown, IoMdMailUnread, IoIosNotifications } from "react-icons/io";
import { IoMail, IoApps } from "react-icons/io5";

import { useFormControl } from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import Input from '@mui/joy/Input';

import ProfilePicture from './profileicon';
import ProfileDropdown from './profileicondropdown';

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

    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    const handleArrowClick = () => {
        setShowProfileDropdown(!showProfileDropdown);
    };

  return (
    <>
        <div className="nav-bar-wrapper flex-row flex items-center bg-charcoal-background1 relative top-0 h-16 justify-between z-10">
            <div className="left-side-pannel flex-row flex items-center justify-start px-4 min-w-fit h-full">
                <div className="drawer">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle " />
                    <div className="drawer-content">
                        <label htmlFor="my-drawer" className="btn btn-ghost no-animation drawer-button"> <FaBars /></label>
                    </div> 
                    <div className="drawer-side">
                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <li><a>Sidebar Item 1</a></li>
                        <li><a>Sidebar Item 2</a></li>
                        
                        </ul>
                    </div>
                </div>
                <div className="logo w-fit px-5 h-full">
                    <p className='text-charcoal-text1'>NOT A PIXIV CLONE</p>
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
                <details className="create-post min-w-20 dropdown dropdown-bottom" onClick={ () => {
                    handleOverlayClick();
                }}>
                    <summary tabIndex={0} className="m-1 btn btn-md px-6 rounded-full bg-charcoal-surface3 hover:bg-charcoal-surface3-hover color:text1"><p className='text-charcoal-text1 font-sans-serif'>Post your work</p> <IoIosArrowDown /></summary>
                    <div tabIndex={0} className="dropdown-content z-[1] card card-compact w-64 p-2 menu shadow bg-charcoal-surface4 text-white" role='menu'>
                        <div className="card-body divide-y">
                            <ul className=''>
                                <div className='py-1 w-100 hover:bg-charcoal-background2-hover flex flex-col' role='none'>
                                    <li className='px-4 py-2 text-sm' role='menuitem'>Illustrations</li>
                                </div>
                                <div className='py-1 w-100 hover:bg-charcoal-background2-hover' role='none'>
                                    <li className='px-4 py-2 text-sm' role='menuitem'>Ugoira</li>
                                </div>
                                <div className='py-1 w-100 hover:bg-charcoal-background2-hover' role='none'>
                                    <li className='px-4 py-2 text-sm' role='menuitem'>Manga</li>
                                </div>
                                <div className='py-1 w-100 hover:bg-charcoal-background2-hover' role='none'>
                                    <li className='px-4 py-2 text-sm' role='menuitem'>Novels</li>
                                </div>
                            </ul>
                            <ul>
                                <div className='py-1 w-100 hover:bg-charcoal-background2-hover' role='none'>
                                    <li className='px-4 py-2 text-sm' role='menuitem'>Sketch</li>
                                </div>
                                <div className='py-1 w-100 hover:bg-charcoal-background2-hover' role='none'>
                                    <li className='px-4 py-2 text-sm' role='menuitem'>Start a Live Stream</li>
                                </div>
                            </ul>
                        </div>
                    </div>
                </details>
                <div className="mail flex flex-row items-center px-4 text-2xl">
                    <IoMail />
                </div>
                <div className='Notifications flex items-center px-4 text-2xl'>
                    <IoIosNotifications />
                </div>
                <div className="profile-dropdown flex items-center text-2xl">
                    <details className="create-post min-w-20 dropdown dropdown-end" onClick={ () => {
                    handleOverlayClick();
                }}>
                    <summary tabIndex={0} className="m-1 btn btn-ghost bg-transparent hover:bg-transparent rounded-full no-animation"> <ProfilePicture /> <IoIosArrowDown /></summary>
                    <div tabIndex={0} className="dropdown-content z-[1] card card-compact w-64 p-2 menu shadow bg-charcoal-surface4 text-white" role='menu'>
                        <div className="card-body">
                            <ProfileDropdown />
                        </div>
                    </div>
                </details>
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