'use client';
import React from 'react';
import { motion } from "framer-motion";
import { BookOpen, Video, Lightbulb, Target, Users, FileText } from "lucide-react";

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Resources & Guides
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn how to grow your YouTube channel with our comprehensive guides and resources
          </p>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl bg-card hover:bg-accent/50 transition-all cursor-pointer group"
            >
              <div className={`w-12 h-12 rounded-lg ${resource.bgColor} ${resource.textColor} flex items-center justify-center mb-6`}>
                {resource.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-indigo-500 transition-colors">
                {resource.title}
              </h3>
              <p className="text-muted-foreground mb-4">{resource.description}</p>
              <span className="text-sm font-medium text-indigo-500">Learn more →</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Stay Updated</h2>
          <p className="text-muted-foreground mb-8">
            Subscribe to our newsletter for the latest YouTube growth strategies and tips
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition-colors"
            >
              Subscribe
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
}

const resources = [
  {
    title: "YouTube SEO Guide",
    description: "Learn how to optimize your videos for better search visibility and reach.",
    icon: <BookOpen className="w-6 h-6" />,
    bgColor: "bg-indigo-500/10",
    textColor: "text-indigo-500"
  },
  {
    title: "Content Strategy",
    description: "Develop a winning content strategy that grows your channel consistently.",
    icon: <Video className="w-6 h-6" />,
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-500"
  },
  {
    title: "Thumbnail Design",
    description: "Create eye-catching thumbnails that increase your click-through rates.",
    icon: <Lightbulb className="w-6 h-6" />,
    bgColor: "bg-amber-500/10",
    textColor: "text-amber-500"
  },
  {
    title: "Audience Growth",
    description: "Build and engage with your audience to create a loyal community.",
    icon: <Users className="w-6 h-6" />,
    bgColor: "bg-green-500/10",
    textColor: "text-green-500"
  },
  {
    title: "Analytics Guide",
    description: "Understand your channel analytics to make data-driven decisions.",
    icon: <Target className="w-6 h-6" />,
    bgColor: "bg-pink-500/10",
    textColor: "text-pink-500"
  },
  {
    title: "Best Practices",
    description: "Follow proven best practices for successful YouTube content creation.",
    icon: <FileText className="w-6 h-6" />,
    bgColor: "bg-purple-500/10",
    textColor: "text-purple-500"
  }
];
