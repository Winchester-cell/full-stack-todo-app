import React from 'react'
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useTheme } from 'next-themes';
import { useParams } from 'next/navigation';
import ToggleTodoStatus from '../ActionButtons/ToggleTodoStatus';

export default function TodoCard({ index, title, isDone, _id, setTaskID, setProjectID, setIsOpen , setIsConfirmOpen }) {

    const { id: projectID } = useParams()
    const { theme } = useTheme()

    const clickHandler = (targetModal) => {
        setTaskID(_id)
        setProjectID(projectID)
        targetModal === 'edit' ? setIsOpen(true) : setIsConfirmOpen(true)
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
                        <ToggleTodoStatus isDone={isDone} _id={_id} />
                        <MdModeEdit onClick={()=>clickHandler('edit')} className='w-5 h-5 lg:w-7 lg:h-7 cursor-pointer hoverLink' />
                        <MdDelete onClick={() => clickHandler('delete')} className='w-5 h-5 lg:w-7 lg:h-7 cursor-pointer hoverLink' />
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
