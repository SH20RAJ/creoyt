'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { TextRotate } from '@/components/ui/text-rotate'
import { ParallaxFloating } from '@/components/ui/parallax-floating'
import { ArrowRight, Play, Sparkles } from 'lucide-react'

export function EnhancedHeroSection() {
  const rotatingWords = [
    'Content Creation',
    'AI Innovation', 
    'Creative Tools'
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Simplified Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      {/* Minimal Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <ParallaxFloating intensity={0.01} className="absolute top-1/3 left-1/3">
          <div className="w-96 h-96 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl" />
        </ParallaxFloating>
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center space-y-8">
          {/* Simple Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
          >
            <Sparkles className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium text-primary">
              AI-Powered Platform
            </span>
          </motion.div>

          {/* Clean Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-foreground block mb-2">Transform Ideas Into</span>
              <span className="block">
                <TextRotate 
                  words={rotatingWords}
                  duration={2500}
                  className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                />
              </span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Harness the power of AI to create compelling content that engages your audience and drives results.
            </motion.p>
          </motion.div>

          {/* Simple CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              size="lg" 
              className="px-8 py-6 text-base font-semibold group"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-6 text-base font-semibold"
            >
              <Play className="mr-2 h-4 w-4" />
              Watch Demo
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
