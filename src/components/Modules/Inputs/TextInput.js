'use client'
import React from 'react'

export default function TextInput({ registerKey, register, place }) {
    return (
        <div className='rounded-full bg-[var(--colorA)] w-[200px] lg:w-[350px] py-5 px-10'>
            <input {...register(registerKey)} placeholder={place} type="text" className='block' />
        </div>
    )
}
