import React from 'react'
import Avatar from '../User/Avatar'
import ThemeToggleButton from './ThemeToggleButton';
import { useAuthStore } from '@/store/useAuthStore';
import LoginLogout from '../User/LoginLogout';


export default function ProfileSection({ isLoading }) {

    const { isLoggedIn, user } = useAuthStore()

    return (
        <div className='hidden lg:flex items-center gap-7 text-2xl'>

            <ThemeToggleButton />

            {
                isLoading &&
                <div className='text-[14px]'>Loading ...</div>
            }
            {
                isLoggedIn && !isLoading &&
                <div className='flex items-center gap-2 cursor-pointer'>
                    <Avatar width={36} height={36} />
                    <div className='text-[14px]'>{user.name}</div>
                </div>
            }

            <LoginLogout />

        </div>
    )
}
