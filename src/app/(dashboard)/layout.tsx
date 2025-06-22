"use client";

import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { SidebarProvider, useSidebar } from "@/contexts/sidebar-context";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();
  
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <main className={`transition-all duration-300 ${
        isCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <div className="p-4 lg:p-8 pt-16 lg:pt-8">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardContent>
        {children}
      </DashboardContent>
    </SidebarProvider>
  );
}
