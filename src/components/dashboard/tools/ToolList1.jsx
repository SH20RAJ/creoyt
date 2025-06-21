"use client";

import { LineChart, Type, Bot, Projector, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { AnimatedCard } from "../../ui/animated-components";
import { cn } from "@/lib/utils";

const tools = [
  {
    title: "Channel Analysis",
    description: "Deep insights into your channel performance with ML",
    icon: LineChart,
    color: "bg-indigo-500/10 text-indigo-600 border-indigo-200",
    link: "https://studio.youtube.com/",
    tag: "Popular"
  },
  {
    title: "Tags Generator",
    description: "Generate optimized tags for your videos using AI",
    icon: Type,
    color: "bg-blue-500/10 text-blue-600 border-blue-200",
    link: "/dashboard/tools/tag-generator",
    tag: "AI Powered"
  },
  {
    title: "Project Management",
    description: "Manage your content projects with ease",
    icon: Projector,
    color: "bg-green-500/10 text-green-600 border-green-200",
    link: "/dashboard/projects",
    tag: "Organize"
  },
  {
    title: "Virtual AI Coach",
    description: "Get personalized growth strategies and insights",
    icon: Bot,
    color: "bg-purple-500/10 text-purple-600 border-purple-200",
    link: "/dashboard/scout",
    tag: "Smart"
  },
];

export default function ToolList1() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Content Tools
        </h2>
        <Link
          href="/dashboard/tools"
          className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors"
        >
          View all tools
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <Link href={tool.link} key={index} className="group">
              <AnimatedCard className="h-full relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute -top-2 -right-2 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Icon className="w-full h-full text-current" />
                </div>

                {/* Content */}
                <div className="relative space-y-4">
                  <div className="flex items-start justify-between">
                    <div className={cn("p-3 rounded-xl", tool.color)}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {tool.tag}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  <div className="flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                    Try now
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </AnimatedCard>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
