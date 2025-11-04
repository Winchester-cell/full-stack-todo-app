'use client'
import AnimateOnScroll from '@/components/AnimateOnScrollWrapper/AnimateOnScroll';
import TodoTitleCard from '@/components/Modules/Cards/TodoTitleCard'
import ConfrimModal from '@/components/Modules/Modals/ConfrimModal';
import { useToast } from '@/context/ToastContext';
import useDeleteProject from '@/Hooks/useDeleteProject';
import { useTodoStore } from '@/store/useTodoStore';
import React, { useState } from 'react'
import { IoFolder } from "react-icons/io5";


export default function ProjectListContainer() {

    const { todos , setTodos , isSearching, setIsSearching } = useTodoStore()
    const [id, setID] = useState()
    const [isOpen, setIsOpen] = useState(false)
    const deleteProjectMutation = useDeleteProject()
    const { showToast } = useToast()

    const deleteProject = async () => {
        const res = await deleteProjectMutation.mutateAsync(id);

        if (res.isOk) {
            showToast(res.result);
            if (todos.length === 1) { 
                setIsSearching(false);
                setTodos([]);
            }
        } else {
            showToast(res.result, "error");
        }
    };



    if (todos?.length === 0 && !isSearching) {
        return (
            <div className='container flex-grow p-5'>
                <div className='border-2 border-dashed rounded-2xl text-[var(--colorTextB)] border-[var(--colorTextB)] h-full flex items-center justify-center'>
                    <div className='flex flex-col items-center'>
                        <IoFolder className='w-16 h-16' />
                        <div>No project created yet !</div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <ConfrimModal onConfirm={deleteProject} isOpen={isOpen} setIsOpen={setIsOpen} message={`Delete project ?`} />
            <div className='container px-5 py-5'>
                <div className='grid grid-cols-1 xl:grid-cols-3 gap-5'>
                    {
                        todos?.map((todo, index) => {
                            return (
                                <AnimateOnScroll key={todo._id} delay={100 * index}>
                                    <TodoTitleCard setID={setID} setIsOpen={setIsOpen} {...todo} />
                                </AnimateOnScroll>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}
