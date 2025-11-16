'use client'
import CreateTodoModal from '@/components/Modules/Modals/CreateTodoModal';
import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import SearchProject from './SearchProject';
import PaginationControls from './PaginationControls';
import useProjectsPagination from '@/hooks/useProjectPagination';
import useTodos from '@/hooks/query-hooks/useTodos';
import { useTodoStore } from '@/store/useTodoStore';

export default function Controls() {
    const { filterValue } = useTodoStore()
    const { data } = useTodos({ filterValue })
    // state for open/close => create project modal
    const [isOpen, setIsOpen] = useState(false)
    // pagination states  
    const pageInfo = useProjectsPagination(data?.totalPages)

    return (
        <>
            {/* mobile template */}
            <div className='container flex lg:flex-row flex-col lg:items-center lg:justify-between gap-3 lg:gap-5 px-5'>
                <div className='flex items-center gap-3'>
                    {/* create project */}
                    <button onClick={() => setIsOpen(true)} className="justify-center bg-[var(--colorB)] w-[155px] lg:w-fit py-3 lg:py-4 px-6 text-[12px] lg:text-[14px] lg:px-20 rounded-full shadow-lg flex items-center gap-1">
                        <FaPlus /> Add Project
                    </button>
                    {/* search component and search functions */}
                    <SearchProject />
                </div>
                {/* pagination control */}
                <PaginationControls {...pageInfo} />
            </div>
            {/* create project modal */}
            <CreateTodoModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
}
