'use client'
import React ,{useContext, useState}from 'react'
import {Image, Send, Video }from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button';
import GlobalApi from '@/app/_utils/GlobalApi';
import { UserDetailContext } from '@/app/_context/UserDetailContext';
import { useToast } from '@/components/ui/use-toast';

function WritePost({getAllPost}) {
    const {user}=useUser();
    const [userInputPost,setUserInputPost]=useState('');
    const { toast } = useToast()
    const {userDetail,setUserDetail}=useContext(UserDetailContext);
    const onCreatePost =()=>{
        const data ={
            postText:userInputPost,
            createdAt: Date.now().toString(),
            createdBy:userDetail._id,
        }
        GlobalApi.createPost(data).then(res=>{
            console.log(res);
            setUserInputPost('');
            if(res)
            {
                getAllPost();
                toast({
                    title: 'Awesome!',
                    description: 'Your Post Publish successfully',
                    variant: "success"
                })
            }
        
        },(error)=>{
            toast({
                title: 'Opps!!!',
                description: 'Server Error, Please try again later',
                variant: "destructive"
            })
        })
    }
  return (
    <div>
        <h2 className='text-[30px] font-medium text-gray-600 '>Hello,{user.firstName}</h2>
        <h2 className='text-gray-400'>What's New with You? Would you like to share something with community</h2>
        <div className='p-3 border rounded-lg mt-5 bg-slate-100'>
            <h2>Create Post</h2>
            <div className='p-4 bg-white rounded mt-2'>
                <textarea placeholder="What's New ?" className='outline-none w-full'
                value={userInputPost}
                onChange={(e)=>setUserInputPost(e.target.value)}
                />
            </div>
            <div className='mt-4 flex justify-between'>
                <div className='flex gap-5'>

                <h2 className='flex gap-2 items-center cursor-pointer hover:bg-slate-200 p-2 rounded-lg '><Image className='h-5 w-5'/> Image</h2>
                <h2 className='flex gap-2 items-center cursor-pointer hover:bg-slate-200 p-2 rounded-lg '><Video className='h-5 w-5'/> Image</h2>
                </div>
                <Button className='bg-blue-500 rounded-xl gap-2 hover:bg-blue-600 'disabled={!userInputPost?.length} onClick={()=>onCreatePost()}><Send className='h-4 w-4'/ >Publish</Button>
            </div>
        </div>
    </div>
  )
}

export default WritePost