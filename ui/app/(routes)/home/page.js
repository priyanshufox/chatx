'use client'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import Banner from './_components/Banner'
import WritePost from './_components/WritePost';
import PostList from './_components/PostList';
import GlobalApi from '@/app/_utils/GlobalApi';

function Home() {
  const{user}=useUser();
  const [postList,setPostList]=useState([]);
    useEffect(()=>{
        getAllPost();
    },[])
    const getAllPost =()=>{
        GlobalApi.getAllPost().then((res)=>{
            console.log(res.data);
            setPostList(res.data)
        })
    }
  return (
    
    <div className='p-5 px-10'>
     {!user?
      <Banner/>
    :<WritePost getAllPost={()=>getAllPost()}/>
     } 
     <PostList postList={postList} updatePostList={()=>getAllPost()}/>
    </div>
  )
}

export default Home