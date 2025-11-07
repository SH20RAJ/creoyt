export const DASHBOARD_NAV_ITEMS = [
  {
    id: "overview",
    label: "Overview",
    href: "/dashboard",
    icon: "LayoutDashboard",
    description: "Dashboard overview and recent activity"
  },
  {
    id: "idea-generation",
    label: "AI Ideas",
    href: "/dashboard/ideas",
    icon: "Lightbulb",
    description: "Generate content ideas with AI"
  },
  {
    id: "research",
    label: "Research",
    href: "/dashboard/research",
    icon: "Search",
    description: "Advanced research and analytics"
  },
  {
    id: "content-studio",
    label: "Content Studio",
    href: "/dashboard/studio",
    icon: "PenTool",
    description: "Create and edit content"
  },
  {
    id: "scout",
    label: "Scout & Discovery",
    href: "/dashboard/scout",
    icon: "Radar",
    description: "Discover trending content"
  },
  {
    id: "projects",
    label: "Projects",
    href: "/dashboard/projects",
    icon: "FolderOpen",
    description: "Manage your projects"
  },
  {
    id: "analytics",
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: "BarChart",
    description: "Performance insights"
  },
  {
    id: "settings",
    label: "Settings",
    href: "/dashboard/settings",
    icon: "Settings",
    description: "Account and app settings"
  }
] as const;

export const USER_MENU_ITEMS = [
  {
    id: "profile",
    label: "Profile",
    href: "/dashboard/profile",
    icon: "User"
  },
  {
    id: "support",
    label: "Support",
    href: "/support",
    icon: "HelpCircle"
  },
  {
    id: "logout",
    label: "Sign Out",
    href: "/auth/signout",
    icon: "LogOut"
  }
] as const;
