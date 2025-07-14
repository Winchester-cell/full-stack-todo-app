'use client'
import { useAuthStore } from '@/store/useAuthStore'
import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { MdEdit } from "react-icons/md";
import UploadAvatar from './UploadAvatar';
import CropImageModal from '@/components/Modules/Modals/CropModal';
import { useUploadImageStore } from '@/store/useUploadImageStore';

export default function ProfileSettings() {

  const { user } = useAuthStore()
  const { showCropper } = useUploadImageStore()

  return (
    <div className='container px-10 mt-10 flex items-center justify-center h-[80dvh]'>

      {
        showCropper &&
        <CropImageModal />
      }

      {
        user && 
        <div className='w-[500px] bg-[var(--colorB)] p-10 rounded-xl shadow-lg'>

          <div className='w-full text-center mb-10'>
            <span className='bg-[var(--colorA)] rounded-full py-2 px-6'>Your Personal Info</span>
          </div>

          <div className='flex items-center justify-between'>

            <div className='flex items-center gap-5'>
              {
                user.avatar ? (
                  <img src={user.avatar} className='w-24 h-24 rounded-full' />
                ) : (
                  <FaUserCircle className='w-24 h-24' />
                )
              }
              <div>
                <div className='text-3xl'>{user.name}</div>
                <div className='text-[var(--colorTextB)]'>{user.email}</div>
                <div className='mt-3'>
                  <UploadAvatar />
                </div>
              </div>
            </div>

            <button className='w-14 h-14 bg-[var(--colorA)] flex items-center justify-center rounded-full'>
              <MdEdit className='w-7 h-7' />
            </button>

          </div>

        </div>
      }




    </div>
  )
}
