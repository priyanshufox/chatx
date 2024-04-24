'use client'
import { Outfit } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import { useState } from 'react'

import { UserDetailContext } from './_context/UserDetailContext'


const inter = Outfit({ subsets: ['latin'] })


export default function RootLayout({ children }) {
  const [userDetail, setUserDetail] = useState();
  return (

    <ClerkProvider>
      <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>


        <html lang="en">
          <body className={inter.className} >{children}
          <Toaster />
          </body>
        </html>
      </UserDetailContext.Provider>

    </ClerkProvider>


  )
}
