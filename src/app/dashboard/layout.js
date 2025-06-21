import { auth } from '@clerk/nextjs/server';
import { AppSidebar } from "@/components/app-sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard - Creovate",
};

export default async function Layout({ children }) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
    return null;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <DashboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
