/* eslint-disable @typescript-eslint/no-unused-vars */
import { Menu, Transition } from '@headlessui/react'
import React from 'react'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import {useAuth} from '../hooks/useAuth'
import { useAccountName } from '../hooks/useAccountName'

export const PostYourWork = () => {
    const { user } = useAuth();
    const { accountName } = useAccountName();
    const navigate = useNavigate();
  return (
    <Menu as="div">
                        <Menu.Button className="flex items-center justify-center h-full ">
                        <p className='text-charcoal-text1 btn rounded-full bg-charcoal-surface3 hover:bg-charcoal-icon6-hover' style={{ whiteSpace: 'nowrap' }}>Post your work</p>
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
                                
                            <Menu.Items className="absolute px-3 mt-5 py-3 w-40 origin-top-right divide-y divide-charcoal-transparent rounded-md bg-charcoal-surface2 shadow-lg ring-1 ring-black/5 focus:outline-none">
                                <div className='divide-opacity-0'>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${
                                                    active ? 'bg-charcoal-surface2-hover text-white' : 'text-white ' 
                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                onClick={() => navigate(`/${accountName}/uploadillustration`)}
                                            >
                                                Illustration
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
                                                Animation
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
                                                Manga
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
                                                Novels
                                            </button>
                                        )}
                                    </Menu.Item>
                                </div>
                                <div>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${
                                                    active ? 'bg-charcoal-surface2-hover text-white' : 'text-white ' 
                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                                Sketch
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
                                                Start a live stream
                                            </button>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
  )
}

export default PostYourWork