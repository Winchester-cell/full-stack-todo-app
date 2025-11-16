'use client'
import React from 'react'

export default function TextInput({ registerKey, register, place , innerShadow }) {
    return (
        <div className={`rounded-full bg-[var(--colorA)] w-[220px] ${innerShadow ? `shadow-inner` : ``} lg:w-[350px] py-3 ps-10 pe-5`}>
            <input {...register(registerKey)} placeholder={place} type="text" className='block w-full text-[14px] placeholder:text-[14px]' />
        </div>
    )
}
