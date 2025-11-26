'use client'
import { useUploadImageStore } from '@/store/useUploadImageStore'
import React, { useRef } from 'react'

export default function UploadAvatar() {

    const fileInputRef = useRef(null)
    const { setShowCropper, setSelectedFile } = useUploadImageStore()

    const handleChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setSelectedFile(file)
            setShowCropper(true)
        }
    }

    return (
        <div>
            <input className='hidden' id='upload_Avatar' type="file" accept="image/*" ref={fileInputRef} onChange={handleChange} />
            <label htmlFor="upload_Avatar" className='bg-[var(--colorA)] w-[150px] px-5 py-3 rounded-full cursor-pointer text-[12px] block text-center'>
                Upload Avatar
            </label>
        </div>
    )
}
