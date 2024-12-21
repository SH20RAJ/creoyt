import { EnterTopic } from "@/components/dashboard/EnterTopic";
import { LineChart, Type, Image, Bot } from "lucide-react";

export default function page() {
  return (
    <div className="relative">
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <EnterTopic />
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
          {/* Channel Analysis Card */}
          <div className="group relative overflow-hidden rounded-xl bg-card p-6 hover:bg-accent/50 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer">
            <div className="absolute right-0 top-0 translate-x-4 -translate-y-4">
              <div className="h-24 w-24 rounded-full bg-indigo-500/10 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="relative">
              <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-indigo-500/10 p-2 text-indigo-500">
                <LineChart className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-semibold text-lg text-foreground">
                Channel Analysis
              </h3>
              <p className="text-sm text-muted-foreground">
                Deep insights into your channel performance with ML
              </p>
            </div>
          </div>

          {/* AI Title Generator Card */}
          <div className="group relative overflow-hidden rounded-xl bg-card p-6 hover:bg-accent/50 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer">
            <div className="absolute right-0 top-0 translate-x-4 -translate-y-4">
              <div className="h-24 w-24 rounded-full bg-blue-500/10 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="relative">
              <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-blue-500/10 p-2 text-blue-500">
                <Type className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-semibold text-lg text-foreground">
                AI Title Generator
              </h3>
              <p className="text-sm text-muted-foreground">
                Generate SEO-optimized titles that boost CTR
              </p>
            </div>
          </div>

          {/* Thumbnail Creator Card */}
          <div className="group relative overflow-hidden rounded-xl bg-card p-6 hover:bg-accent/50 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer">
            <div className="absolute right-0 top-0 translate-x-4 -translate-y-4">
              <div className="h-24 w-24 rounded-full bg-green-500/10 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="relative">
              <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-green-500/10 p-2 text-green-500">
                <Image className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-semibold text-lg text-foreground">
                Thumbnail Creator
              </h3>
              <p className="text-sm text-muted-foreground">
                Create eye-catching thumbnails with A/B testing
              </p>
            </div>
          </div>

          {/* Virtual AI Coach Card */}
          <div className="group relative overflow-hidden rounded-xl bg-card p-6 hover:bg-accent/50 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer">
            <div className="absolute right-0 top-0 translate-x-4 -translate-y-4">
              <div className="h-24 w-24 rounded-full bg-purple-500/10 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="relative">
              <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-purple-500/10 p-2 text-purple-500">
                <Bot className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-semibold text-lg text-foreground">
                Virtual AI Coach
              </h3>
              <p className="text-sm text-muted-foreground">
                Get personalized growth strategies
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
