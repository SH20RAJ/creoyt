import { Suspense } from "react";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { ProgressStats } from "@/components/dashboard/ProgressStats";
import { LoadingCard } from "@/components/ui/loading";

export default function DashboardPage() {
  return (
    <div className="space-y-large">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-heading font-bold text-text-primary">
          Good Morning! 👋
        </h1>
        <p className="text-body text-text-secondary">
          Continue working to achieve your target
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-large">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-large">
          <Suspense fallback={<LoadingCard />}>
            <DashboardOverview />
          </Suspense>
          
          <Suspense fallback={<LoadingCard />}>
            <QuickActions />
          </Suspense>
          
          <Suspense fallback={<LoadingCard />}>
            <RecentActivity />
          </Suspense>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-large">
          <Suspense fallback={<LoadingCard />}>
            <ProgressStats />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
