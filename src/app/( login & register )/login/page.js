'use client'
import getUser from '@/api/auth/getuser';
import loginUser from '@/api/auth/login';
import PasswordInput from '@/components/Modules/Inputs/PasswordInput';
import SubmitInput from '@/components/Modules/Inputs/SubmitInput';
import TextInput from '@/components/Modules/Inputs/TextInput';
import LogoComponent from '@/components/Modules/Logo/Logo'
import { useToast } from '@/context/ToastContext';
import { useAuthStore } from '@/store/useAuthStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';


export default function LoginPage() {

  const { register, handleSubmit } = useForm()
  const { showToast } = useToast()
  const router = useRouter()
  const { setUser, setIsLoggedIn } = useAuthStore()
  const [isLoading , setIsLoading] = useState(false)

  const loginHandler = async (data) => {
    if(isLoading) return;
    setIsLoading(true)
    const loginResult = await loginUser(data)
    if (loginResult.isOk) {
      const user = await getUser()
      setUser(user)
      setIsLoggedIn(true)
      showToast(loginResult.result, "success")
      setIsLoading(false)
      router.push('/')
    }
    else {
      showToast(loginResult.result, "error")
      setIsLoading(false)
    }

  }

  return (
    <div className='w-full h-[100dvh] flex items-center justify-center'>

      <form onSubmit={handleSubmit(loginHandler)} className='bg-[var(--colorB)] w-[300px] lg:w-[450px] lg:h-[600px] shadow-lg rounded-xl flex flex-col justify-center items-center gap-10 py-10'>

        <LogoComponent size={1.5} />

        <TextInput place={'Email ...'} registerKey={'email'} register={register} />

        <PasswordInput place={'Password'} registerKey={'password'} register={register} />

        <SubmitInput isLoading={isLoading} buttonText={'Login'} />

        <ul className='text-sm w-full pl-16 flex flex-col gap-3 mt-3 list-disc'>
          <li className='hoverLink'>
            <Link href={'#'}>Forgot my password</Link>
          </li>
          <li>
            Not a member ? <Link href={'/register'} className='text-[var(--colorHover)]'>Register</Link>
          </li>
        </ul>

      </form>

    </div>
  )
}
