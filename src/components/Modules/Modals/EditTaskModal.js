import React from 'react'
import { useForm } from 'react-hook-form'
import { IoClose } from 'react-icons/io5'
import TextInput from '../Inputs/TextInput'
import useUpdateTask from '@/hooks/query-hooks/useUpdateTask'
import LoaderDot from '../Loaders/LoaderDot'
import useModalSubmitHandler from '@/hooks/useModalSubmitHandler'
import ModalBase from './ModalBase'

export default function EditTaskModal({ isOpen, setIsOpen, todoID, taskID }) {

    const { register, handleSubmit, reset } = useForm()
    const updateTaskMutation = useUpdateTask()
    const { handlerFunction, isLoading } = useModalSubmitHandler(updateTaskMutation, reset, setIsOpen)

    const submitHandler = async (data) => {

        const editedData = { update: { type: 'rename', body: data.title }, todoID, taskID }

        await handlerFunction(editedData)

    }

    return (
        <ModalBase isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className='rounded-xl bg-[var(--colorB)] w-[300px] lg:w-[500px] h-fit py-2'>
                <h2 className='w-full text-center mt-5'>Edit Task</h2>
                <form onSubmit={handleSubmit(submitHandler)} className='p-5'>
                    <div className='w-full flex justify-center'>
                        <TextInput register={register} registerKey={'title'} place={'Write new title ...'} />
                    </div>
                    <div className='w-full flex justify-center text-center mt-5'>
                        <button disabled={isLoading} type='submit' className='bg-[var(--colorA)] w-[150px] h-10 flex items-center justify-center rounded-full border-2 border-[var(--colTextA)]'>{isLoading ? <LoaderDot size={35} color='var(--colorText)' /> : `Done`}</button>
                    </div>
                </form>
            </div>

        </ModalBase>
    )
}
