'use client';
import React from 'react';
import { motion } from "framer-motion";
import { Bot, Zap, BarChart, Search, Users, TrendingUp } from "lucide-react";

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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition-colors"
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
    title: "AI Content Assistant",
    description: "Generate engaging content ideas and optimize your videos for maximum reach",
    icon: <Bot className="w-6 h-6" />,
    bgColor: "bg-purple-500/10",
    textColor: "text-purple-500",
    capabilities: [
      "Smart title generation",
      "Description optimization",
      "Tag recommendations",
      "Script writing assistance"
    ]
  },
  {
    title: "Advanced Analytics",
    description: "Deep insights into your channel's performance and audience behavior",
    icon: <BarChart className="w-6 h-6" />,
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-500",
    capabilities: [
      "Real-time performance tracking",
      "Audience insights",
      "Engagement analytics",
      "Growth trends"
    ]
  },
  {
    title: "SEO Optimization",
    description: "Improve your videos' visibility and reach in search results",
    icon: <Search className="w-6 h-6" />,
    bgColor: "bg-green-500/10",
    textColor: "text-green-500",
    capabilities: [
      "Keyword research",
      "Ranking optimization",
      "Search trend analysis",
      "Metadata enhancement"
    ]
  },
  {
    title: "Thumbnail Creator",
    description: "Create eye-catching thumbnails that boost click-through rates",
    icon: <Zap className="w-6 h-6" />,
    bgColor: "bg-amber-500/10",
    textColor: "text-amber-500",
    capabilities: [
      "A/B testing",
      "Template library",
      "Custom branding",
      "Performance analytics"
    ]
  },
  {
    title: "Community Management",
    description: "Engage with your audience and build a loyal community",
    icon: <Users className="w-6 h-6" />,
    bgColor: "bg-pink-500/10",
    textColor: "text-pink-500",
    capabilities: [
      "Comment moderation",
      "Fan engagement",
      "Community insights",
      "Collaboration tools"
    ]
  },
  {
    title: "Monetization Tools",
    description: "Maximize your revenue with advanced monetization strategies",
    icon: <TrendingUp className="w-6 h-6" />,
    bgColor: "bg-red-500/10",
    textColor: "text-red-500",
    capabilities: [
      "Ad revenue optimization",
      "Sponsorship management",
      "Merchandise integration",
      "Affiliate marketing"
    ]
  }
];
