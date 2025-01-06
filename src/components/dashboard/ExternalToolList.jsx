import { Bot, LineChart, Type, Image } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ExternalToolList() {
  const externalTools = [
    {
      id: "vidiq",
      name: "VidIQ",
      description: "SEO optimization, keyword research, and analytics",
      icon: LineChart,
      color: "orange",
      link: "https://vidiq.com/",
    },
    {
      id: "tl-draw",
      name: "tldraw",
      description:
        "whiteboard, canvas, collaborative whiteboard, online drawing, team collaboration tool, free whiteboard app",
      icon: Bot,
      color: "blue",
      link: "https://www.tldraw.com/",
    },
    {
      id: "canva",
      name: "Canva",
      description: "Professional thumbnail and banner design tool",
      icon: Image,
      color: "purple",
      link: "https://www.canva.com/",
    },
    {
      id: "obs",
      name: "OBS Studio",
      description: "Professional streaming and recording software",
      icon: Type,
      color: "green",
      link: "https://obsproject.com/",
    },
    {
      id: "googletrends",
      name: "Google Trends",
      description: "Explore what the world is searching",
      icon: LineChart,
      color: "red",
      link: "https://trends.google.com/",
    },
    {
      id: "rapidtags",
      name: "RapidTags",
      description: "YouTube tag generator and keyword research tool",
      icon: Type,
      color: "yellow",
      link: "https://rapidtags.io/",
    },
    {
      id: "google",
      name: "Google",
      description: "Search engine for content research",
      icon: LineChart,
      color: "blue",
      link: "https://www.google.com/",
    },
    {
      id: "chatgpt",
      name: "ChatGPT",
      description: "AI-powered content assistant",
      icon: Bot,
      color: "green",
      link: "https://chat.openai.com/",
    },
    {
      id: "notebooklm",
      name: "NotebookLM",
      description: "Your Personalized AI Research Assistant",
      icon: Bot,
      color: "green",
      link: "https://notebooklm.google.com/",
    },
    {
      id: "socialpilot",
      name: "SocialPilot",
      description: "Social Media Management Tool",
      icon: LineChart,
      color: "blue",
      link: "https://www.socialpilot.co/",
    },
    {
      id: "pexels",
      name: "Pexels",
      description: "Free Stock Photos & Videos",
      icon: Image,
      color: "purple",
      link: "https://www.pexels.com/",
    },
    {
      id: "unsplash",
      name: "Unsplash",
      description: "Free Stock Photos & Videos",
      icon: Image,
      color: "purple",
      link: "https://unsplash.com/",
    },
    {
      id: "loom",
      name: "Loom",
      description: "Screen Recording and Video Messaging",
      icon: Type,
      color: "red",
      link: "https://www.loom.com",
    },
  ];

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-2xl font-semibold text-foreground mb-4">
        External Tools
      </h2>
      <p className="text-muted-foreground mb-6">
        Here are some external tools that can help you with your YouTube
        channel.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {externalTools.map((tool) => (
          <div
            key={tool.id}
            className="group relative overflow-hidden rounded-xl bg-card p-6 hover:bg-accent/50 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <div className="absolute right-0 top-0 translate-x-4 -translate-y-4">
              <div
                className={`h-24 w-24 rounded-full bg-${tool.color}-500/10 group-hover:scale-110 transition-transform duration-300`}
              />
            </div>
            <Link href={tool.link} target="_" className="relative">
              <div
                className={`mb-4 inline-flex items-center justify-center rounded-lg bg-${tool.color}-500/10 p-2 text-${tool.color}-500`}
              >
                <tool.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-semibold text-lg text-foreground">
                {tool.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {tool.description}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
