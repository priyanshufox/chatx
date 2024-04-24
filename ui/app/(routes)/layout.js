"use client"
import React, { useState, useEffect, useContext } from 'react'
import SideNav from './_components/SideNav'
import Header from './_components/Header'


import { useUser } from '@clerk/nextjs';
import GlobalApi from '../_utils/GlobalApi'
import { UserDetailContext } from '../_context/UserDetailContext';
import Image from 'next/image';
import Link from 'next/link';

function layout({ children }) {
  const [toggleSideBar, setToggleSideBar] = useState(true)
  const { user } = useUser();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  useEffect(() => {
    user && getUserDetails(user);
  }, [user])


  const getUserDetails = () => {
    GlobalApi.getUserByEmail(user.primaryEmailAddress.emailAddress).then(res => {

      setUserDetail(res.data);
    })
  }
  return (
    <div>

      {/* This side bar used when screen size is medium or larger  */}
      <div className=' hidden md:w-64 md:block h-screen fixed'>
        <SideNav />
      </div>
      {/* This side bar used when screen size is smaller/mobile  */}
      {toggleSideBar &&
        <div className='bg-white absolute md:w-64 md:block h-screen 
        animate-in duration-700'>
          <SideNav toggleSideBar={() => setToggleSideBar(false)} />
        </div>}


      <div className='md:ml-64'>
        {/* Header  */}
        <Header toggleSideBar={() => setToggleSideBar(true)} />
        <div className='grid grid-cols-1 md:grid-cols-3'>
          {/* user used render page route  */}
          <div className='md:col-span-2'>
            {children}
          </div>
          {/* Right Most Section of page */}
          <div className='p-5 flex-col items-center justify-items-center'>
            

          </div>
        </div>

      </div>

    </div>
  )
}

export default layout