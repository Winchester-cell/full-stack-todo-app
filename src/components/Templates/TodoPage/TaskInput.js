import { IoCheckmark } from "react-icons/io5";
import { BsFillEraserFill } from "react-icons/bs";
import TextInput from '@/components/Modules/Inputs/TextInput'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { patchTodo } from "@/api/todos/patchTodo";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import EditProjectTitle from "@/components/Modules/ActionButtons/EditProjectTitle";
import { getTodo } from "@/api/todos/getTodo";
import EditTodoTitleModal from "@/components/Modules/Modals/EditTodoTitleModal";
import { getCurrentDateTime } from "@/utils/date/getDate";

export default function TaskInput({ id }) {

    const { data } = useQuery({
        queryKey: ['todo', id],
        queryFn: () => getTodo(id),
    })

    const queryClient = useQueryClient()
    const { register, handleSubmit, reset } = useForm()

    const addTask = async (data) => {
        const dateInfo = getCurrentDateTime()
        const todo = { title: data.title, isDone: false, createDate:dateInfo }
        await patchTodo(id, todo)
        await queryClient.invalidateQueries(['todo'])
        reset()
    }

    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div className='px-5 container'>
                {
                    data?.title &&
                    <div className='container mb-5 flex justify-between items-center text-lg ps-10 bg-[var(--colorB)] font-semibold py-3 shadow-lg rounded-xl'>
                        <h2>{data?.title}</h2>
                        <EditProjectTitle setIsOpen={setIsOpen} top={-6} end={35} />
                    </div>
                }
                <form onSubmit={handleSubmit(addTask)} className='flex items-center gap-3'>
                    <div className='bg-[var(--colorB)] w-fit rounded-full p-1 shadow-lg'>
                        <TextInput innerShadow={true} place={'Write task ...'} register={register} registerKey={'title'} />
                    </div>
                    <button type="submit" className='bg-[var(--colorB)] rounded-full shadow-lg p-4 lg:p-5 text-[16px]'><IoCheckmark /></button>
                    <button onClick={() => reset()} type="button" className='bg-[var(--colorB)] rounded-full shadow-lg p-4 lg:p-5 text-[16px]'><BsFillEraserFill /></button>
                </form>
            </div>
            <EditTodoTitleModal isOpen={isOpen} setIsOpen={setIsOpen} todoID={id} />
        </>
    )
}
