"use client";

import {
    BarChart3,
    FileText,
    Lightbulb,
    Users,
    TrendingUp,
    Plus,
    ArrowRight,
    Clock,
    Star
} from "lucide-react";
import { AnimatedCard, AnimatedButton, StatCard } from "../ui/animated-components";
import { Badge } from "../ui/badge";

export function DashboardOverview() {
    const stats = [
        {
            title: "Total Ideas",
            value: "47",
            change: "+12% this week",
            icon: Lightbulb,
            trend: "up"
        },
        {
            title: "Projects",
            value: "8",
            change: "+3 new",
            icon: FileText,
            trend: "up"
        },
        {
            title: "Views",
            value: "12.4K",
            change: "+8.2% vs last month",
            icon: BarChart3,
            trend: "up"
        },
        {
            title: "Engagement",
            value: "89%",
            change: "+5% improvement",
            icon: Users,
            trend: "up"
        }
    ];

    const quickActions = [
        {
            title: "Generate Ideas",
            description: "Get AI-powered content ideas for your niche",
            icon: Lightbulb,
            href: "/dashboard/ideas",
            color: "bg-yellow-500/10 text-yellow-600"
        },
        {
            title: "Create Project",
            description: "Start a new content project with templates",
            icon: Plus,
            href: "/dashboard/projects",
            color: "bg-blue-500/10 text-blue-600"
        },
        {
            title: "Research Trends",
            description: "Discover trending topics in your industry",
            icon: TrendingUp,
            href: "/dashboard/trends",
            color: "bg-green-500/10 text-green-600"
        },
        {
            title: "Content Scout",
            description: "Find inspiration from top-performing content",
            icon: Star,
            href: "/dashboard/scout",
            color: "bg-purple-500/10 text-purple-600"
        }
    ];

    const recentActivity = [
        {
            title: "New idea: 'Gaming Setup Reviews'",
            time: "2 hours ago",
            type: "idea"
        },
        {
            title: "Project 'Tech Tutorials' updated",
            time: "5 hours ago",
            type: "project"
        },
        {
            title: "Trend research completed",
            time: "1 day ago",
            type: "research"
        }
    ];

    return (
        <div className="space-y-8 px-4 sm:px-6">
            {/* Stats Grid */}
            <section>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Overview
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <StatCard key={index} {...stat} />
                    ))}
                </div>
            </section>

            {/* Quick Actions */}
            <section>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Plus className="h-5 w-5 text-primary" />
                    Quick Actions
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {quickActions.map((action, index) => (
                        <AnimatedCard key={index} className="group cursor-pointer">
                            <div className="space-y-3">
                                <div className={`inline-flex p-3 rounded-xl ${action.color}`}>
                                    <action.icon className="h-6 w-6" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                                        {action.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {action.description}
                                    </p>
                                </div>
                                <div className="flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                    Get started
                                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </AnimatedCard>
                    ))}
                </div>
            </section>

            {/* Recent Activity & Quick Links */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <div className="lg:col-span-2">
                    <AnimatedCard>
                        <div className="space-y-4">
                            <h3 className="font-semibold flex items-center gap-2">
                                <Clock className="h-4 w-4 text-primary" />
                                Recent Activity
                            </h3>
                            <div className="space-y-3">
                                {recentActivity.map((activity, index) => (
                                    <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors">
                                        <div className="w-2 h-2 bg-primary rounded-full" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">{activity.title}</p>
                                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                                        </div>
                                        <Badge variant="secondary" className="text-xs">
                                            {activity.type}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                            <AnimatedButton variant="ghost" className="w-full">
                                View all activity
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </AnimatedButton>
                        </div>
                    </AnimatedCard>
                </div>

                {/* Quick Stats */}
                <div>
                    <AnimatedCard className="h-full" gradient>
                        <div className="space-y-4">
                            <h3 className="font-semibold">This Week</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Ideas Generated</span>
                                    <span className="font-semibold">12</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Content Published</span>
                                    <span className="font-semibold">5</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Research Sessions</span>
                                    <span className="font-semibold">8</span>
                                </div>
                                <div className="pt-2 border-t">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Productivity Score</span>
                                        <Badge className="bg-green-500/10 text-green-600 border-green-200">
                                            Excellent
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimatedCard>
                </div>
            </div>
        </div>
    );
}
