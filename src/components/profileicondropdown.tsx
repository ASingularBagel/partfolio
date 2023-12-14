/* eslint-disable @typescript-eslint/no-unused-vars */
import { Menu, Transition } from '@headlessui/react'
import { Fragment, SVGProps } from 'react'

import { useAuth } from '../hooks/useAuth'
import { useState, useEffect } from 'react';
import { auth, rtdb } from '../firebase/config'
import { ref, onValue, get, child } from 'firebase/database';

import ProfilePicture from './profileicon'

import { JSX } from 'react/jsx-runtime'
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { set } from 'firebase/database';


export default function ProfileDropdown() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState<string | null>('Anonymous');
  const [accountname, setAccountname] = useState<string | null>('@Anonymous');
  const [background, setBackground] = useState<string | null>('https://firebasestorage.googleapis.com/v0/b/partfolio-project.appspot.com/o/background-photos%2FVgxAbkDsWZUNBchhkYBKk05kpuP2%2Fshuttle-grey.jpg?alt=media&token=d6b6b1ee-98c1-401e-85b3-45ab41560b44');

  const [followers, setFollowers] = useState<number>(0);
  const [following, setFollowing] = useState<number>(0);

  useEffect(() => {
    if (user) {
      const fetchAccountInfo = async () => {
        const docRef = ref(rtdb, 'users/' + user.uid);
        onValue(docRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setUsername(data?.displayName);
            setAccountname(data?.accountName);
            setBackground(data?.backgroundURL);
          }
        });
      };
  
      fetchAccountInfo();
    }
  }, [user]);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/');
  }
  
  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className=" flex w-profile-sm h-profile-sm border-2 overflow-hidden rounded-full border-white">
          <ProfilePicture />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-5 w-56 origin-top-right divide-y divide-charcoal-transparent rounded-md bg-charcoal-surface2 shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className='divide-opacity-0'>
            <Menu.Item>
                {({ active }) => (
                  <div
                    className={`group flex w-full h-14 mb-40 items-start px-5 py-2 text-sm flex-col bg-auto bg-no-repeat bg-center ${background && `bg-${background}`}`}
                  >
                    <div className='relative pb-5'>
                      <div className='relative mt-5 mb-2 w-profile-sm-2 h-profile-sm-2 overflow-hidden items-center border-2 rounded-full bg-charcoal-surface1'>
                        <ProfilePicture />
                      </div>
                      <p className='text-white'>{username}</p>
                      <p className='text-xs'>{accountname}</p>
                    </div>

                    <div className='flex flex-row justify-between gap-6'>
                      <div className='following'>
                        <p className='text-white'>Following</p>
                        <p className=''>{followers}</p>
                      </div>
                      <div className='followers'>
                        <p className='text-white'>Following</p>
                        <p className=''>{following}</p>
                      </div>
                    </div>

                  </div>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-charcoal-surface2-hover text-white' : 'text-white ' 
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Dashboard
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-charcoal-surface2-hover text-white' : 'text-white ' 
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    My Works
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
            <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-charcoal-surface2-hover text-white' : 'text-white ' 
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Bookmarks
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-charcoal-surface2-hover text-white' : 'text-white ' 
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Browsing History
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
            <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-charcoal-surface2-hover text-white' : 'text-white ' 
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Dark mode
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-charcoal-surface2-hover text-white' : 'text-white ' 
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Account settings
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-charcoal-surface2-hover text-white' : 'text-white ' 
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`} onClick={handleSignOut}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}