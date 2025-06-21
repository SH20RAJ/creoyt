"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Users, 
  Plus, 
  ArrowRight,
  Lightbulb,
  Search,
  PenTool 
} from "lucide-react";

export default function DashboardOverview() {
  const quickStats = [
    {
      title: "Ideas Generated",
      value: "127",
      change: "+12% from last week",
      icon: Lightbulb,
      color: "text-blue-600"
    },
    {
      title: "Content Created",
      value: "43",
      change: "+8% from last week",
      icon: FileText,
      color: "text-green-600"
    },
    {
      title: "Research Reports",
      value: "18",
      change: "+23% from last week",
      icon: Search,
      color: "text-purple-600"
    },
    {
      title: "Active Projects",
      value: "7",
      change: "+2 new this week",
      icon: Users,
      color: "text-orange-600"
    }
  ];

  const recentActivity = [
    {
      action: "Generated 5 blog post ideas",
      time: "2 hours ago",
      category: "AI Ideas"
    },
    {
      action: "Completed research on 'AI Trends 2025'",
      time: "4 hours ago",
      category: "Research"
    },
    {
      action: "Published article 'Content Marketing Guide'",
      time: "1 day ago",
      category: "Content"
    },
    {
      action: "Started new project 'Social Media Campaign'",
      time: "2 days ago",
      category: "Projects"
    }
  ];

  const quickActions = [
    {
      title: "Generate Ideas",
      description: "Create new content ideas with AI",
      icon: Lightbulb,
      href: "/dashboard/ideas",
      color: "bg-blue-500"
    },
    {
      title: "Start Research",
      description: "Research trends and competitors",
      icon: Search,
      href: "/dashboard/research",
      color: "bg-purple-500"
    },
    {
      title: "Create Content",
      description: "Write with AI assistance",
      icon: PenTool,
      href: "/dashboard/studio",
      color: "bg-green-500"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Welcome back!</h1>
          <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your content creation.</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <IconComponent className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest content creation activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{activity.time}</span>
                      <span>•</span>
                      <span className="text-primary">{activity.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4">
              View All Activity
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Jump into your workflow</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start h-auto p-4"
                  asChild
                >
                  <a href={action.href}>
                    <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center mr-3 flex-shrink-0`}>
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{action.title}</div>
                      <div className="text-xs text-muted-foreground">{action.description}</div>
                    </div>
                  </a>
                </Button>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
