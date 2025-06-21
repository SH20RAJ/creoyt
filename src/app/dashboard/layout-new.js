import { auth } from '@clerk/nextjs/server';
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";

export const metadata = {
  title: "Dashboard - Creovate",
};

export default async function DashboardLayout({ children }) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Navbar */}
          <DashboardNavbar />
          
          {/* Page Content */}
          <main className="flex-1 p-medium">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
