import { getTodo } from '@/api/todos/getTodo'
import AnimateOnScroll from '@/components/AnimateOnScrollWrapper/AnimateOnScroll'
import EditProjectTitle from '@/components/Modules/ActionButtons/EditProjectTitle'
import TodoCard from '@/components/Modules/Cards/TodoCard'
import ConfrimModal from '@/components/Modules/Modals/ConfrimModal'
import EditTaskModal from '@/components/Modules/Modals/EditTaskModal'
import useDeleteTask from '@/hooks/query-hooks/useDeleteTask'
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
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const deleteMutation = useDeleteTask()

    const onConfirm = async () => {
        await deleteMutation.mutateAsync({ projectID, taskID })
    }

    return (
        <>
            <ConfrimModal isOpen={isConfirmOpen} onConfirm={onConfirm} setIsOpen={setIsConfirmOpen} message={`Delete Task ?`} />
            <EditTaskModal todoID={projectID} taskID={taskID} isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className='flex flex-col gap-5 p-5 container'>
                {
                    data?.tasks?.map((task, index) => {
                        return (
                            <AnimateOnScroll key={task._id} delay={100 * index}>
                                <TodoCard setTaskID={setTaskID} setIsOpen={setIsOpen} setIsConfirmOpen={setIsConfirmOpen} setProjectID={setProjectID} index={index} {...task} />
                            </AnimateOnScroll>
                        )
                    })
                }
            </div>
        </>
    )
}
