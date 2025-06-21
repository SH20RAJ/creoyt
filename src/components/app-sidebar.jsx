"use client";

import * as React from "react";
import {
  BookOpen,
  LineChart,
  Video,
  Settings2,
  Layout,
  Users,
  TrendingUp,
  MessageSquare,
  HelpCircle,
  Send,
  Lightbulb,
  User2,
  MagnetIcon,
  Sparkles,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { title } from "process";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Layout,
      isActive: false,
    },
    {
      title: "Ideas",
      url: "/dashboard/ideas",
      icon: Lightbulb,
      isActive: false,
      items: [
        {
          title: "All Ideas",
          url: "/dashboard/ideas",
          isActive: false,
        },
        {
          title: "New Idea",
          url: "/dashboard/ideas/#new",
          isActive: false,
        },
        {
          title: "Saved Ideas",
          url: "/dashboard/ideas/#saved",
          isActive: false,
        },
      ],
    },
    {
      title: "Projects",
      url: "/dashboard/projects",
      icon: BookOpen,
      isActive: false,
      items: [
        {
          title: "All Projects",
          url: "/dashboard/projects",
          isActive: false,
        },
        {
          title: "New Project",
          url: "/dashboard/projects/new",
          isActive: false,
        },
        {
          title: "Saved Projects",
          url: "/dashboard/projects/1",
          isActive: false,
        },
      ],
    },
    {
      title: "Tools",
      url: "/dashboard/tools",
      icon: TrendingUp,
      isActive: false,
      items: [
        {
          title: "AI Assistant",
          url: "/dashboard/scout/",
          isActive: false,
        },
        {
          title: "Tag Generator",
          url: "/dashboard/tools/tag-generator",
          isActive: false,
        },
        {
          title: "Video Generator",
          url: "/dashboard/scout",
          isActive: false,
        },
        {
          title: "Article Generator",
          url: "/dashboard/scout",
          isActive: false,
        },
        {
          title: "Script Generator",
          url: "/dashboard/scout",
          isActive: false,
        },
        {
          title: "Keyword Research",
          url: "/dashboard/scout",
          isActive: false,
        },
        {
          title: "Marketing Tools",
          url: "/dashboard/scout",
          isActive: false,
        },
        {
          title: "SEO Tools",
          url: "/dashboard/scout",
          isActive: false,
        },
        {
          title: "Optimization",
          url: "/dashboard/scout",
          isActive: false,
        },
      ],
    },
    {
      title: "Scout",
      url: "/dashboard/scout",
      icon: MagnetIcon,
      isActive: false,
    },
    {
      title: "Research",
      url: "/dashboard/research",
      icon: Sparkles,
      isActive: false,
    },
    {
      title: "Optimize",
      url: "/dashboard/optimize",
      icon: Settings2,
      isActive: false,
    },
    {
      title: "Outliner",
      url: "/dashboard/outliner",
      icon: MessageSquare,
      isActive: false,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "/support",
      icon: HelpCircle,
    },
    {
      title: "Feedback",
      url: "/feedback",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Subscription",
      url: "/dashboard/subscription",
      icon: Users,
    },
    {
      name: "Learn",
      url: "/learn",
      icon: BookOpen,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar variant="inset" {...props} className="bg-card border-r border-border">
      <SidebarHeader className="bg-transparent">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg" style={{background: 'linear-gradient(135deg, #7C5CFC 0%, #9C7DFF 100%)'}}>
                  <Sparkles className="size-4 text-white" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Creovate</span>
                  <span className="truncate text-xs text-muted-foreground">Creative Assistant</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
