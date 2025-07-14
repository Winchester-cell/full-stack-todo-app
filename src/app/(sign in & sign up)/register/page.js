'use client'

import registerUser from '@/api/auth/register';
import PasswordInput from '@/components/Modules/Inputs/PasswordInput';
import SubmitInput from '@/components/Modules/Inputs/SubmitInput';
import TextInput from '@/components/Modules/Inputs/TextInput';
import LogoComponent from '@/components/Modules/Logo/Logo'
import Link from 'next/link';
import React from 'react'
import { useForm } from 'react-hook-form';


export default function RegisterPage() {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const submitHandler = async (data) => {
        const user = data
        const reqResult = await registerUser(user)
        alert(reqResult)
    }

    return (
        <div className='w-full h-[100dvh] flex items-center justify-center'>

            <form onSubmit={handleSubmit(submitHandler)} className='bg-[var(--colorB)] w-[450px] h-[600px] shadow-lg rounded-xl flex flex-col items-center gap-10 py-10'>

                <LogoComponent size={1.5} />

                <TextInput registerKey={'name'} register={register} place={'Name ...'} />

                <TextInput registerKey={'email'} register={register} place={'Email ...'} />

                <PasswordInput registerKey={'password'} register={register} />

                <SubmitInput buttonText={'Register'} />

                <ul className='text-sm w-[350px] pl-5 flex flex-col gap-3 mt-3 list-disc'>
                    <li>
                        Already a member? ? <Link href={'/login'} className='text-[var(--colorHover)]'>Login</Link>
                    </li>
                </ul>

            </form>

        </div>
    )
}
