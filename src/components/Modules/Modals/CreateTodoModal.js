import React from 'react'
import TextInput from '../Inputs/TextInput';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/store/useAuthStore';
import useAddProject from '@/hooks/query-hooks/useAddProject';
import LoaderDot from '../Loaders/LoaderDot';
import useModalSubmitHandler from '@/hooks/useModalSubmitHandler';
import ModalBase from './ModalBase';

export default function CreateTodoModal({ isOpen, setIsOpen }) {

    const { register, handleSubmit, reset } = useForm()
    const { user } = useAuthStore()
    const addProjectMutation = useAddProject()

   // Custom hook to handle common loading, submission, and toast logic
    const { handlerFunction, isLoading } = useModalSubmitHandler(addProjectMutation, reset, setIsOpen)

    const submitHandler = async (data) => {

        const title = data.title;
        const todo = { userID: user._id, title, tasks: [] };

        await handlerFunction(todo)

    }

    return (
        <ModalBase isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className='rounded-xl bg-[var(--colorB)] w-[300px] lg:w-[500px] h-fit py-2'>
                <h2 className='w-full text-center mt-5'>Create New Todo</h2>
                <form onSubmit={handleSubmit(submitHandler)} className='p-5'>
                    <div className='w-full flex justify-center'>
                        <TextInput register={register} registerKey={'title'} place={'Project title ...'} />
                    </div>
                    <div className='w-full flex justify-center mt-5'>
                        <button disabled={isLoading} type='submit' className='bg-[var(--colorA)] w-[150px] h-10 flex items-center justify-center rounded-full border-2 border-[var(--colTextA)]'>{isLoading ? <LoaderDot size={35} color='var(--colorText)' /> : `Create Project`}</button>
                    </div>
                </form>
            </div>
        </ModalBase>
    )
}

