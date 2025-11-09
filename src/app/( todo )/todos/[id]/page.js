'use client'
import { useParams } from 'next/navigation'
import React from 'react'
import TaskInput from '@/components/Templates/TodoPage/TaskInput'
import TodosContainer from '@/components/Templates/TodoPage/TodosContainer'

export default function TodoPage() {

    const params = useParams()

    return (
        <>
            <TaskInput {...params} />
            <TodosContainer {...params} />
        </>
    )
}
