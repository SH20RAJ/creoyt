import { EnterTopic } from "@/components/dashboard/EnterTopic";
import ToolList1 from "@/components/dashboard/tools/ToolList1";

export default function page() {
  return (
    <div className="relative">
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <EnterTopic />
        <ToolList1/>
      </div>
    </div>
  );
}
