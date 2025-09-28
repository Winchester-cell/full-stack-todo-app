import TodoTitleCard from '@/components/Modules/Cards/TodoTitleCard'
import { useAuthStore } from '@/store/useAuthStore'
import React from 'react'
import { IoFolder } from "react-icons/io5";


export default function ProjectListContainer() {

    const { user } = useAuthStore()

    if (user?.todos?.length === 0) {
        return (
            <div className='container flex-grow p-5'>
                <div className='border-2 border-dashed rounded-2xl text-[var(--colorTextB)] border-[var(--colorTextB)] h-full flex items-center justify-center'>
                    <div className='flex flex-col items-center'>
                        <IoFolder className='w-16 h-16'/>
                        <div>No Project created yet !</div>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div className='container px-5 py-5'>
            <div className='grid grid-cols-1 xl:grid-cols-3 gap-5'>
                {
                    user?.todos?.map(todo => {
                        return <TodoTitleCard key={todo._id} {...todo} />
                    })
                }
            </div>
        </div>
    )
}
