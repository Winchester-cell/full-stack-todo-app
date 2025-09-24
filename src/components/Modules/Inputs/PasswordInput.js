'use client'
import React, { useState } from 'react'
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";


export default function PasswordInput({ registerKey, register }) {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    return (
        <div className='rounded-full bg-[var(--colorA)] w-[220px] lg:w-[350px] py-5 ps-10 pe-5 flex items-center justify-between'>
            <input {...register(registerKey)} placeholder='Password ...' type={isPasswordVisible ? 'text' : 'password'} className='block w-[100%]' />
            <div onClick={() => setIsPasswordVisible(!isPasswordVisible)} className='cursor-pointer'>
                {isPasswordVisible ? <RiEyeOffFill /> : <RiEyeFill />}
            </div>
        </div>
    )
}
