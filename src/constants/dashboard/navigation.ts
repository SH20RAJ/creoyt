export const DASHBOARD_NAV_ITEMS = [
  {
    id: "overview",
    label: "Overview", 
    href: "/dashboard",
    icon: "LayoutDashboard",
    description: "Dashboard overview and AI-powered insights"
  },
  {
    id: "videos",
    label: "Videos", 
    href: "/dashboard/videos",
    icon: "Video",
    description: "Manage your YouTube videos"
  },
  {
    id: "apps",
    label: "Apps",
    href: "/dashboard/apps", 
    icon: "Grid2x2",
    description: "Mini apps for content creation"
  },
  {
    id: "projects",
    label: "Projects",
    href: "/dashboard/projects",
    icon: "FolderOpen", 
    description: "Manage your content projects"
  },
  {
    id: "analytics",
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: "BarChart",
    description: "Performance insights and metrics"
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
    href: "/api/auth/signout",
    icon: "LogOut"
  }
] as const;
