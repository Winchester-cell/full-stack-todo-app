import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import TextInput from '../Inputs/TextInput';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/store/useAuthStore';
import { useToast } from '@/context/ToastContext';
import useAddProject from '@/Hooks/useAddProject';
import LoaderDot from '../Loaders/LoaderDot';

export default function CreateTodoModal({ isOpen, setIsOpen }) {

    const { register, handleSubmit, reset } = useForm()
    const { user } = useAuthStore()
    const { showToast } = useToast()
    const addProjectMutation = useAddProject()
    const [isLoading, setIsLoading] = useState(false)

    const submitHandler = async (data) => {
        if (isLoading) {
            return;
        }
        try {
            setIsLoading(true)
            const title = data.title;
            const todo = { userID: user._id, title, tasks: [] };
            const res = await addProjectMutation.mutateAsync(todo)
            if (res.isOk) {
                showToast(res.result)
                reset()
                setIsOpen(false)
            } else {
                showToast(res.result, "error")
            }
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={`${isOpen ? 'opacity-100 z-[999999]' : 'opacity-0 -z-[999999]'} transition-all duration-500 flex fixed items-center justify-center w-screen h-screen left-0 top-0 bg-black/50 backdrop-blur-md`}>

            <button onClick={() => setIsOpen(false)} className="text-4xl fixed top-5 end-10"><IoClose className='text-white' /></button>

            <div className={`w-full flex flex-col gap-10 items-center justify-center transition-all duration-500 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>

                <div className='rounded-xl bg-[var(--colorB)] w-[300px] lg:w-[500px] h-fit py-2'>
                    <h2 className='w-full text-center mt-5'>Create new Todo</h2>
                    <form onSubmit={handleSubmit(submitHandler)} className='p-5'>
                        <div className='w-full flex justify-center'>
                            <TextInput register={register} registerKey={'title'} place={'Project title ...'} />
                        </div>
                        <div className='w-full flex justify-center mt-5'>
                            <button disabled={isLoading} type='submit' className='bg-[var(--colorA)] w-[150px] h-10 flex items-center justify-center rounded-full border-2 border-[var(--colTextA)]'>{isLoading ? <LoaderDot size={35} color='var(--colorText)' /> : `Create Project`}</button>
                        </div>
                    </form>
                </div>

            </div>

        </div>
    )
}
