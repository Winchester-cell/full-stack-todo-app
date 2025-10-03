import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import LoaderDot from '../Loaders/LoaderDot';

export default function ConfrimModal({ isOpen, setIsOpen, onConfirm, message }) {

    const [isloading, setIsLoading] = useState(false)

    const confirmHanlder = async () => {
        if (isloading) {
            return;
        }
        try {
            setIsLoading(true)
            await onConfirm()
            setIsOpen(false)
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={`${isOpen ? 'opacity-100 z-[999999]' : 'opacity-0 -z-[999999]'} transition-all duration-500 flex fixed items-center justify-center w-screen h-screen left-0 top-0 bg-black/50 backdrop-blur-md`}>

            <button onClick={() => setIsOpen(false)} className="text-4xl fixed top-5 end-10"><IoClose className='text-white' /></button>

            <div className={`w-full flex flex-col gap-10 items-center justify-center transition-all duration-500 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>

                <div className='rounded-xl bg-[var(--colorB)] w-[300px] lg:w-[500px] h-fit p-5'>
                    <div className='w-full text-center text-xl font-bold'>{message}</div>
                    <div className='w-full flex gap-5 justify-center items-center mt-5 text-white'>
                        <button disabled={isloading} onClick={() => confirmHanlder()} className='w-[120px] flex items-center justify-center h-10 rounded-full bg-[var(--colorSafe)]'>{isloading ? <LoaderDot size={40} color='white' /> : `Confirm`}</button>
                        <button disabled={isloading} onClick={() => setIsOpen(false)} className='w-[120px] flex items-center justify-center h-10 rounded-full bg-[var(--colorDanger)]'>Cancel</button>
                    </div>
                </div>

            </div>

        </div>
    )
}
