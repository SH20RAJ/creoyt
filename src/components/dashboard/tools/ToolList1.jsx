import { LineChart, Type, Image, Bot } from "lucide-react";
import Link from "next/link";

const tools = [
  {
    title: "Channel Analysis",
    description: "Deep insights into your channel performance with ML",
    icon: LineChart,
    color: "indigo",
    link: "https://studio.youtube.com/",
  },
  {
    title: "AI Content Research",
    description: "Generate titles, tags, descriptions & playlist ideas",
    icon: Type,
    color: "blue",
    link: "/dashboard/research",
  },
  {
    title: "Thumbnail Creator",
    description: "Create eye-catching thumbnails with A/B testing",
    icon: Image,
    color: "green",
    link: "/tools/thumbnail-creator",
  },
  {
    title: "Virtual AI Coach",
    description: "Get personalized growth strategies",
    icon: Bot,
    color: "purple",
    link: "/dashboard/scout",
  },
];

export default function ToolList1() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {tools.map((tool, index) => {
        const Icon = tool.icon;
        return (
          <Link href={tool.link} key={index}>
            <div className="group relative overflow-hidden rounded-xl bg-card p-6 hover:bg-accent/50 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="absolute right-0 top-0 translate-x-4 -translate-y-4">
                <div className={`h-24 w-24 rounded-full bg-${tool.color}-500/10 group-hover:scale-110 transition-transform duration-300`} />
              </div>
              <div className="relative">
                <div className={`mb-4 inline-flex items-center justify-center rounded-lg bg-${tool.color}-500/10 p-2 text-${tool.color}-500`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-semibold text-lg text-foreground">
                  {tool.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {tool.description}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
