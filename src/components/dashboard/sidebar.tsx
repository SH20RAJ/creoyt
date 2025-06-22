"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DASHBOARD_NAV_ITEMS } from "@/constants/dashboard/navigation";
import { useUser, UserButton } from '@stackframe/stack';
import { useSidebar } from "@/contexts/sidebar-context";
import { 
  LayoutDashboard, 
  Lightbulb, 
  Search, 
  PenTool, 
  Radar, 
  FolderOpen, 
  BarChart, 
  Settings,
  Menu,
  X,
  LucideIcon 
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Lightbulb,
  Search,
  PenTool,
  Radar,
  FolderOpen,
  BarChart,
  Settings,
};

export function DashboardSidebar() {
  const { isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen } = useSidebar();
  const pathname = usePathname();
  const user = useUser();

  const toggleCollapsed = () => setIsCollapsed(!isCollapsed);
  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleMobile}
        />
      )}

      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={toggleMobile}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 h-screen bg-background border-r border-border/50 transition-all duration-300 z-50",
        isCollapsed && !isMobileOpen ? "w-16" : "w-64",
        isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            {(!isCollapsed || isMobileOpen) && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">C</span>
                </div>
                <span className="font-bold text-xl">Creovate</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleCollapsed}
              className="hidden lg:flex"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {DASHBOARD_NAV_ITEMS.map((item) => {
              const IconComponent = iconMap[item.icon];
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent",
                    isCollapsed && !isMobileOpen && "justify-center"
                  )}
                  onClick={() => setIsMobileOpen(false)}
                >
                  {IconComponent && <IconComponent className="h-5 w-5 flex-shrink-0" />}
                  {(!isCollapsed || isMobileOpen) && (
                    <span className="truncate">{item.label}</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-border/50">
            <div className={cn(
              "flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-accent cursor-pointer",
              isCollapsed && !isMobileOpen && "justify-center"
            )}>
              {(!isCollapsed || isMobileOpen) ? (
                <div className="flex items-center space-x-3">
                  <UserButton />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {user?.displayName || user?.primaryEmail || 'User'}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">Pro Plan</p>
                  </div>
                </div>
              ) : (
                <UserButton />
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
