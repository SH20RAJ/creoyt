"use client";

import { BentoGrid, BentoItem } from "@/components/ui/bento-grid";
import { BENTO_FEATURES_DATA } from "@/constants/landing/bento-features";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  Brain,
  BarChart3,
  PenTool,
  Search,
  FolderOpen,
  Zap,
  LucideIcon
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Brain,
  BarChart3,
  PenTool,
  Search,
  FolderOpen,
  Zap,
};

export function EnhancedFeaturesSection() {
  // Transform the data to include actual React icons
  const bentoItems: BentoItem[] = BENTO_FEATURES_DATA.map((feature) => {
    const IconComponent = iconMap[feature.iconName as keyof typeof iconMap];
    return {
      ...feature,
      icon: IconComponent ? (
        <IconComponent className={`w-4 h-4 ${feature.iconColor}`} />
      ) : null,
    };
  });

  return (
    <section id="features" className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-7xl">
        {/* Section header */}
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/20 dark:border-blue-800/20 mb-4">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              🚀 Powerful Features
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Everything You Need for
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Content Creation Success
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Transform your content creation workflow with AI-powered tools, intelligent automation, 
            and lightning-fast global performance.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="mb-16">
          <BentoGrid items={bentoItems} />
        </div>

        {/* Enhanced Bottom CTA */}
        <div className="text-center space-y-6">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">
              Ready to Transform Your Content Creation?
            </h3>
            <p className="text-muted-foreground mb-8">
              Join thousands of creators who are already using AI to scale their content production 
              and reach new audiences worldwide.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Start Creating for Free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-6 text-lg font-semibold hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-950/50 dark:hover:to-purple-950/50 transition-all duration-300"
            >
              View All Features
            </Button>
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-8 pt-12 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>200+ Global Locations</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Sub-100ms Response Time</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>99.9% Uptime SLA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
