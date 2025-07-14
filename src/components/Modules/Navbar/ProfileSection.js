'use client'

import React from 'react'
import Avatar from '../User/Avatar'
import { LuLogOut, LuLogIn } from "react-icons/lu";
import ThemeToggleButton from './ThemeToggleButton';
import { useAuthStore } from '@/store/useAuthStore';
import Link from 'next/link';
import logout from '@/api/auth/logout';
import { redirect } from 'next/navigation';

export default function ProfileSection({ isLoading }) {

    const { isLoggedIn, setIsLoggedIn, user } = useAuthStore()
    const logOutHandler = async () => {
        const res = await logout()
        if (res.isOk) {
            setIsLoggedIn(false)
            redirect('/')
        }
    }

    return (
        <div className='flex items-center gap-7 text-2xl'>

            <ThemeToggleButton />
            {
                isLoading &&
                <div className='text-[14px]'>Loading</div>
            }
            {
                isLoggedIn && !isLoading &&
                <div className='flex items-center gap-2 cursor-pointer'>
                    <Avatar />
                    <div className='text-[14px]'>{user.name}</div>
                </div>
            }
            <div className='hoverLink cursor-pointer'>
                {
                    isLoggedIn ? (<button onClick={logOutHandler} className='block'><LuLogOut /></button>) : (<Link href={'/login'}><LuLogIn /></Link>)
                }
            </div>
        </div>

    )
}
