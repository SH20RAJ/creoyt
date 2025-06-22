"use client";

import React from "react";
import { motion } from "framer-motion";
import { AnimatedGradient } from "@/components/ui/animated-gradient-with-svg";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BentoCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  colors: string[];
  delay: number;
}

const BentoCard: React.FC<BentoCardProps> = ({
  title,
  value,
  subtitle,
  colors,
  delay,
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay + 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="relative overflow-hidden h-full bg-background dark:bg-background/50 rounded-lg border"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <AnimatedGradient colors={colors} speed={0.05} blur="medium" />
      <motion.div
        className="relative z-10 p-3 sm:p-5 md:p-8 text-foreground backdrop-blur-sm"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h3 
          className="text-sm sm:text-base md:text-lg text-foreground font-medium" 
          variants={item}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground"
          variants={item}
        >
          {value}
        </motion.p>
        {subtitle && (
          <motion.p 
            className="text-sm text-foreground/80" 
            variants={item}
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

const AnimatedGradientBentoDemo: React.FC = () => {
  return (
    <div className="w-full bg-background min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            ✨ Animated Gradient Demo
          </Badge>
          <h1 className="text-4xl font-bold mb-4 text-gradient">
            Bento Grid with Animated Gradients
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Showcasing the animated gradient component in a modern Bento grid layout
            with various configurations and effects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[600px]">
          <div className="md:col-span-2">
            <BentoCard
              title="Total Revenue"
              value="$1,234,567"
              subtitle="15% increase from last month"
              colors={["#3B82F6", "#60A5FA", "#93C5FD"]}
              delay={0.2}
            />
          </div>
          <BentoCard
            title="New Users"
            value={1234}
            subtitle="Daily signups"
            colors={["#60A5FA", "#34D399", "#93C5FD"]}
            delay={0.4}
          />
          <BentoCard
            title="Conversion Rate"
            value="3.45%"
            subtitle="0.5% increase from last week"
            colors={["#F59E0B", "#A78BFA", "#FCD34D"]}
            delay={0.6}
          />
          <div className="md:col-span-2">
            <BentoCard
              title="Active Projects"
              value={42}
              subtitle="8 completed this month"
              colors={["#3B82F6", "#A78BFA", "#FBCFE8"]}
              delay={0.8}
            />
          </div>
          <div className="md:col-span-3">
            <BentoCard
              title="Customer Satisfaction"
              value="4.8/5"
              subtitle="Based on 1,000+ reviews from verified customers across all product categories"
              colors={["#EC4899", "#F472B6", "#3B82F6"]}
              delay={1}
            />
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Different Animation Speeds
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="relative overflow-hidden h-48">
              <AnimatedGradient
                colors={["#FF6B6B", "#4ECDC4", "#45B7D1"]}
                speed={2}
                blur="light"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Badge className="bg-background/80 backdrop-blur-sm">
                  Fast (Speed: 2x)
                </Badge>
              </div>
            </Card>

            <Card className="relative overflow-hidden h-48">
              <AnimatedGradient
                colors={["#FF9A9E", "#FECFEF", "#FECFEF"]}
                speed={1}
                blur="medium"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Badge className="bg-background/80 backdrop-blur-sm">
                  Normal (Speed: 1x)
                </Badge>
              </div>
            </Card>

            <Card className="relative overflow-hidden h-48">
              <AnimatedGradient
                colors={["#667eea", "#764ba2", "#f093fb"]}
                speed={0.3}
                blur="heavy"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Badge className="bg-background/80 backdrop-blur-sm">
                  Slow (Speed: 0.3x)
                </Badge>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AnimatedGradientBentoDemo };
export default AnimatedGradientBentoDemo;
