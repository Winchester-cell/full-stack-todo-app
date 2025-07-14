import { navbarContent } from '@/content/appContent'
import React from 'react'
import NavbarLinks from './NavbarLinks'

export default function NavbarLinkContainer() {
    return (
        <ul className='flex items-center gap-5 font-semibold'>
            {
                navbarContent.links.map((link, index) => {
                    return <NavbarLinks key={index} {...link} />
                })
            }
        </ul>
    )
}
