import { useTheme } from 'next-themes'
import React, { useState } from 'react'

export default function EditProjectTitle() {

    const [visible, setVisible] = useState(false)
    const { theme } = useTheme()

    let visibleClass = visible ? 'visible opacity-100' : 'invisible opacity-0'
    let btnColor = theme === 'dark' ? 'bg-[#00000082]' : 'bg-[#ffffffad]'

    return (
        <div className='relative'>
            <div onClick={() => setVisible(!visible)} className='flex flex-col gap-1 cursor-pointer px-5'>
                {
                    Array(3).fill('').map((_, index) => {
                        return <div key={index} className='w-[3px] h-[3px] bg-[var(--colorTextB)] rounded-full' />
                    })
                }
            </div>
            <button className={`absolute ${visibleClass} ${btnColor} text-[12px] top-[-6px] end-[35px] z-50 w-[80px] h-[30px]  rounded-full duration-500 transition-all`}>
                Edit
            </button>
        </div>
    )
}
