"use client";
export const runtime = 'edge';


import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Check, AlertCircle } from "lucide-react";

const subscriptionData = {
  current: {
    plan: "Pro",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "active",
  },
  usage: {
    videosGenerated: 45,
    videosLimit: 100,
    storageUsed: 2.5,
    storageLimit: 5,
  },
};

const pricingPlans = [
  {
    plan: "Basic",
    price: "$9.99/mo",
    features: [
      "50 AI Video Generations",
      "2GB Storage",
      "Basic Templates",
      "Email Support",
    ],
    recommended: false,
  },
  {
    plan: "Pro",
    price: "$19.99/mo",
    features: [
      "100 AI Video Generations",
      "5GB Storage",
      "Premium Templates",
      "Priority Support",
      "Custom Branding",
    ],
    recommended: true,
  },
  {
    plan: "Enterprise",
    price: "$49.99/mo",
    features: [
      "Unlimited Video Generations",
      "20GB Storage",
      "All Premium Features",
      "24/7 Support",
      "API Access",
    ],
    recommended: false,
  },
];

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Current Subscription Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="text-primary w-5 h-5" />
              Current Subscription
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold">
                  {subscriptionData.current.plan}
                </h3>
                <p className="text-muted-foreground">
                  Valid until{" "}
                  {new Date(
                    subscriptionData.current.endDate
                  ).toLocaleDateString()}
                </p>
              </div>
              <Button variant="outline">Manage Subscription</Button>
            </div>

            {/* Usage Statistics */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Video Generations</span>
                  <span>
                    {subscriptionData.usage.videosGenerated}/
                    {subscriptionData.usage.videosLimit}
                  </span>
                </div>
                <Progress
                  value={
                    (subscriptionData.usage.videosGenerated /
                      subscriptionData.usage.videosLimit) *
                    100
                  }
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Storage Used</span>
                  <span>
                    {subscriptionData.usage.storageUsed}GB/
                    {subscriptionData.usage.storageLimit}GB
                  </span>
                </div>
                <Progress
                  value={
                    (subscriptionData.usage.storageUsed /
                      subscriptionData.usage.storageLimit) *
                    100
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Plans */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Available Plans</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.plan}
                className={`relative ${
                  plan.recommended ? "border-primary" : ""
                }`}
              >
                {plan.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-fuchsia-400 text-white px-3 py-1 rounded-full text-sm">
                    Recommended
                  </span>
                )}
                <CardHeader>
                  <CardTitle>{plan.plan}</CardTitle>
                  <p className="text-3xl font-bold">{plan.price}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full mt-6"
                    variant={plan.recommended ? "default" : "outline"}
                    onClick={() => setSelectedPlan(plan)}
                  >
                    {subscriptionData.current.plan === plan.plan
                      ? "Current Plan"
                      : "Upgrade"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
