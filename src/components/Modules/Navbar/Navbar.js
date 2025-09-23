'use client'
import React, { useEffect } from 'react'
import NavbarLinkContainer from './NavbarLinkContainer'
import LogoComponent from '../Logo/Logo'
import ProfileSection from './ProfileSection';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import getUser from '@/api/auth/getuser';
import NavbarMobile from './NavbarMobile';
import { IoMenu } from "react-icons/io5";
import useNavbarStore from '@/store/useNavbarStore';

export default function Navbar() {

  const { setIsLoggedIn, setUser } = useAuthStore()
  const { toggleNavbar } = useNavbarStore()
  const path = usePathname()

  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUser
  })

  useEffect(() => {
    setIsLoggedIn(!!data)
    setUser(data)
  }, [data])

  if (path === '/login' || path === '/register') {
    return null
  }

  return (

    <>
      <NavbarMobile isLoading={isLoading} />

      <div className='p-5 w-full h-[100px] select-none'>

        <div className='container w-full h-full bg-[var(--colorB)] shadow-lg rounded-full flex items-center justify-between px-10'>

          {/* logo and nav links */}

          <div className='flex items-center gap-10'>

            {/* logo */}

            <LogoComponent />

            {/* nav links */}

            <NavbarLinkContainer />

          </div>

          {/* profile and login */}

          <IoMenu onClick={toggleNavbar} className='w-10 h-10 lg:hidden' />

          <ProfileSection isLoading={isLoading} />

        </div>

      </div>
    </>

  )
}
