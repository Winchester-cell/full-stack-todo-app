import { getTodo } from '@/api/todos/getTodo'
import TodoCard from '@/components/Modules/Cards/TodoCard'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function TodosContainer({ id }) {

    const { data } = useQuery({
        queryKey: ['todo', id],
        queryFn: () => getTodo(id),
    })

    return (
        <div className='flex flex-col gap-5 p-5 container'>
            {
                data?.tasks?.map((task, index) => {
                    return <TodoCard key={task._id} index={index} {...task} />
                })
            }
        </div>
    )
}
