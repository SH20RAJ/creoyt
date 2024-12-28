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
  user: {
    name: "CreoYT User",
    email: "creator@creoyt.com",
    avatar: "/avatars/default.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Layout,
    },
   
    {
      title: "Ideas",
      url: "/dashboard/ideas",
      icon: Lightbulb,
      items: [
        {
          title: "All Ideas",
          url: "/dashboard/ideas",
        },
        {
          title: "New Idea",
          url: "/dashboard/ideas/new",
        },
        {
          title: "Saved Ideas",
          url: "/dashboard/ideas/1",
        },
      ],
    },
    {
      title: "Projects",
      url: "/dashboard/projects",
      icon: BookOpen,
      items: [
        {
          title: "All Projects",
          url: "/dashboard/projects",
        },
        {
          title: "New Project",
          url: "/dashboard/projects/new",
        },
        {
          title: "Saved Projects",
          url: "/dashboard/projects/1",
        },
      ],
    },{
      title: "Tools",
      url: "/dashboard/tools",
      icon: TrendingUp,
      // isActive: true,
      items: [
        {
          title: "AI Assistant",
          url: "/dashboard/scout/ai-assistant",
        },
        {
          title: "Article Generator",
          url: "/dashboard/scout/content-tools",
        },
        {
          title: "Script Generator",
          url: "/dashboard/scout/design-tools",
        },
        {
          title: "Keyword Research",
          url: "/dashboard/scout/development-tools",
        },
        {
          title: "Marketing Tools",
          url: "/dashboard/scout/marketing-tools",
        },
        {
          title: "SEO Tools",
          url: "/dashboard/scout/seo-tools",
        },
        {
          title: "Optimization",
          url: "/dashboard/scout/optimization",
        },
      ],
    },
    {
      title: "Scout",
      url: "/dashboard/scout",
      icon: MagnetIcon,
    },
    // add research and optimise
    {
      title: "Research",
      url: "/dashboard/research",
      icon: Sparkles,
    },
    {
      title: "Optimize",
      url: "/dashboard/optimize",
      icon: Settings2,
    },
    
    ,{
      title: "Outliner",
      url: "/dashboard/outliner",
      icon: MessageSquare,
    }
    ,{
      title: "Trends",
      url: "/dashboard/trends",
      icon: LineChart,
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
  projects: [{
    name: "Learn",
    url: "/learn",
    icon: BookOpen,
  }
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar variant="inset" {...props} className=" bg-transparent ">
      <SidebarHeader className="bg-transparent">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-indigo-500 text-white">
                  <Video className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">CreoYT</span>
                  <span className="truncate text-xs">Content Creator</span>
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
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
