import React, { useState } from 'react'
import LoaderDot from '../Loaders/LoaderDot';
import ModalBase from './ModalBase';

export default function ConfirmModal({ isOpen, setIsOpen, onConfirm, message }) {

    // confirm click loading state
    const [isLoading, setIsLoading] = useState(false)
    // confirm onclick handler
    const confirmHandler = async () => {
        // to avoid extra clicks
        if (isLoading) {
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
        <ModalBase isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className='rounded-xl bg-[var(--colorB)] w-[300px] lg:w-[500px] h-fit p-5'>
                <div className='w-full text-center text-xl font-bold'>{message}</div>
                <div className='w-full flex gap-5 justify-center items-center mt-5 text-white'>
                    <button disabled={isLoading} onClick={() => confirmHandler()} className='w-[120px] flex items-center justify-center h-10 rounded-full bg-[var(--colorSafe)]'>{isLoading ? <LoaderDot size={40} color='white' /> : `Confirm`}</button>
                    <button disabled={isLoading} onClick={() => setIsOpen(false)} className='w-[120px] flex items-center justify-center h-10 rounded-full bg-[var(--colorDanger)]'>Cancel</button>
                </div>
            </div>
        </ModalBase>
    )
}
