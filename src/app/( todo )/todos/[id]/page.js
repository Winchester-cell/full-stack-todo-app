'use client'
import { useParams } from 'next/navigation'
import React from 'react'
import TaskInput from '@/components/Templates/TodoPage/TaskInput'
import TodosContainer from '@/components/Templates/TodoPage/TodosContainer'

export default function TodoPage() {

    const params = useParams()

    return (
        <div className="h-[calc(100dvh-100px)] flex flex-col overflow-x-hidden">
            <TaskInput {...params} />
            <TodosContainer {...params} />
        </div>
    )
}
