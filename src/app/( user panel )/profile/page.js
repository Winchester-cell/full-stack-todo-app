import ProfileSettings from '@/components/Templates/ProfilePage/ProfileSettings'
import checkuserOnServerSide from '@/utiles/checkUserOnServer'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function Profile() {

    const isLoggedIn = await checkuserOnServerSide()
    if (!isLoggedIn) {
        redirect('/login')
    }

    return (
        <>
            <ProfileSettings />
        </>
    )

}
