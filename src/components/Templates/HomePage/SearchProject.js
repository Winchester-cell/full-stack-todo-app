import { useAuthStore } from '@/store/useAuthStore'
import { useTodoStore } from '@/store/useTodoStore'
import React from 'react'
import { FaSearch } from 'react-icons/fa'

export default function SearchProject() {

    const { user } = useAuthStore()
    const { setTodos, setIsSearching } = useTodoStore()

    const filterHandler = (e) => {

        if (!user || user.todos.length === 0) return;

        const value = e.target.value.toLowerCase();

        if (value === "") {
            setIsSearching(false);
            setTodos(user.todos);
            return;
        }

        setIsSearching(true);

        const filteredList = user.todos.filter(todo =>
            todo.title.toLowerCase().includes(value)
        );

        setTodos(filteredList);
    };


    return (
        <div className='bg-[var(--colorB)] w-[calc(100%-155px)] lg:w-[350px] rounded-full p-1 shadow-lg'>
            <div className='rounded-full shadow-inner flex gap-2 items-center justify-center bg-[var(--colorA)] py-2 lg:py-4 ps-4 lg:ps-7 pe-5'>
                <FaSearch className='text-[var(--colorTextB)]' />
                <input onChange={filterHandler} placeholder={'Search ...'} type="text" className='block w-full text-[12px] lg:text-[1rem] placeholder:text-[12px] lg:placeholder:text-[1rem]' />
            </div>
        </div>
    )
}
