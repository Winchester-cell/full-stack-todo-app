'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function NavbarLinks({ text, href }) {

    const path = usePathname()

    return (
        <li className={`list-none hoverLink ${path === href ? `text-[var(--colorHover)]` : ``}`}>
            <Link href={href}>{text}</Link>
        </li>
    )
}
