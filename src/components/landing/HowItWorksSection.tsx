'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, Zap, Globe, Target } from 'lucide-react';
import Link from 'next/link';

export function HowItWorksSection() {
  const steps = [
    {
      step: '01',
      title: 'Connect Your Channel',
      description: 'Link your YouTube account and grant access to our AI tools for analysis and optimization.',
      icon: <Globe className="w-6 h-6" />
    },
    {
      step: '02',
      title: 'AI Content Analysis',
      description: 'Our advanced algorithms analyze your content, audience, and performance metrics.',
      icon: <Sparkles className="w-6 h-6" />
    },
    {
      step: '03',
      title: 'Generate & Optimize',
      description: 'Receive AI-generated content ideas, titles, and optimization suggestions.',
      icon: <Zap className="w-6 h-6" />
    },
    {
      step: '04',
      title: 'Publish & Grow',
      description: 'Publish optimized content and track growth with real-time analytics.',
      icon: <Target className="w-6 h-6" />
    }
  ];

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-background to-primary/5" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center mb-16">
          {/* Badge */}
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
            <Sparkles className="w-4 h-4 mr-2" />
            Simple 4-Step Process
          </Badge>

          {/* Main title */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>

          {/* Subtitle */}
          <h3 className="text-xl md:text-2xl text-muted-foreground font-medium mb-6">
            Transform your YouTube strategy in minutes
          </h3>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            Our AI-powered platform streamlines your content creation process, from ideation to optimization, 
            helping you grow your channel with data-driven insights and intelligent automation.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:bg-card/70 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                {step.icon}
              </div>
              <div className="text-primary/70 text-sm font-semibold mb-2">{step.step}</div>
              <h4 className="text-xl font-bold mb-2">{step.title}</h4>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button size="lg" className="px-8 py-6 text-lg font-semibold" asChild>
            <Link href="/handler/sign-up">
              Start Growing Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="px-8 py-6 text-lg font-semibold" asChild>
            <Link href="#features">
              Learn More Features
            </Link>
          </Button>
        </div>

        {/* Stats */}
       <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
         <div className="text-center">
           <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
             10K+
           </div>
           <div className="text-sm text-muted-foreground font-medium">
             Videos Analyzed
           </div>
         </div>
         <div className="text-center">
           <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
             50K+
           </div>
           <div className="text-sm text-muted-foreground font-medium">
             Users
           </div>
         </div>
         <div className="text-center">
           <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
             180+
           </div>
           <div className="text-sm text-muted-foreground font-medium">
             Countries
           </div>
         </div>
         <div className="text-center">
           <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
             24/7
           </div>
           <div className="text-sm text-muted-foreground font-medium">
             Support
           </div>
         </div>
       </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-20 w-16 h-16 bg-primary/5 rounded-full blur-xl" />
      <div className="absolute bottom-1/4 right-20 w-24 h-24 bg-secondary/5 rounded-full blur-xl" />
    </section>
  );
}