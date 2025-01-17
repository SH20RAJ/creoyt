import { auth } from "@/auth";
import { AppSidebar } from "@/components/app-sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard",
};

export default async function Layout({ children }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/join");
    return null;
  }

  return (
    <SidebarProvider className="relative overflow-hidden">
      <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] size-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />
      <div className="absolute bottom-0 right-[-20%] top-[-10%] size-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />

      <AppSidebar />
      <SidebarInset
        variant="inset"
        className="flex flex-col flex-1 relative z-0  "
      >
        <div className="absolute bottom-0 -z-10 left-[30%] right-0 top-[-10%] size-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />
        <div className="absolute bottom-0 -z-10 right-[-20%] top-[40%] size-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />

        <DashboardHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
