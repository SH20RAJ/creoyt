import { EnterTopic } from "@/components/dashboard/EnterTopic";
import ExternalToolList from "@/components/dashboard/ExternalToolList";
import Settings from "@/components/dashboard/Settings";
import ToolList1 from "@/components/dashboard/tools/ToolList1";
import IdeasPage from "./ideas/page";
import ChatBot from "./scout/page";
import ProjectsPage from "./projects/page";

export default function page() {
  return (
    <div className="relative m-0">
      <div className="flex flex-1 flex-col gap-4  ">
        <EnterTopic />
        <ToolList1 />
        <Settings name="Channel Settings" />
        <IdeasPage />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ProjectsPage />
          <ChatBot />
        </div>
        <div className="flex flex-1 flex-col w-full gap-4">
          <ExternalToolList />
        </div>
      </div>
    </div>
  );
}
