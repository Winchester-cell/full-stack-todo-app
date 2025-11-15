import useTodos from '@/hooks/query-hooks/useTodos'
import { useProjectsPaginationStore } from '@/store/useProjectsPaginationStore'
import { useTodoStore } from '@/store/useTodoStore'
import React, { useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'

export default function SearchProject() {

    const { setTodos, setIsSearching, isSearching, filterValue, setFilterValue } = useTodoStore()
    const { setCurrentPage } = useProjectsPaginationStore()
    const { data } = useTodos({ filterValue })

    useEffect(() => {
        if (data && isSearching) {
            setTodos(data?.todos)
        }
    }, [data])

    const onChangeHanlder = (e) => {
        setFilterValue(e.target.value)
        if (e.target.value.trim()) {
            setCurrentPage(1)
            setIsSearching(true)
        } else {
            setIsSearching(false)
        }
    }

    return (
        <div className='bg-[var(--colorB)] w-[calc(100%-155px)] lg:w-[350px] rounded-full p-1 shadow-lg'>
            <div className='rounded-full shadow-inner flex gap-2 items-center justify-center bg-[var(--colorA)] py-2 lg:py-4 ps-4 lg:ps-7 pe-5'>
                <FaSearch className='text-[var(--colorTextB)]' />
                <input onChange={onChangeHanlder} placeholder={'Search ...'} type="text" className='block w-full text-[12px] lg:text-[1rem] placeholder:text-[12px] lg:placeholder:text-[1rem]' />
            </div>
        </div>
    )
}
