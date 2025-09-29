import TodoMainTemplate from '@/components/Templates/TodoPage/TodoMainTemplate'
import checkUserOnServerSide from '@/utiles/checkUserOnServer'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function TodoPage() {

    const isLoggedIn = await checkUserOnServerSide()
    if (!isLoggedIn) {
        redirect('/login')
    }

    return (
        <>
            <TodoMainTemplate />
        </>
    )

}
