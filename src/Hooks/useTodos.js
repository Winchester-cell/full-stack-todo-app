'use client'

import getTodos from "@/api/todos/getTodos"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

export default function useTodos() {

    const { data, isLoading } = useQuery({
        queryKey: ['Todos'],
        queryFn: getTodos,
    })

    const [todos, setTodos] = useState([])

    useEffect(() => {
        if (Array.isArray(data)) {
            setTodos(data)
        }
    }, [data])

    return { todos, isLoading }

}
