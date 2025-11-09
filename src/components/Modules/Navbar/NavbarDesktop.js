import useNavbarStore from '@/store/useNavbarStore'
import React from 'react'
import LogoComponent from '../Logo/Logo'
import NavbarLinkContainer from './NavbarLinkContainer'
import ProfileSection from './ProfileSection'
import { IoMenu } from 'react-icons/io5'

export default function NavbarDesktop({ isLoading }) {

    const { toggleNavbar } = useNavbarStore()

    return (
        <div className='p-5 w-full h-[100px] select-none'>

            <div className='container w-full h-full bg-[var(--colorB)] shadow-lg rounded-full flex items-center justify-between px-10'>

                {/* logo and nav links */}

                <div className='flex items-center gap-10'>

                    {/* logo */}

                    <LogoComponent />

                    {/* nav links */}

                    <NavbarLinkContainer />

                </div>

                {/* hamburger menu ( only appear in mobile version ) */}
                <IoMenu onClick={toggleNavbar} className='w-10 h-10 lg:hidden' />

                {/* profile and login */}
                <ProfileSection isLoading={isLoading} />

            </div>

        </div>
    )
}
