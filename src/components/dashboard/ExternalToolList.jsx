"use client";

import {
  Bot,
  LineChart,
  Type,
  Image,
  ExternalLink,
  ArrowRight,
  Wrench
} from "lucide-react";
import Link from "next/link";
import { AnimatedCard } from "../ui/animated-components";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

export default function ExternalToolList() {
  const categories = {
    analytics: {
      name: "Analytics & SEO",
      color: "bg-blue-500/10 text-blue-600",
      tools: [
        {
          id: "vidiq",
          name: "VidIQ",
          description: "SEO optimization, keyword research, and analytics",
          icon: LineChart,
          link: "https://vidiq.com/",
          category: "SEO"
        },
        {
          id: "googletrends",
          name: "Google Trends",
          description: "Explore what the world is searching",
          icon: LineChart,
          link: "https://trends.google.com/",
          category: "Research"
        },
        {
          id: "rapidtags",
          name: "RapidTags",
          description: "YouTube tag generator and keyword research tool",
          icon: Type,
          link: "https://rapidtags.io/",
          category: "Tags"
        }
      ]
    },
    design: {
      name: "Design & Media",
      color: "bg-purple-500/10 text-purple-600",
      tools: [
        {
          id: "canva",
          name: "Canva",
          description: "Professional thumbnail and banner design tool",
          icon: Image,
          link: "https://www.canva.com/",
          category: "Design"
        },
        {
          id: "pexels",
          name: "Pexels",
          description: "Free Stock Photos & Videos",
          icon: Image,
          link: "https://www.pexels.com/",
          category: "Stock"
        },
        {
          id: "unsplash",
          name: "Unsplash",
          description: "Free Stock Photos & Videos",
          icon: Image,
          link: "https://unsplash.com/",
          category: "Stock"
        }
      ]
    },
    ai: {
      name: "AI & Automation",
      color: "bg-green-500/10 text-green-600",
      tools: [
        {
          id: "chatgpt",
          name: "ChatGPT",
          description: "AI-powered content assistant",
          icon: Bot,
          link: "https://chat.openai.com/",
          category: "AI"
        },
        {
          id: "notebooklm",
          name: "NotebookLM",
          description: "Your Personalized AI Research Assistant",
          icon: Bot,
          link: "https://notebooklm.google.com/",
          category: "Research"
        }
      ]
    },
    production: {
      name: "Production & Tools",
      color: "bg-orange-500/10 text-orange-600",
      tools: [
        {
          id: "obs",
          name: "OBS Studio",
          description: "Professional streaming and recording software",
          icon: Type,
          link: "https://obsproject.com/",
          category: "Recording"
        },
        {
          id: "loom",
          name: "Loom",
          description: "Screen Recording and Video Messaging",
          icon: Type,
          link: "https://www.loom.com",
          category: "Recording"
        },
        {
          id: "tl-draw",
          name: "tldraw",
          description: "Collaborative whiteboard and drawing tool",
          icon: Bot,
          link: "https://www.tldraw.com/",
          category: "Design"
        }
      ]
    }
  };

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Wrench className="h-5 w-5 text-primary" />
            External Tools
          </h2>
          <p className="text-sm text-muted-foreground">
            Powerful external tools to enhance your content creation workflow
          </p>
        </div>
        <Link
          href="/dashboard/tools/external"
          className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors"
        >
          Browse all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="space-y-8">
        {Object.entries(categories).map(([key, category]) => (
          <div key={key} className="space-y-4">
            <div className="flex items-center gap-2">
              <div className={cn("px-3 py-1 rounded-full text-sm font-medium", category.color)}>
                {category.name}
              </div>
              <div className="h-px bg-border flex-1" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.tools.map((tool) => (
                <Link
                  key={tool.id}
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <AnimatedCard className="h-full">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className={cn("p-3 rounded-xl", category.color)}>
                          <tool.icon className="h-5 w-5" />
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {tool.category}
                          </Badge>
                          <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          {tool.name}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {tool.description}
                        </p>
                      </div>

                      <div className="flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                        Open tool
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </AnimatedCard>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
