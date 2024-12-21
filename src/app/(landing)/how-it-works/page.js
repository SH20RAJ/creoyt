/* eslint-disable react/no-unescaped-entities */
'use client';
import React from 'react';
import { motion } from "framer-motion";
import { ArrowRight, Zap, Target, BarChart } from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            How CreoYT Works
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your YouTube content creation process with our AI-powered platform
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">1. Connect Your Channel</h3>
                  <p className="text-muted-foreground">
                    Link your YouTube channel to CreoYT and let our AI analyze your content and audience.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex gap-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                  <Target className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">2. Get AI Recommendations</h3>
                  <p className="text-muted-foreground">
                    Receive personalized suggestions for titles, thumbnails, and content strategies.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex gap-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-green-500/10 text-green-500">
                  <BarChart className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">3. Track & Optimize</h3>
                  <p className="text-muted-foreground">
                    Monitor performance metrics and optimize your content strategy in real-time.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Video or Image Demo */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/80 text-lg">Video Demo</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Powerful Features</h2>
          <p className="text-muted-foreground">Everything you need to create engaging content</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl bg-card hover:bg-accent/50 transition-colors"
            >
              <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Ready to Transform Your Content?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of creators who are already using CreoYT to grow their channels
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition-colors"
          >
            Get Started <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    title: "AI Title Generator",
    description: "Generate high-converting titles using machine learning algorithms"
  },
  {
    title: "Thumbnail Creator",
    description: "Create eye-catching thumbnails with A/B testing capabilities"
  },
  {
    title: "Content Analysis",
    description: "Get deep insights into your content performance and audience"
  },
  {
    title: "SEO Optimization",
    description: "Optimize your content for better search visibility"
  },
  {
    title: "Competitor Analysis",
    description: "Track and analyze your competitors' strategies"
  },
  {
    title: "Growth Insights",
    description: "Get personalized recommendations for channel growth"
  }
];
