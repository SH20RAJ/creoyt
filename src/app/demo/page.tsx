import React from "react";
import { AnimatedGradient } from "@/components/ui/animated-gradient-with-svg";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Animated Gradient Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <AnimatedGradient
          colors={[
            "hsl(var(--primary))",
            "hsl(var(--secondary))",
            "hsl(var(--accent))",
            "hsl(var(--chart-1))",
            "hsl(var(--chart-2))",
          ]}
          speed={0.5}
          blur="medium"
        />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <Badge variant="outline" className="mb-4 bg-background/80 backdrop-blur-sm">
            ✨ Component Demo
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
            Advanced React UI Components
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Showcasing integrated shadcn/ui components with advanced animations and modern design patterns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/">View Hero Section</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/research-agent">Try AI Chat</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Component Showcase */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Integrated Components</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              All components follow shadcn/ui structure, use Tailwind CSS, and are fully TypeScript compatible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Animated Gradient Demo */}
            <Card className="relative overflow-hidden">
              <div className="relative h-48">
                <AnimatedGradient
                  colors={["#FF6B6B", "#4ECDC4", "#45B7D1"]}
                  speed={1}
                  blur="light"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Badge className="bg-background/80 backdrop-blur-sm">
                    Animated Background
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle>Animated Gradient</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  SVG-based animated gradient backgrounds with customizable colors, speed, and blur effects.
                </p>
                <div className="mt-4 space-y-2">
                  <Badge variant="secondary" className="mr-2">framer-motion</Badge>
                  <Badge variant="secondary" className="mr-2">SVG</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Hero Section Demo */}
            <Card>
              <CardHeader>
                <CardTitle>Enhanced Hero Section</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Text rotation animations with parallax floating elements and modern design.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/">View on Homepage</Link>
                </Button>
                <div className="mt-4 space-y-2">
                  <Badge variant="secondary" className="mr-2">Text Rotation</Badge>
                  <Badge variant="secondary" className="mr-2">Parallax</Badge>
                  <Badge variant="secondary">Framer Motion</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Bento Grid Demo */}
            <Card>
              <CardHeader>
                <CardTitle>Bento Grid Features</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Modern grid layout for showcasing features with responsive design.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/#features">View Features</Link>
                </Button>
                <div className="mt-4 space-y-2">
                  <Badge variant="secondary" className="mr-2">CSS Grid</Badge>
                  <Badge variant="secondary" className="mr-2">Responsive</Badge>
                  <Badge variant="secondary">Tailwind</Badge>
                </div>
              </CardContent>
            </Card>

            {/* AI Chat Demo */}
            <Card>
              <CardHeader>
                <CardTitle>Animated AI Chat</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Advanced chat interface with command palette, file attachments, and glassmorphism.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/research-agent">Try AI Chat</Link>
                </Button>
                <div className="mt-4 space-y-2">
                  <Badge variant="secondary" className="mr-2">Command Palette</Badge>
                  <Badge variant="secondary" className="mr-2">Glassmorphism</Badge>
                  <Badge variant="secondary">Animations</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Custom Animations */}
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 animate-pulse" />
              <div className="relative">
                <CardHeader>
                  <CardTitle>Custom Animations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Extended Tailwind CSS with custom keyframes and animation utilities.
                  </p>
                  <div className="mt-4 space-y-2">
                    <Badge variant="secondary" className="mr-2">CSS Keyframes</Badge>
                    <Badge variant="secondary" className="mr-2">Tailwind v4</Badge>
                    <Badge variant="secondary">Custom Props</Badge>
                  </div>
                </CardContent>
              </div>
            </Card>

            {/* Technical Stack */}
            <Card>
              <CardHeader>
                <CardTitle>Technical Stack</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-2">Framework</h4>
                    <Badge variant="outline">Next.js 15</Badge>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">UI Components</h4>
                    <Badge variant="outline" className="mr-2">shadcn/ui</Badge>
                    <Badge variant="outline">Radix UI</Badge>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Styling</h4>
                    <Badge variant="outline" className="mr-2">Tailwind CSS v4</Badge>
                    <Badge variant="outline">Framer Motion</Badge>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Type Safety</h4>
                    <Badge variant="outline">TypeScript</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gradient Variants Demo */}
      <section className="section-padding bg-muted/30">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Gradient Variations</h2>
            <p className="text-muted-foreground">
              Different configurations of the animated gradient component
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Fast Animation */}
            <Card className="relative overflow-hidden h-64">
              <AnimatedGradient
                colors={["#FF9A9E", "#FECFEF", "#FECFEF"]}
                speed={2}
                blur="light"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Badge className="bg-background/80 backdrop-blur-sm mb-2">
                    Fast Animation
                  </Badge>
                  <p className="text-sm text-muted-foreground bg-background/60 backdrop-blur-sm rounded px-2 py-1">
                    Speed: 2x, Blur: Light
                  </p>
                </div>
              </div>
            </Card>

            {/* Medium Animation */}
            <Card className="relative overflow-hidden h-64">
              <AnimatedGradient
                colors={["#A8EDEA", "#FED6E3", "#D299C2"]}
                speed={0.8}
                blur="medium"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Badge className="bg-background/80 backdrop-blur-sm mb-2">
                    Medium Animation
                  </Badge>
                  <p className="text-sm text-muted-foreground bg-background/60 backdrop-blur-sm rounded px-2 py-1">
                    Speed: 0.8x, Blur: Medium
                  </p>
                </div>
              </div>
            </Card>

            {/* Heavy Blur */}
            <Card className="relative overflow-hidden h-64">
              <AnimatedGradient
                colors={["#667eea", "#764ba2", "#f093fb"]}
                speed={0.3}
                blur="heavy"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Badge className="bg-background/80 backdrop-blur-sm mb-2">
                    Heavy Blur
                  </Badge>
                  <p className="text-sm text-muted-foreground bg-background/60 backdrop-blur-sm rounded px-2 py-1">
                    Speed: 0.3x, Blur: Heavy
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
