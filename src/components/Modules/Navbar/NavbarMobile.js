'use client'
import { navbarContent } from '@/content/appContent'
import React from 'react'
import NavbarLinks from './NavbarLinks'
import useNavbarStore from '@/store/useNavbarStore'
import Avatar from '../User/Avatar'
import { useAuthStore } from '@/store/useAuthStore'
import ThemeToggleButton from './ThemeToggleButton'
import LoginLogout from '../User/LoginLogout'
import EnClockMobile from '../Clock/EnClockMobile'

export default function NavbarMobile({ isLoading }) {

    const { isOpen, toggleNavbar } = useNavbarStore()
    const { isLoggedIn, user } = useAuthStore()

    return (
        <>
            <div className={`${isOpen ? `translate-x-0` : `-translate-x-full`} overflow-y-auto z-[999] shadow-lg flex flex-col lg:hidden w-[270px] h-[100dvh] fixed top-0  bg-[var(--colorB)] transition-all ease-in duration-500 p-5`}>

                {/* user info & avatar */}
                <div className='border-b-2 pb-10 mb-10 border-[var(--colorTextB)] mt-10'>
                    {
                        isLoading &&
                        <div className='text-[14px]'>Loading ...</div>
                    }
                    {
                        isLoggedIn && !isLoading &&
                        <div className='flex items-center gap-2 cursor-pointer'>
                            <Avatar width={72} height={72} />
                            <div className='text-2xl line-clamp-1'>{user.name}</div>
                        </div>
                    }

                </div>
                
                {/* nav links */}
                <ul className='flex flex-col gap-10 pl-5 text-xl border-b-2 pb-10 mb-10 border-[var(--colorTextB)]'>
                    {navbarContent.links.map((item, index) => {
                        return <NavbarLinks key={index} {...item} />
                    })}
                </ul>
                
                {/* clock & date */}
                <div className='border-b-2 pb-10 mb-10 border-[var(--colorTextB)]'>
                    <EnClockMobile />
                </div>
                
                {/* login logout section */}
                <div className='flex gap-5 pl-5'>
                    <LoginLogout width={30} height={30} />
                    <ThemeToggleButton width={30} height={30} />
                </div>

            </div>

            {/* overlay */}
            <div className={`${isOpen ? `block` : `hidden`} lg:hidden fixed top-0 left-0 w-screen h-screen backdrop-blur-sm bg-[#00000033] z-[990]`} onClick={toggleNavbar}>
            </div>

        </>
    )
}
