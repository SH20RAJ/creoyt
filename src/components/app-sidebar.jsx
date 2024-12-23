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
import Link from "next/link";

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
      items: [
        {
          title: "Overview",
          url: "/dashboard",
        },
        {
          title: "Analytics",
          url: "/dashboard/analytics",
        },
        {
          title: "Reports",
          url: "/dashboard/reports",
        },
      ],
    },
    {
      title: "Content",
      url: "/dashboard/content",
      icon: Video,
      isActive: true,
      items: [
        {
          title: "Research",
          url: "/dashboard/research",
        },
        {
          title: "Videos",
          url: "/dashboard/content/videos",
        },
        {
          title: "Thumbnails",
          url: "/dashboard/content/thumbnails",
        },
        {
          title: "Drafts",
          url: "/dashboard/content/drafts",
        },
      ],
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: LineChart,
      items: [
        {
          title: "Performance",
          url: "/dashboard/analytics/performance",
        },
        {
          title: "Audience",
          url: "/dashboard/analytics/audience",
        },
        {
          title: "Engagement",
          url: "/dashboard/analytics/engagement",
        },
        {
          title: "Growth",
          url: "/dashboard/analytics/growth",
        },
      ],
    },
    {
      title: "Growth",
      url: "/dashboard/growth",
      icon: TrendingUp,
      items: [
        {
          title: "AI Assistant",
          url: "/dashboard/growth/ai-assistant",
        },
        {
          title: "SEO Tools",
          url: "/dashboard/growth/seo-tools",
        },
        {
          title: "Optimization",
          url: "/dashboard/growth/optimization",
        },
      ],
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
      name: "Channel Settings",
      url: "/dashboard/settings",
      icon: Settings2,
    },
    {
      name: "Community",
      url: "/dashboard/community",
      icon: Users,
    },
    {
      name: "Comments",
      url: "/dashboard/comments",
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
