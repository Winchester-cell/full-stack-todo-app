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
    <div className='container px-10 mt-10 flex items-center justify-center h-[calc(100dvh-100px)]'>

      {
        showCropper &&
        <CropImageModal />
      }

      {
        user &&
        <div className='w-[500px] bg-[var(--colorB)] p-10 rounded-xl shadow-lg'>

          <div className='w-full text-center mb-7'>
            <span className='bg-[var(--colorA)] rounded-full py-2 px-6'>Your Personal Info</span>
          </div>

          <div className='flex flex-col gap-10 items-center'>

            <div className='flex md:flex-row flex-col items-center gap-5 '>
              {
                user.avatar ? (
                  <img src={user.avatar} className='w-36 h-36 rounded-full' />
                ) : (
                  <FaUserCircle className='w-36 h-36' />
                )
              }
              <div className='flex flex-col items-center md:items-start text-[12px] md:text-[16px]'>
                <div className='md:text-3xl text-[14px] line-clamp-1'>{user.name}</div>
                <div className='text-[var(--colorTextB)] break-words line-clamp-1 text-center md:text-start w-[300px] md:w-full'>{user.email}</div>
                <div className='mt-5 lg:mt-3'>
                  <UploadAvatar />
                </div>
                <button className='bg-[var(--colorA)] mt-3 px-5 py-2 rounded-full cursor-pointer text-[12px] block'>Edit Name</button>
                <button className='bg-[var(--colorA)] mt-3 px-5 py-2 rounded-full cursor-pointer text-[12px] block'>Remove Avatar</button>
              </div>
            </div>

          </div>

        </div>
      }




    </div>
  )
}
