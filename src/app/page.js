'use client'
import ProjectListContainer from "@/components/Templates/HomePage/ProjectListContainer";
import TitleAndControl from "@/components/Templates/HomePage/TitleAndControl";
import { useAuthStore } from "@/store/useAuthStore";

export default function Home() {

  const { isLoggedIn } = useAuthStore()

  if (isLoggedIn) {
    return (
      <div>
        <TitleAndControl />
        <ProjectListContainer />
      </div>
    )
  }

  return (
    <div className="w-full h-[calc(100dvh-100px)] flex items-center justify-center px-10">

      <div className="w-[700px] h-[300px] bg-[var(--colorB)] text-2xl shadow-lg rounded-xl flex items-center justify-center p-5 text-center">
        To use website features , you have to login first
      </div>

    </div>
  )

}
