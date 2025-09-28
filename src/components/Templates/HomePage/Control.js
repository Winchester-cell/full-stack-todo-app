'use client'
import CreateTodoModal from '@/components/Modules/Modals/CreateTodoModal';
import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa6";

export default function Controls() {

    const [isOpen , setIsOpen] = useState(false)

    return (
        <>
            <div className='container flex items-center justify-between px-5'>

                <button onClick={()=>setIsOpen(true)} className="bg-[var(--colorB)] w-fit py-3 lg:py-5 px-7 text-[12px] lg:text-[1rem] lg:px-20 rounded-full shadow-lg flex items-center gap-1">
                    <FaPlus /> Add Project
                </button>

            </div>
            <CreateTodoModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
}
