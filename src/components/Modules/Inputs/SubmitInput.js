'use client'
import React from 'react'
import LoaderDot from '../Loaders/LoaderDot'

export default function SubmitInput({ buttonText, isLoading }) {
    return (
        <button
            type='submit'
            disabled={isLoading}
            className={`rounded-full bg-[var(--colorA)] w-[220px] lg:w-[350px] h-12 px-10 flex items-center justify-center font-semibold hoverLink hover:border-[var(--colorHover)] border-2 border-[var(--colorText)]`}>
            {isLoading ? <LoaderDot color='var(--colorText)' size={35} /> : buttonText }
        </button>
    )
}
