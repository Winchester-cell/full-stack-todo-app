'use client'
import React from 'react'

export default function SubmitInput({buttonText}) {
    return (
        <button
            type='submit'
            className={`rounded-full bg-[var(--colorA)] w-[350px] py-5 px-10 flex items-center justify-center font-semibold hoverLink hover:border-[var(--colorHover)] border-2 border-[var(--colorText)]`}>
            {buttonText}
        </button>
    )
}
