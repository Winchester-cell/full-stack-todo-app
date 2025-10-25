import React from 'react'
import Link from 'next/link'
import { getDate, getTime } from '@/utils/date/getDate'
import { MdDelete } from "react-icons/md";

export default function TodoTitleCard({ title, createdAt, _id , setIsOpen , setID }) {

    const deleteButtonHanlder = () => {
        setIsOpen(true)
        setID(_id)
    }

    return (
        <div className='w-full  bg-[var(--colorB)] shadow-lg rounded-xl flex items-center justify-between px-8 gap-2 py-5'>
            <div>
                <div className='line-clamp-1 text-[14px]  lg:text-[16px] font-semibold w-1/2'>{title}</div>
                <div className='text-[var(--colorTextB)] mt-2 text-[10px] lg:text-[12px]'>{`Created at : ${getDate(createdAt)} - ${getTime(createdAt)}`}</div>
            </div>
            <div className='flex items-center gap-2'>
                <Link className='bg-[var(--colorA)] text-[12px] px-5 lg:text-[14px] py-2 lg:px-6 hoverLink rounded-full' href={`/todos/${_id}`}>View</Link>
                <MdDelete onClick={() => deleteButtonHanlder()} className='cursor-pointer w-5  lg:w-6 h-5  lg:h-6 hoverLink' />
            </div>
        </div>
    )
}
