import { useAuthStore } from '@/store/useAuthStore';
import React from 'react'
import { FaUserCircle } from "react-icons/fa";


export default function Avatar({ width, height }) {

    const { user } = useAuthStore()

    return (
        <div className='text-4xl'>
            <div style={{ width: width, height: height }} className='rounded-full overflow-hidden'>
                {user.avatar ? <img src={user.avatar} /> : <FaUserCircle style={{ width: width, height: height }} />}
            </div>
        </div>
    )
}
