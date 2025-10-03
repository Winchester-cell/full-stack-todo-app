'use client'
import getUser from '@/api/auth/getuser'
import { useAuthStore } from '@/store/useAuthStore'
import { useTodoStore } from '@/store/useTodoStore'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { SiSimplenote } from 'react-icons/si'


export default function SplashScreen() {

    const [visible, setVisible] = useState(true)
    const { setIsLoggedIn, setUser } = useAuthStore()
    const {todos , setTodos} = useTodoStore()

    const { data } = useQuery({
        queryKey: ['user'],
        queryFn: getUser
    })


    useEffect(() => {
        setTimeout(() => {
            setVisible(false)
        }, 2000)
    }, [])

    useEffect(() => {
        setIsLoggedIn(!!data)
        setUser(data)
        setTodos(data?.todos) 
    }, [data])

    if (!visible) {
        return null
    }

    return (
        <div className='w-[100dvw] h-[100dvh] bg-[var(--colorA)] fixed top-0 left-0 z-[999999] flex items-center justify-center'>
            <div style={{ fontFamily: "var(--font-bebasBold)" }} className={`flex items-center gap-5 text-[60px] lg:text-[100px]`}>
                <SiSimplenote /> <span>NEXT TODO</span>
            </div>
        </div>
    )
}
