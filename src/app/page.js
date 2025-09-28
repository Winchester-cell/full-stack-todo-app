'use client'
import ProjectListContainer from "@/components/Templates/HomePage/ProjectListContainer";
import Controls from "@/components/Templates/HomePage/Control";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";

export default function Home() {

  const { isLoggedIn } = useAuthStore()

  if (isLoggedIn) {
    return (
      <div className="h-[calc(100dvh-100px)] flex flex-col">
        <Controls />
        <ProjectListContainer />
      </div>
    )
  }

  return (
    <div className="w-full h-[calc(100dvh-100px)] flex items-center justify-center">

      <div className='container w-full h-full p-5'>
        <div className='border-2 border-dashed rounded-2xl text-[var(--colorTextB)] border-[var(--colorTextB)] h-full flex items-center justify-center'>
          <div className='flex flex-col items-center text-xl'>
            <div>You Have To <Link className="text-[var(--colorHover)]" href={'/login'}>Login</Link> First :)</div>
          </div>
        </div>
      </div>

    </div>
  )

}
