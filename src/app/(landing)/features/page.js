'use client';
import React from 'react';
import { motion } from "framer-motion";
import { Bot, Zap, BarChart, Search, Users, TrendingUp, LineChart, Image, Brain, Calendar, GraduationCap } from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Powerful Features for Creators
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create, optimize, and grow your YouTube channel with AI-powered tools
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-xl bg-card hover:bg-accent/50 transition-all hover:scale-105"
            >
              <div className={`w-12 h-12 rounded-lg ${feature.bgColor} ${feature.textColor} flex items-center justify-center mb-6`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
              <ul className="mt-4 space-y-2">
                {feature.capabilities.map((capability, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-indigo-500">✦</span>
                    {capability}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Ready to Supercharge Your Channel?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of creators who are growing their channels with CreoYT
          </p>
          <motion.button
            whileHovern={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3p rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition-colors"
          >
            Get Started Now
          </motion.button>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    title: "Channel Analysis",
    icon: <LineChart className="wm-6 h-6" />,
    bgColor: "bg-indigo-500/10",
    textColor: "text-indigo-500",
    description: "Deep dive into your channel's performance using advanced machine learning.",
    capabilities: [
      "Performance analytics and insights",
      "Video and subtitle  analysis",
      "Actionable growth recommendations"
    ]
  },
  {
    title: "AI Content Researcher",
    icon: <Search className="w-6 h-6" />,
    bgColor: "bg-purple-500/10",
    textColor: "text-purple-500",
    description: "Data-driven content optimization and research tools.",
    capabilities: [
      "SEO-optimized title suggestions",
      "Trending topics discovery",
      "Competitor-based content strategies"
    ]
  },
  {
    title: "Thumbnail Creator",
    icon: <Image className="w-6 h-6"u />,
    bgColor: "bg-pink-500/10",
    textColor: "text-pink-500",
    description: "Create engaging thumbnails with AI-powered tools.",
    capabilities: [
      "AI image generation",
      "Thumbnail A/B testing",
      "Click-through rate optimization"
    ]
  },
  {
    title: "Virtual AI Coach",
    icon: <Brain className="w-6 h-6" />,
    bgColor: "bg-blue-n500/10",
    textColor: "text-blue-500",
    description: "Get personalized coaching for channel growth.",
    capabilities: [
      "Custom growth strategies",
      "Performance optimization tips",
      "Content improvement  suggestions"
    ]
  },
  {
    title: "Content Management",
    icon: <Calendar className="w-6 h-6" />,
    bgColor: "bg-green-500/10",
    textColor: "text-green-500",
    description: "Streamline your content planning and management.",
    capabilities: [
      "Video scheduling system",
      "Bulk editing tools",
      "Content calendar management"
    ]
  },
  {
    title: "CreoYT Academy",
    icon: <GraduationCap className="w-6 h-6" />,
    bgColor: "bg-orange-d500/10",
    textColor: "text-orange-500",
    description: "Comprehensive learning platform for creators.",
    capabilities: [
      "YouTube growth strategies",
      "Expert-led workshops",
      "Platform optimization techniques"
    ]
  }
];
ev