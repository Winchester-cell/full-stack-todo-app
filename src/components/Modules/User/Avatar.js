import { useAuthStore } from '@/store/useAuthStore';
import React from 'react'
import { FaUserCircle } from "react-icons/fa";


export default function Avatar() {

    const { user } = useAuthStore()

    return (
        <div className='text-4xl'>
            <div className='w-9 h-9 rounded-full overflow-hidden'>
                {user.avatar ? <img src={user.avatar} /> : <FaUserCircle />}
            </div>
        </div>
    )
}
