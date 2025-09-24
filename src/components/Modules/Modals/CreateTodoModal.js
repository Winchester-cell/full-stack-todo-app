import React from 'react'
import { IoClose } from "react-icons/io5";
import TextInput from '../Inputs/TextInput';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/store/useAuthStore';
import postTodo from '@/api/todos/postTodo';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/context/ToastContext';

export default function CreateTodoModal({ isOpen, setIsOpen }) {

    const { register, handleSubmit, reset } = useForm()
    const { user } = useAuthStore()
    const { showToast } = useToast()
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (todo) => postTodo(todo),
        onSuccess: async () => {
            await queryClient.invalidateQueries(['user']);
            showToast('Project created successfully', "success")
            setIsOpen(false);
            reset();
        },
    });

    const submitHandler = (data) => {
        const title = data.title;
        const todo = { userID: user._id, title, tasks: [] };
        mutation.mutate(todo);
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
                        <div className='w-full text-center mt-5'>
                            <button type='submit' className='bg-[var(--colorA)] px-5 py-2 rounded-full border-2 border-[var(--colTextA)]'>Create Project</button>
                        </div>
                    </form>
                </div>

            </div>

        </div>
    )
}
