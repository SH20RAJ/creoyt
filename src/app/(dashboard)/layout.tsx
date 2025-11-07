"use client";

import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { SidebarProvider } from "@/contexts/sidebar-context";
import { YouTubeProvider } from "@/contexts/youtube-context";
import { useSidebar } from "@/contexts/sidebar-context";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();
  
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <div className={`transition-all duration-300 ${
        isCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <DashboardHeader />
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
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
      <YouTubeProvider>
        <DashboardContent>
          {children}
        </DashboardContent>
      </YouTubeProvider>
    </SidebarProvider>
  );
}
