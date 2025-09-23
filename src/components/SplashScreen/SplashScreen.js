'use client'
import React, { useEffect, useState } from 'react'
import { SiSimplenote } from 'react-icons/si'


export default function SplashScreen({ children }) {

    const [visible, setVisible] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setVisible(false)
        }, 2000)
    }, [])

    if (!visible) {
        return null
    }

    return (
        <div className='w-[100dvw] h-[100dvh] bg-[var(--colorA)] fixed top-0 left-0 z-[999999] flex items-center justify-center'>
            <div className={`flex items-center gap-5 text-[100px] font-[bebasBold]`}>
                <SiSimplenote /> <span>NEXT TODO</span>
            </div>
        </div>
    )
}
