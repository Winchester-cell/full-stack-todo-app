'use client'
import { useTheme } from 'next-themes'
import React from 'react'
import { IoIosMoon } from "react-icons/io";
import { MdSunny } from "react-icons/md";

export default function ThemeToggleButton() {

    const { theme, setTheme } = useTheme()

    const toggleThemeHandler = () => {
        theme === 'dark' ? setTheme('light') : setTheme('dark')
    }

    return (
        <div className='hoverLink cursor-pointer flex' onClick={toggleThemeHandler}>
            {theme === 'dark' ? (< MdSunny />) : (<IoIosMoon />)}
        </div>
    )
}
