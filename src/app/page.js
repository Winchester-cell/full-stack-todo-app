import ProjectListContainer from "@/components/Templates/HomePage/ProjectListContainer";
import Controls from "@/components/Templates/HomePage/Control";

export default function Home() {

  return (
    <div className="h-[calc(100dvh-100px)] flex flex-col">
      <Controls />
      <ProjectListContainer />
    </div>
  )

}
