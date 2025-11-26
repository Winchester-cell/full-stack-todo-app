import React from 'react'
import Link from 'next/link'
import { MdDelete, MdModeEdit } from "react-icons/md";
import EditProjectTitle from '../ActionButtons/EditProjectTitle';

export default function TodoTitleCard({ title, createDate, _id, setIsOpen, setID, setIsEditOpen }) {

    const deleteButtonHandler = () => {
        // open confirm modal and set the target project id
        setIsOpen(true)
        setID(_id)
    }

    return (
        <div className='w-full  bg-[var(--colorB)] shadow-lg rounded-xl flex items-center justify-between ps-8 gap-2 py-5'>
            {/* project info */}
            <div className='flex-grow'>
                <div className='line-clamp-1 text-[14px] font-semibold w-1/2'>{title}</div>
                <div className='text-[var(--colorTextB)] mt-1 text-[10px]'>{`Created at : ${createDate.date} - ${createDate.time}`}</div>
            </div>
            {/* actions */}
            <div className='flex items-center gap-3 pe-5'>
                <Link className='bg-[var(--colorA)] text-[12px] px-5 py-2 lg:px-6 hoverLink rounded-full' href={`/todos/${_id}`}>View</Link>
                <MdModeEdit className='cursor-pointer w-4  lg:w-5 h-4  lg:h-5 hoverLink' onClick={() => {
                    setID(_id)
                    setIsEditOpen(true)
                }} />
                <MdDelete onClick={() => deleteButtonHandler()} className='cursor-pointer w-5  lg:w-6 h-5  lg:h-6 hoverLink' />

            </div>
        </div>
    )
}
