import React, { useState } from 'react'
import LoaderDot from '../Loaders/LoaderDot'
import useUpdateTask from '@/hooks/query-hooks/useUpdateTask'
import { useParams } from 'next/navigation'
import { useTheme } from 'next-themes'
import { IoCheckmark, IoClose } from 'react-icons/io5'

export default function ToggleTodoStatus({ isDone, _id, }) {

    const { id: projectID } = useParams()
    const { theme } = useTheme()
    const updateTaskMutation = useUpdateTask()
    const [isLoading, setIsLoading] = useState(false)

    const doneTodoHandler = async () => {
        if (isLoading) {
            return;
        }
        try {
            setIsLoading(true)
            await updateTaskMutation.mutateAsync({ update: { type: 'status', body: '' }, todoID: projectID, taskID: _id })
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            {
                isLoading && <LoaderDot size={20} color='var(--colorText)' />
            }
            {
                !isLoading &&
                <>
                    {
                        isDone &&
                        <div className={`lg:block hidden text-[12px] text-[var(--colorHover)] ${theme !== 'dark' ? `bg-green-200` : ``} py-1 px-2 rounded-lg`}>Task Completed</div>
                    }
                    {
                        isDone ?
                            (<IoClose onClick={doneTodoHandler} className='lg:w-7 w-5  lg:h-7  h-5 cursor-pointer hoverLink' />)
                            :
                            (<IoCheckmark onClick={doneTodoHandler} className='lg:w-7 w-5  lg:h-7 h-5 cursor-pointer hoverLink' />)
                    }
                </>
            }
        </>
    )
}
