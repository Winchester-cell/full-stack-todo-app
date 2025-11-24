import { useTheme } from 'next-themes'
import React, { useState } from 'react'

export default function EditProjectTitle({ top, end, setIsOpen }) {

    const [visible, setVisible] = useState(false)
    const { theme } = useTheme()

    let visibleClass = visible ? 'visible opacity-100' : 'invisible opacity-0'
    let btnColor = theme === 'dark' ? 'bg-[#00000082]' : 'bg-[#ffffffad]'

    return (
        <>
            <div className='relative'>
                <div onClick={() => setVisible(!visible)} className='flex flex-col gap-1 cursor-pointer'>
                    {
                        Array(3).fill('').map((_, index) => {
                            return <div key={index} className='w-[3px] h-[3px] bg-[var(--colorTextB)] rounded-full' />
                        })
                    }
                </div>
                <button onClick={() => setIsOpen(true)} style={{ top: top, insetInlineEnd: end }} className={`absolute ${visibleClass} ${btnColor} text-[12px] z-50 w-[80px] h-[30px]  rounded-full duration-500 transition-all`}>
                    Edit
                </button>
            </div>
            {
                visible &&
                <div onClick={()=>setVisible(false)} className='w-[100dvw] h-[100dvh] fixed z-40 top-0 start-0' />
            }
        </>
    )
}
