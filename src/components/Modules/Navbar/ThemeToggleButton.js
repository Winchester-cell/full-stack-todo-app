'use client'
import { useTheme } from 'next-themes'
import React from 'react'
import { IoIosMoon } from "react-icons/io";
import { MdSunny } from "react-icons/md";

export default function ThemeToggleButton({ width, height }) {

    const { theme, setTheme } = useTheme()

    const toggleThemeHandler = () => {
        theme === 'dark' ? setTheme('light') : setTheme('dark')
    }

    return (
        <div className='hoverLink cursor-pointer flex' style={{ width: width, height: height }} onClick={toggleThemeHandler}>
            {theme === 'dark' ? (< MdSunny style={{ width: width, height: height }} />) : (<IoIosMoon style={{ width: width, height: height }} />)}
        </div>
    )
}
