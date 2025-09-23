'use client'
import TaskInput from '@/components/Templates/TodoPage/TaskInput'
import TodosContainer from '@/components/Templates/TodoPage/TodosContainer'
import { useParams } from 'next/navigation'
import React from 'react'

export default function TodoPage() {

    const params = useParams()

    return (
        <>
            <TaskInput {...params} />
            <TodosContainer {...params} />
        </>
    )
}
