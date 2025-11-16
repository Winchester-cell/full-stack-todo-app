'use client'
import React, { useState } from 'react'
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";


export default function PasswordInput({ registerKey, register, place = 'Password ...' }) {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    return (
        <div className='rounded-full bg-[var(--colorA)] w-[220px] lg:w-[350px] py-3 ps-10 pe-5 flex items-center justify-between'>
            <input {...register(registerKey)} placeholder={place} type={isPasswordVisible ? 'text' : 'password'} className='block w-[100%]  text-[14px] placeholder:text-[14px]' />
            <div onClick={() => setIsPasswordVisible(!isPasswordVisible)} className='cursor-pointer'>
                {isPasswordVisible ? <RiEyeOffFill /> : <RiEyeFill />}
            </div>
        </div>
    )
}
