import React from 'react'
import TextInput from '../Inputs/TextInput';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/store/useAuthStore';
import useAddProject from '@/hooks/query-hooks/useAddProject';
import LoaderDot from '../Loaders/LoaderDot';
import useModalSubmitHandler from '@/hooks/useModalSubmitHandler';
import ModalBase from './ModalBase';
import useProjectTitleEdit from '@/hooks/query-hooks/useProjectTitleEdit';

export default function EditTodoTitleModal({ isOpen, setIsOpen, todoID }) {

    const { register, handleSubmit, reset } = useForm()
    const editProjectMutation = useProjectTitleEdit()

    // Custom hook to handle common loading, submission, and toast logic
    const { handlerFunction, isLoading } = useModalSubmitHandler(editProjectMutation, reset, setIsOpen)

    const submitHandler = async (data) => {

        const newTitle = data.newTitle;
        const updated = { todoID, newTitle };
        await handlerFunction(updated)

    }

    return (
        <ModalBase isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className='rounded-xl bg-[var(--colorB)] w-[300px] lg:w-[500px] h-fit py-2'>
                <h2 className='w-full text-center mt-5'>Edit Project</h2>
                <form onSubmit={handleSubmit(submitHandler)} className='p-5'>
                    <div className='w-full flex justify-center'>
                        <TextInput register={register} registerKey={'newTitle'} place={'New project title ...'} />
                    </div>
                    <div className='w-full flex justify-center mt-5'>
                        <button disabled={isLoading} type='submit' className='bg-[var(--colorA)] w-[150px] h-10 flex items-center justify-center rounded-full border-2 border-[var(--colTextA)]'>{isLoading ? <LoaderDot size={35} color='var(--colorText)' /> : `Edit Project`}</button>
                    </div>
                </form>
            </div>
        </ModalBase>
    )
}

