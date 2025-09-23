import TodoTitleCard from '@/components/Modules/Cards/TodoTitleCard'
import { useAuthStore } from '@/store/useAuthStore'
import React from 'react'

export default function ProjectListContainer() {

    const { user } = useAuthStore()

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
