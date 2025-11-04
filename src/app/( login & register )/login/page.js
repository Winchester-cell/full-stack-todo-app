'use client'
import LoginForm from "@/components/Modules/Forms/LoginForm"
import RecoveryForm from "@/components/Modules/Forms/RecoveryForm"
import UpdatePasswordForm from "@/components/Modules/Forms/UpdatePasswordForm"
import { useState } from "react"

export default function LoginPage() {

  const [form, setForm] = useState('login')
  const [recoveryEmail, setRecoveryEmail] = useState('')

  return (
    <div className='w-full h-[100dvh] flex items-center justify-center'>
      {
        form === 'login' && <LoginForm setForm={setForm} />
      }
      {
        form === 'recovery' && <RecoveryForm setForm={setForm} setRecoveryEmail={setRecoveryEmail} />
      }
      {
        form === 'updatepassword' && <UpdatePasswordForm setForm={setForm} recoveryEmail={recoveryEmail} />
      }
    </div>
  )
}
