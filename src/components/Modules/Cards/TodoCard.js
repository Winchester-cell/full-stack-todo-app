import React, { useState } from 'react'
import { MdDelete, MdModeEdit } from "react-icons/md";
import { IoCheckmark } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useTheme } from 'next-themes';
import { useParams } from 'next/navigation';
import useDeleteTask from '@/Hooks/useDeleteTask';
import useUpdateTask from '@/Hooks/useUpdateTask';

export default function TodoCard({ index, title, isDone, _id, setTaskID, setProjectID, setIsOpen }) {

    const { id: projectID } = useParams()
    const { theme } = useTheme()
    const deleteMutation = useDeleteTask()
    const updateTaskMutation = useUpdateTask()

    const editHandler = () => {
        setTaskID(_id)
        setProjectID(projectID)
        setIsOpen(true)
    }

    return (
        <>
            <div className='flex bg-[var(--colorB)] w-full h-fit py-5 rounded-xl shadow-lg px-5 lg:px-10 justify-between'>
                <div className='flex items-center gap-5 lg:gap-10 text-[14px] lg:text-[16px]'>
                    <div>{index + 1}</div>
                    <div className='w-[120px] md:w-[450px] lg:w-[500px] xl:w-[700px] overflow-hidden'>
                        <div>{title}</div>
                        <div className='text-[var(--colorTextB)] text-[10px] lg:text-[12px] mt-1'>2025/01/07 - 18:00</div>
                    </div>
                </div>
                <div className='flex items-center justify-center flex-col gap-3'>
                    <div className='flex items-center gap-5 lg:gap-10'>
                        {
                            isDone &&
                            <div className={`lg:block hidden text-[var(--colorHover)] ${theme !== 'dark' ? `bg-green-200` : ``} py-1 px-2 rounded-lg`}>Task Completed</div>
                        }
                        {
                            isDone ?
                                (<IoClose onClick={() => updateTaskMutation.mutate({ update: { type: 'status', body: '' }, todoID: projectID, taskID: _id })} className='lg:w-7 w-5  lg:h-7  h-5 cursor-pointer hoverLink' />)
                                :
                                (<IoCheckmark onClick={() => updateTaskMutation.mutate({ update: { type: 'status', body: '' }, todoID: projectID, taskID: _id })} className='lg:w-7 w-5  lg:h-7 h-5 cursor-pointer hoverLink' />)
                        }

                        <MdModeEdit onClick={editHandler} className='w-5 h-5 lg:w-7 lg:h-7 cursor-pointer hoverLink' />
                        <MdDelete onClick={() => deleteMutation.mutate({ projectID, taskID: _id })} className='w-5 h-5 lg:w-7 lg:h-7 cursor-pointer hoverLink' />
                    </div>
                    {
                        isDone &&
                        <div className={`lg:hidden text-[var(--colorHover)] ${theme !== 'dark' ? `bg-green-200` : ``} py-1 px-2 rounded-lg text-[10px]`}>Task Completed</div>
                    }
                </div>
            </div>
        </>
    )

}
