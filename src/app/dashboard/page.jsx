import { EnterTopic } from "@/components/dashboard/EnterTopic";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import ExternalToolList from "@/components/dashboard/ExternalToolList";
import Settings from "@/components/dashboard/Settings";
import ToolList1 from "@/components/dashboard/tools/ToolList1";

export default function DashboardPage() {
  return (
    <main className="flex-1 space-y-8 p-4 md:p-6 lg:p-8">
      {/* Hero Section */}
      <EnterTopic />

      {/* Dashboard Overview */}
      <DashboardOverview />

      {/* Tools Section */}
      <section className="space-y-6">
        <ToolList1 />
        <ExternalToolList />
      </section>

      {/* Settings */}
      <Settings name="Dashboard Settings" />
    </main>
  );
}
