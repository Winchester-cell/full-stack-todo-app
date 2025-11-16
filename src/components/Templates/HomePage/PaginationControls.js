import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useTodoStore } from '@/store/useTodoStore'
import React, { useEffect } from 'react'
import useTodos from "@/hooks/query-hooks/useTodos";
import { useQueryClient } from "@tanstack/react-query";

export default function PaginationControls({ totalPages, currentPage, setCurrentPage }) {

    const { setTodos, filterValue } = useTodoStore()
    const { data } = useTodos({ filterValue })
    const queryClient = useQueryClient()

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(1)
        }
        if (data) {
            if (data.todos?.length === 1) {
                queryClient.invalidateQueries(['todos', currentPage, filterValue])
                setTodos(data.todos)
            } else {
                setTodos(data.todos)
            }
        }
    }, [data, currentPage])


    if (!totalPages || totalPages === 1) {
        return null
    }

    return (
        <div className="flex justify-center items-center gap-7 rounded-full bg-[var(--colorB)] py-3 lg:py-4 px-6 text-[12px] lg:text-[14px] lg:px-16 shadow-lg">
            <button onClick={() => currentPage === 1 ? null : setCurrentPage(currentPage - 1)}><IoIosArrowBack /></button>
            <div>Page {currentPage} of {totalPages} </div>
            <button onClick={() => currentPage === totalPages ? null : setCurrentPage(currentPage + 1)}><IoIosArrowForward /></button>
        </div>
    )

}
