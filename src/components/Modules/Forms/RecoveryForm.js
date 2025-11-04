import React from 'react'
import LogoComponent from '../Logo/Logo'
import { useForm } from 'react-hook-form'
import TextInput from '../Inputs/TextInput'
import SubmitInput from '../Inputs/SubmitInput'
import sendRecoveryCode from '@/api/auth/sendRecoveryCode'
import { useToast } from '@/context/ToastContext'
import { IoIosArrowBack } from "react-icons/io";


export default function RecoveryForm({ setForm, setRecoveryEmail }) {

    const { register, handleSubmit } = useForm()
    const { showToast } = useToast()

    const recoveryHandler = async (data) => {
        const sendInfo = await sendRecoveryCode(data.email)
        if (sendInfo.isOk) {
            setForm('updatepassword')
            setRecoveryEmail(data.email)
            showToast(sendInfo.result)
        } else {
            showToast(sendInfo.result, 'error')
        }
    }

    return (
        <form onSubmit={handleSubmit(recoveryHandler)} className='bg-[var(--colorB)] w-[300px] lg:w-[450px]  shadow-lg rounded-xl flex flex-col justify-center items-center gap-10 py-10'>

            <div>
                <LogoComponent size={1.5} />
            </div>

            <TextInput place={'Email ...'} registerKey={'email'} register={register} />

            <div className='text-[14px] lg:text-[1rem]'>
                <SubmitInput buttonText={'Recover Password'} />
            </div>

            <button onClick={()=>setForm('login')} className='flex items-center gap-2'>
                <IoIosArrowBack />
                Back
            </button>

        </form>
    )
}
