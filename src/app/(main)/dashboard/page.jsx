import { EnterTopic } from "@/components/dashboard/EnterTopic";
import Settings from "@/components/dashboard/Settings";
import ToolList1 from "@/components/dashboard/tools/ToolList1";

export default function page() {
  return (
    <div className="relative">
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <EnterTopic />
        <ToolList1/>
        <div className="flex flex-1 flex-col w-full gap-4">

        <Settings name="Add/Change Channel URL"/>
        </div>
      </div>
    </div>
  );
}
