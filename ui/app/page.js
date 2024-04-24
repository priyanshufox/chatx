"use client"
import Image from 'next/image'
import { useEffect } from 'react';
import GlobalApi from './_utils/GlobalApi';
import { useState } from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  const { user } = useUser();
 

  useEffect(() => {
    user && createUserProfile();
   }, [user]);
   const createUserProfile =()=>{
     if(!localStorage.getItem('isLogin')){
       const data ={
         name:user.fullName,
         email:user.primaryEmailAddress.emailAddress,
         image:user.imageUrl
       }
       GlobalApi.createUser(data).then((res)=>{
         console.log(res.data)
 
         localStorage.setItem('isLogin',true)
       })
     }
     
   }
  return (
    <div className='flex items-center justify-center'>
<div className='w-[100] m-32'>
    <Image src='/social-panda-1.png' width={200} height={200} alt='panda'/>
    <h2 className='font-bold text-[29px] '>WELCOME TO ChatX</h2>
    <h2 className=''>Join Community, Create and Share your thought</h2>
   <Link href='/home'> <Button>Get Started</Button></Link>
  </div>
    </div>
  
  )
}
