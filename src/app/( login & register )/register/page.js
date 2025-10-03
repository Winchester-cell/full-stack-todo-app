'use client'

import getUser from '@/api/auth/getuser';
import registerUser from '@/api/auth/register';
import PasswordInput from '@/components/Modules/Inputs/PasswordInput';
import SubmitInput from '@/components/Modules/Inputs/SubmitInput';
import TextInput from '@/components/Modules/Inputs/TextInput';
import LogoComponent from '@/components/Modules/Logo/Logo'
import { useToast } from '@/context/ToastContext';
import { useAuthStore } from '@/store/useAuthStore';
import { useTodoStore } from '@/store/useTodoStore';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';


export default function RegisterPage() {

    const { register, handleSubmit } = useForm()
    const { showToast } = useToast()
    const { setUser, setIsLoggedIn } = useAuthStore()
    const { setTodos } = useTodoStore()
    const [isLoading, setIsLoading] = useState(false)

    const submitHandler = async (data) => {
        if (isLoading) return;
        setIsLoading(true)
        const user = data
        const reqResult = await registerUser(user)
        if (reqResult.isOk) {
            showToast(reqResult.result)
            const userData = await getUser()
            setUser(userData)
            setTodos(user.todos)
            setIsLoggedIn(true)
            setIsLoading(false)
            redirect('/')
        } else {
            showToast(reqResult.result, 'error')
            setIsLoading(false)
        }
    }

    return (
        <div className='w-full h-[100dvh] flex items-center justify-center'>

            <form onSubmit={handleSubmit(submitHandler)} className='bg-[var(--colorB)] w-[300px] lg:w-[450px] lg:h-[600px] shadow-lg rounded-xl flex flex-col justify-center items-center gap-7 lg:gap-10 py-10'>

                <LogoComponent size={1.5} />

                <TextInput registerKey={'name'} register={register} place={'Name ...'} />

                <TextInput registerKey={'email'} register={register} place={'Email ...'} />

                <PasswordInput registerKey={'password'} register={register} />

                <SubmitInput buttonText={'Register'} isLoading={isLoading} />

                <ul className='text-sm w-full pl-16 flex flex-col gap-3 mt-3 list-disc'>
                    <li>
                        Already a member? ? <Link href={'/login'} className='text-[var(--colorHover)]'>Login</Link>
                    </li>
                </ul>

            </form>

        </div>
    )
}
