import React, { useState } from 'react'
import LogoComponent from '../Logo/Logo'
import { useForm } from 'react-hook-form'
import TextInput from '../Inputs/TextInput'
import SubmitInput from '../Inputs/SubmitInput'
import PasswordInput from '../Inputs/PasswordInput'
import { useToast } from '@/context/ToastContext'
import updatePassword from '@/api/auth/updatePassword'
import { MdModeEdit } from "react-icons/md";

export default function UpdatePasswordForm({ recoveryEmail, setForm }) {

    const { register, handleSubmit } = useForm()
    const { showToast } = useToast()
    const [isLoading, setIsLoading] = useState(false)

    const updatePasswordHandler = async (data) => {
        if (isLoading) return
        setIsLoading(true)
        const updateInfo = await updatePassword(recoveryEmail, data.password, data.code)
        if (updateInfo.isOk) {
            setIsLoading(false)
            setForm('login')
            showToast(updateInfo.result)
        } else {
            setIsLoading(false)
            showToast(updateInfo.result, 'error')
        }
    }

    return (
        <form onSubmit={handleSubmit(updatePasswordHandler)} className='bg-[var(--colorB)] w-[300px] lg:w-[450px]  shadow-lg rounded-xl flex flex-col justify-center items-center gap-7 py-10'>

            <div>
                <LogoComponent size={1.5} />
            </div>

            <TextInput place={'Recovery Code ...'} registerKey={'code'} register={register} />
            <PasswordInput place={'New password ...'} registerKey={'password'} register={register} />

            <div className='text-[14px] lg:text-[1rem]'>
                <SubmitInput isLoading={isLoading} buttonText={'Update Password'} />
            </div>

            <button onClick={() => setForm('recovery')} className='flex items-center gap-2'>
                <MdModeEdit />
                Edit Email
            </button>

        </form>
    )
}
