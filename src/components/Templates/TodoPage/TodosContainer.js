import { getTodo } from '@/api/todos/getTodo'
import AnimateOnScroll from '@/components/AnimateOnScrollWrapper/AnimateOnScroll'
import TodoCard from '@/components/Modules/Cards/TodoCard'
import EditTaskModal from '@/components/Modules/Modals/EditTaskModal'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'

export default function TodosContainer({ id }) {

    const { data } = useQuery({
        queryKey: ['todo', id],
        queryFn: () => getTodo(id),
    })

    const [taskID, setTaskID] = useState('')
    const [projectID, setProjectID] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <EditTaskModal todoID={projectID} taskID={taskID} isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className='flex flex-col gap-5 p-5 container'>
                {
                    data?.title &&
                    <h2 className='container px-10 bg-[var(--colorB)] py-3 shadow-lg rounded-xl'>{data?.title}</h2>
                }
                {
                    data?.tasks?.map((task, index) => {
                        return (
                            <AnimateOnScroll key={task._id} delay={100 * index}>
                                <TodoCard setTaskID={setTaskID} setIsOpen={setIsOpen} setProjectID={setProjectID} index={index} {...task} />
                            </AnimateOnScroll>
                        )
                    })
                }
            </div>
        </>
    )
}
