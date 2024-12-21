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

const data = {
  user: {
    name: "CreoYT User",
    email: "creator@creoyt.com",
    avatar: "/avatars/default.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: Layout,
      items: [
        {
          title: "Overview",
          url: "#",
        },
        {
          title: "Analytics",
          url: "#",
        },
        {
          title: "Reports",
          url: "#",
        },
      ],
    },
    {
      title: "Content",
      url: "#",
      icon: Video,
      isActive: true,
      items: [
        {
          title: "Research",
          url: "#",
        },
        {
          title: "Videos",
          url: "#",
        },
        {
          title: "Thumbnails",
          url: "#",
        },
        {
          title: "Drafts",
          url: "#",
        },
      ],
    },
    {
      title: "Analytics",
      url: "#",
      icon: LineChart,
      items: [
        {
          title: "Performance",
          url: "#",
        },
        {
          title: "Audience",
          url: "#",
        },
        {
          title: "Engagement",
          url: "#",
        },
        {
          title: "Growth",
          url: "#",
        },
      ],
    },
    {
      title: "Growth",
      url: "#",
      icon: TrendingUp,
      items: [
        {
          title: "AI Assistant",
          url: "#",
        },
        {
          title: "SEO Tools",
          url: "#",
        },
        {
          title: "Optimization",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: HelpCircle,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Channel Settings",
      url: "#",
      icon: Settings2,
    },
    {
      name: "Community",
      url: "#",
      icon: Users,
    },
    {
      name: "Comments",
      url: "#",
      icon: MessageSquare,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar variant="inset" {...props} className=" bg-transparent ">
      <SidebarHeader className="bg-transparent">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-indigo-500 text-white">
                  <Video className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">CreoYT</span>
                  <span className="truncate text-xs">Content Creator</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
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
