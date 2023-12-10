/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa';

import { useFormControl } from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';

import { IoIosArrowDown, IoMdMailUnread, IoIosNotifications } from "react-icons/io";
import { IoMail, IoApps } from "react-icons/io5";

const MainNavBar = () => {
    const displaySearchBar = () => {
        console.log("Search bar clicked");
    }
  return (
    <>
        <div className="nav-bar-wrapper flex-row flex items-center bg-charcoal-background1 static top-0 h-15 justify-between ">
            <div className="left-side-pannel flex-row flex items-center justify-center pl-4 pr-4 space-x-5 w-fit h-full">
                <div className="hamburger-menu text-1xl">
                    <FaBars />
                </div>
                <div className="logo">
                    <p>NOT A PIXIV CLONE</p>
                </div>
            </div>
            <div className="search-bar min-w-10 px-10 h-full flex align-middle">
                <div className="search-bar-wrapper flex flex-row items-center justify-center space-x-2">
                    <div className="search-input" onFocus={
                        () => {displaySearchBar()}
                    }>
                        <Paper
                            component="form"
                            sx={{
                                p: '2px 4px',
                                display: 'flex',
                                alignItems: 'center',
                                width: 500,
                                backgroundColor: 'RGB(255,255,255, 0.12)',
                                transition: 'all 0.2s ease-in-out',
                                ":hover": { backgroundColor: "RGB(255,255,255,0.2)" },
                                ":focus-within": { backgroundColor: "RGB(255,255,255,0.12)", border: '1px solid #669FC2' }
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
                                    boxShadow: 'none', // Remove shadow
                                    height: '2.5rem',
                                }}
                                placeholder="Search works"
                            />
                            <Divider sx={{ height: 28, m: 0.5, display: 'none' }} orientation="vertical" />
                        </Paper>
                    </div>
                </div>
            </div>
            <div className='right-pannel flex flex-row'>
                <div className="create-post min-w-20 dropdown dropdown-bottom">
                        <div tabIndex={0} className="m-1 btn btn-md px-6 rounded-full bg-charcoal-surface3 hover:bg-charcoal-surface3-hover color:text1"><p className='text-charcoal-text1 font-sans-serif'>Post your work</p> <IoIosArrowDown /></div>
                        <div tabIndex={0} className="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-black text-white">
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
                    </div>
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