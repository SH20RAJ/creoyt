'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function CtaSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="relative max-w-4xl mx-auto">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 rounded-3xl" />
          
          <div className="relative bg-card border rounded-3xl p-8 md:p-12 lg:p-16 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Ready to transform your 
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {' '}content creation?
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Join thousands of creators, marketers, and businesses who are already using 
              YT Copilot to scale their content creation with AI-powered tools.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="px-8 py-6 text-lg font-semibold" asChild>
                <Link href="/handler/sign-up">
                  Start Creating for Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg font-semibold" asChild>
                <Link href="/handler/sign-in">
                  Schedule a Demo
                </Link>
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-6">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
