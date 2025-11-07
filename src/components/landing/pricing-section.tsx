"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Crown, Rocket } from "lucide-react";

const PRICING_PLANS = [
  {
    name: "Starter",
    description: "Perfect for beginning YouTubers",
    price: "$0",
    period: "forever",
    icon: Zap,
    popular: false,
    features: [
      "Basic video optimization",
      "Channel analytics",
      "5 AI suggestions per month",
      "Basic thumbnail analysis",
      "Community support"
    ],
    limitations: [
      "Limited to 1 channel",
      "Basic reporting only"
    ]
  },
  {
    name: "Creator",
    description: "For serious YouTubers ready to grow",
    price: "$29",
    period: "month",
    icon: Crown,
    popular: true,
    features: [
      "Advanced AI optimization",
      "Unlimited AI suggestions",
      "Competitor analysis",
      "Advanced thumbnail optimization",
      "Trending topic alerts",
      "Custom SEO recommendations",
      "Priority email support",
      "Connect up to 3 channels"
    ],
    limitations: []
  },
  {
    name: "Pro",
    description: "For YouTube professionals and agencies",
    price: "$99",
    period: "month",
    icon: Rocket,
    popular: false,
    features: [
      "Everything in Creator",
      "Unlimited channels",
      "Team collaboration features",
      "Advanced analytics & reporting",
      "Custom AI training",
      "White-label options",
      "24/7 priority support",
      "Custom integrations",
      "Dedicated account manager"
    ],
    limitations: []
  }
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your YouTube journey. All plans include our advanced AI technology and Turso database.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PRICING_PLANS.map((plan) => {
            const IconComponent = plan.icon;
            return (
              <Card 
                key={plan.name} 
                className={`relative ${plan.popular ? 'border-red-500 shadow-lg scale-105' : ''}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-500 text-white">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-2">
                  <div className="flex justify-center mb-4">
                    <div className={`p-3 rounded-full ${plan.popular ? 'bg-red-500' : 'bg-muted'}`}>
                      <IconComponent className={`w-6 h-6 ${plan.popular ? 'text-white' : 'text-muted-foreground'}`} />
                    </div>
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                  
                  <div className="flex items-baseline justify-center mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-1">/{plan.period}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-red-500 hover:bg-red-600' : ''}`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.price === "$0" ? "Get Started Free" : "Start Free Trial"}
                  </Button>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                      Features Included
                    </h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {plan.limitations.length > 0 && (
                    <div className="space-y-3 pt-4 border-t">
                      <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                        Limitations
                      </h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-4 h-4 rounded-full bg-muted mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            All plans include 14-day free trial • No credit card required • Cancel anytime
          </p>
          <p className="text-sm text-muted-foreground">
            Need a custom solution? <a href="mailto:sales@yt-copilot.strivio.world" className="text-primary hover:underline">Contact our sales team</a>
          </p>
        </div>
      </div>
    </section>
  );
}