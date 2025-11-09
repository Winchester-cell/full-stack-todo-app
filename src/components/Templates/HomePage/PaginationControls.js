import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import getTodos from '@/api/todos/getTodos'
import { useTodoStore } from '@/store/useTodoStore'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect } from 'react'

export default function PaginationControls({ totalPages, currentPage, setCurrentPage }) {

    const { data } = useQuery({
        queryKey: ['todos', currentPage],
        queryFn: () => getTodos(currentPage)
    })

    const queryClient = useQueryClient()

    const { setTodos } = useTodoStore()

    useEffect(() => {
        if (data) {
            if(data.todos?.length === 1) {
                queryClient.invalidateQueries(['todos' , currentPage])
                setTodos(data.todos)
            }else{
                setTodos(data.todos)
            }
        }
    }, [data])



    if (!totalPages || totalPages === 1) {
        return null
    }

    return (
        <div className="flex justify-center items-center gap-5 rounded-full bg-[var(--colorB)] py-3 lg:py-5 px-7 text-[12px] lg:text-[1rem] lg:px-20 shadow-lg">
            <button onClick={() => currentPage === 1 ? null : setCurrentPage(currentPage - 1)}><IoIosArrowBack /></button>
            <div>Page {currentPage} of {totalPages} </div>
            <button onClick={() => currentPage === totalPages ? null : setCurrentPage(currentPage + 1)}><IoIosArrowForward /></button>
        </div>
    )

}
