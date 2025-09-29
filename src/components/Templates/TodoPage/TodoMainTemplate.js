'use client'
import { useParams } from 'next/navigation'
import React from 'react'
import TaskInput from './TaskInput'
import TodosContainer from './TodosContainer'

export default function TodoMainTemplate() {

    const params = useParams()

    return (
        <>
            <TaskInput {...params} />
            <TodosContainer {...params} />
        </>
    )
}
