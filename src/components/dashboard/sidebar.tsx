"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggleSimple } from "@/components/ui/theme-toggle";
import { DASHBOARD_NAV_ITEMS } from "@/constants/dashboard/navigation";
import { useUser } from '@stackframe/stack';
import { useSidebar } from "@/contexts/sidebar-context";
import { useYouTube } from "@/contexts/youtube-context";
import { 
  LayoutDashboard, 
  Lightbulb, 
  Search, 
  PenTool, 
  Radar, 
  FolderOpen, 
  BarChart, 
  Settings,
  Grid2x2,
  Menu,
  X,
  LucideIcon,
  User,
  LogOut,
  ChevronUp,
  Video,
  Youtube,
  ChevronDown,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ChannelSwitcher } from "@/components/youtube/channel-switcher";

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Video,
  Lightbulb,
  Search,
  PenTool,
  Radar,
  FolderOpen,
  BarChart,
  Settings,
  Grid2x2,
};

export function DashboardSidebar() {
  const { isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen } = useSidebar();
  const pathname = usePathname();
  const user = useUser();
  const { channels, selectedChannel, setSelectedChannel, loading: loadingChannels } = useYouTube();

  const toggleCollapsed = () => setIsCollapsed(!isCollapsed);
  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  const handleChannelConnect = () => {
    window.location.href = '/api/auth/youtube';
  };

  const handleChannelSelect = (channel: any) => {
    setSelectedChannel(channel);
  };

  const handleSignOut = async () => {
    try {
      // Use Stack's sign out functionality
      window.location.href = '/api/auth/signout';
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

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
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">YT</span>
                </div>
                <span className="font-bold text-xl">YT Copilot</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <ThemeToggleSimple />
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleCollapsed}
                className="hidden lg:flex"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
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

          {/* Channel Switcher - Only show if not collapsed or on mobile */}
          {(!isCollapsed || isMobileOpen) && (
            <div className="px-4 pb-2 border-t border-border/50">
              <div className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    YouTube Channel
                  </span>
                </div>
                
                {loadingChannels ? (
                  <div className="flex items-center space-x-2 px-3 py-2">
                    <div className="w-6 h-6 bg-muted rounded-full animate-pulse" />
                    <div className="h-4 bg-muted rounded flex-1 animate-pulse" />
                  </div>
                ) : channels.length === 0 ? (
                  <Button
                    variant="outline"
                    className="w-full justify-start h-auto p-3"
                    onClick={handleChannelConnect}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    <span>Connect YouTube</span>
                  </Button>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between h-auto p-3"
                      >
                        <div className="flex items-center space-x-2 min-w-0">
                          <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Youtube className="w-3 h-3 text-red-600" />
                          </div>
                          <div className="min-w-0 flex-1 text-left">
                            <p className="text-sm font-medium truncate">
                              {selectedChannel?.channelName || 'Select Channel'}
                            </p>
                            {selectedChannel?.subscriberCount && (
                              <p className="text-xs text-muted-foreground">
                                {selectedChannel.subscriberCount.toLocaleString()} subscribers
                              </p>
                            )}
                          </div>
                        </div>
                        <ChevronDown className="w-4 h-4 flex-shrink-0" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-64">
                      <DropdownMenuLabel>Select Channel</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {channels.map((channel) => (
                        <DropdownMenuItem
                          key={channel.id}
                          onClick={() => handleChannelSelect(channel)}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                            <Youtube className="w-4 h-4 text-red-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {channel.channelName}
                            </p>
                            {channel.subscriberCount && (
                              <p className="text-xs text-muted-foreground">
                                {channel.subscriberCount.toLocaleString()} subscribers
                              </p>
                            )}
                          </div>
                          {selectedChannel?.id === channel.id && (
                            <Badge variant="secondary" className="text-xs">Active</Badge>
                          )}
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleChannelConnect} className="cursor-pointer">
                        <Plus className="w-4 h-4 mr-2" />
                        Connect Another Channel
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          )}

          {/* User section at bottom */}
          <div className="p-4 border-t border-border/50 space-y-2">
            {/* Profile/Logout Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full flex items-center justify-between p-2 h-auto hover:bg-accent",
                    isCollapsed && !isMobileOpen && "justify-center px-2"
                  )}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.profileImageUrl || ""} />
                      <AvatarFallback className="text-xs">
                        {user?.displayName?.charAt(0) || user?.primaryEmail?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    {(!isCollapsed || isMobileOpen) && (
                      <div className="flex-1 min-w-0 text-left">
                        <p className="text-sm font-medium truncate">
                          {user?.displayName || user?.primaryEmail || 'User'}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">Pro Plan</p>
                      </div>
                    )}
                  </div>
                  {(!isCollapsed || isMobileOpen) && (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56" side="top">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile" className="flex items-center cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings" className="flex items-center cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-red-600 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Quick logout button when collapsed */}
            {isCollapsed && !isMobileOpen && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="w-full p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
