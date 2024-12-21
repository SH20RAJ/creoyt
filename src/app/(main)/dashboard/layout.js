import { AppSidebar } from "@/components/app-sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Layout({ children }) {
  return (
    <SidebarProvider className="relative">
      <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] size-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />
      <div className="absolute bottom-0 right-[-20%] top-[-10%] size-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />
      
      <AppSidebar />
      <SidebarInset className=" ">
        <DashboardHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
