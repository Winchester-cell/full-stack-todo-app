import React from 'react'
import { useForm } from 'react-hook-form'
import TextInput from '../Inputs/TextInput'
import LoaderDot from '../Loaders/LoaderDot'
import useModalSubmitHandler from '@/hooks/useModalSubmitHandler'
import useUpdateUserName from '@/hooks/query-hooks/useUpdateUserName'
import ModalBase from './ModalBase'

export default function EditUserNameModal({ isOpen, setIsOpen }) {

    const { register, handleSubmit, reset } = useForm()
    const updateNameMutation = useUpdateUserName()
    const { handlerFunction, isLoading } = useModalSubmitHandler(updateNameMutation, reset, setIsOpen)

    const submitHandler = async (data) => {
        await handlerFunction(data.newName)
    }

    return (
        <ModalBase isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className='rounded-xl bg-[var(--colorB)] w-[300px] lg:w-[500px] h-fit py-2'>
                <h2 className='w-full text-center mt-5'>Edit Name</h2>
                <form onSubmit={handleSubmit(submitHandler)} className='p-5'>
                    <div className='w-full flex justify-center'>
                        <TextInput register={register} registerKey={'newName'} place={'New name ...'} />
                    </div>
                    <div className='w-full flex justify-center text-center mt-5'>
                        <button disabled={isLoading} type='submit' className='bg-[var(--colorA)] w-[150px] h-10 flex items-center justify-center rounded-full border-2 border-[var(--colTextA)]'>{isLoading ? <LoaderDot size={35} color='var(--colorText)' /> : `Save`}</button>
                    </div>
                </form>
            </div>
        </ModalBase>
    )
}

