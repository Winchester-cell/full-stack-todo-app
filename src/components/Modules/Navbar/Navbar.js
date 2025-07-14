'use client'
import React, { useEffect } from 'react'
import NavbarLinkContainer from './NavbarLinkContainer'
import LogoComponent from '../Logo/Logo'
import ProfileSection from './ProfileSection';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import getUser from '@/api/auth/getuser';

export default function Navbar() {

  const { setIsLoggedIn , user , setUser } = useAuthStore()
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
    <div className='px-5 py-3 w-full h-[85px] select-none'>

      <div className='container w-full h-full bg-[var(--colorB)] shadow-lg rounded-full flex items-center justify-between px-10'>

        {/* logo and nav links */}

        <div className='flex items-center gap-10'>

          {/* logo */}

          <LogoComponent />

          {/* nav links */}

          <NavbarLinkContainer />

        </div>

        {/* profile and login */}

        <ProfileSection isLoading={isLoading} />

      </div>

    </div>
  )
}
