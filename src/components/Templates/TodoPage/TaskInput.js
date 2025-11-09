import { IoCheckmark } from "react-icons/io5";
import { BsFillEraserFill } from "react-icons/bs";
import TextInput from '@/components/Modules/Inputs/TextInput'
import React from 'react'
import { useForm } from 'react-hook-form'
import { patchTodo } from "@/api/todos/patchTodo";
import { useQueryClient } from "@tanstack/react-query";

export default function TaskInput({ id }) {

    const queryClient = useQueryClient()
    const { register, handleSubmit, reset } = useForm()
    
    const addTask = async (data) => {
        const todo = { title: data.title, isDone: false }
        await patchTodo(id, todo)
        await queryClient.invalidateQueries(['todo'])
        reset()
    }

    return (
        <div className='px-5 container'>
            <form onSubmit={handleSubmit(addTask)} className='flex items-center gap-3'>
                <div className='bg-[var(--colorB)] w-fit rounded-full p-1 shadow-lg'>
                    <TextInput innerShadow={true} place={'Write task ...'} register={register} registerKey={'title'} />
                </div>
                <button type="submit" className='bg-[var(--colorB)] rounded-full shadow-lg p-4 lg:p-5 text-[16px] lg:text-xl'><IoCheckmark /></button>
                <button onClick={()=>reset()} type="button" className='bg-[var(--colorB)] rounded-full shadow-lg p-4 lg:p-5 text-[16px] lg:text-xl'><BsFillEraserFill /></button>
            </form>
        </div>
    )
}
