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
  return (
    <>
        <div className="nav-bar-wrapper flex-row flex items-center justify-center static top-0 h-20 bg-black justify-between">
            <div className="left-side-pannel bg-red-700 flex-row flex items-center justify-center pl-4 pr-4 space-x-5 w-fit h-full">
                <div className="hamburger-menu text-1xl">
                    <FaBars />
                </div>
                <div className="logo">
                    <p>LOGO</p>
                </div>
            </div>
            <div className="search-bar">
                <div className="search-bar-wrapper flex flex-row items-center justify-center space-x-2">
                    <div className="search-input">
                        <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, backgroundColor: '' }}
                        >
                            <SearchIcon color="action" />
                            <Divider sx={{ height: 28, m: 0.5, display: 'none' }} orientation="vertical" />
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search works"
                                inputProps={{ 'aria-label': 'search google maps' }}
                            />
                            <Divider sx={{ height: 28, m: 0.5, display: 'none' }} orientation="vertical" />
                        </Paper>
                    </div>
                </div>
            </div>
            <div className="create-post dropdown dropdown-top dropdown-hover">
                    <div tabIndex={0} className="m-1 btn btn-md px-6 rounded-full">Post your work <IoIosArrowDown /></div>
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
    </>
  );
}

export default MainNavBar;