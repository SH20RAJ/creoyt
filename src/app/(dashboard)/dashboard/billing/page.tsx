"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Download, 
  Calendar,
  Check,
  X,
  Zap,
  Users,
  BarChart3,
  Shield,
  Clock,
  AlertCircle
} from "lucide-react";

export default function BillingPage() {
  const [selectedPlan, setSelectedPlan] = useState("pro");

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "$0",
      period: "/month",
      description: "Perfect for getting started",
      features: [
        "5 AI-generated ideas per month",
        "Basic research tools",
        "3 projects",
        "Community support",
        "Basic analytics"
      ],
      limitations: [
        "No advanced AI models",
        "No team collaboration",
        "Limited export options"
      ],
      popular: false
    },
    {
      id: "pro",
      name: "Pro",
      price: "$29",
      period: "/month",
      description: "For serious content creators",
      features: [
        "Unlimited AI ideas",
        "Advanced research tools",
        "Unlimited projects",
        "Priority support",
        "Advanced analytics",
        "Team collaboration (up to 5 members)",
        "All export formats",
        "Custom AI prompts"
      ],
      limitations: [],
      popular: true
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "$99",
      period: "/month",
      description: "For teams and organizations",
      features: [
        "Everything in Pro",
        "Unlimited team members",
        "Custom integrations",
        "SSO authentication",
        "Advanced security",
        "Dedicated account manager",
        "Custom AI training",
        "White-label options"
      ],
      limitations: [],
      popular: false
    }
  ];

  const currentPlan = {
    name: "Pro",
    price: "$29/month",
    nextBilling: "January 15, 2025",
    status: "active"
  };

  const paymentMethods = [
    {
      id: "card1",
      type: "visa",
      last4: "4242",
      expires: "12/27",
      isDefault: true
    }
  ];

  const invoices = [
    {
      id: "inv_001",
      date: "Dec 15, 2024",
      amount: "$29.00",
      status: "paid",
      description: "Pro Plan - Monthly"
    },
    {
      id: "inv_002",
      date: "Nov 15, 2024",
      amount: "$29.00",
      status: "paid",
      description: "Pro Plan - Monthly"
    },
    {
      id: "inv_003",
      date: "Oct 15, 2024",
      amount: "$29.00",
      status: "paid",
      description: "Pro Plan - Monthly"
    }
  ];

  const usage = {
    aiIdeas: { used: 342, limit: "unlimited" },
    projects: { used: 24, limit: "unlimited" },
    teamMembers: { used: 3, limit: 5 },
    storage: { used: 2.4, limit: 10, unit: "GB" }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <CreditCard className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Billing & Plans</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your subscription, billing information, and usage
          </p>
        </div>

        {/* Current Plan */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  Current Plan
                  <Badge variant="secondary">{currentPlan.name}</Badge>
                </CardTitle>
                <CardDescription>
                  You are currently on the {currentPlan.name} plan
                </CardDescription>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{currentPlan.price}</p>
                <p className="text-sm text-gray-500">Next billing: {currentPlan.nextBilling}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium">AI Ideas</span>
                </div>
                <p className="text-lg font-bold">
                  {usage.aiIdeas.used} / {usage.aiIdeas.limit}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">Projects</span>
                </div>
                <p className="text-lg font-bold">
                  {usage.projects.used} / {usage.projects.limit}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium">Team Members</span>
                </div>
                <p className="text-lg font-bold">
                  {usage.teamMembers.used} / {usage.teamMembers.limit}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium">Storage</span>
                </div>
                <p className="text-lg font-bold">
                  {usage.storage.used} / {usage.storage.limit} {usage.storage.unit}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Available Plans */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Plans</CardTitle>
                <CardDescription>
                  Choose the plan that best fits your needs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedPlan === plan.id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 hover:border-gray-300"
                    } ${plan.popular ? "ring-2 ring-blue-500" : ""}`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{plan.name}</h3>
                        {plan.popular && (
                          <Badge variant="default" className="text-xs">Most Popular</Badge>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold">{plan.price}</span>
                        <span className="text-sm text-gray-500">{plan.period}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {plan.description}
                    </p>
                    <div className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-600" />
                          <span>{feature}</span>
                        </div>
                      ))}
                      {plan.limitations.map((limitation, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-500">
                          <X className="w-4 h-4 text-red-500" />
                          <span>{limitation}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div className="flex gap-2">
                  <Button className="flex-1">
                    {selectedPlan === "pro" ? "Current Plan" : "Upgrade Plan"}
                  </Button>
                  <Button variant="outline">
                    Contact Sales
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment & Billing */}
          <div className="space-y-6">
            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Manage your payment methods
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="font-medium">•••• •••• •••• {method.last4}</p>
                        <p className="text-sm text-gray-500">Expires {method.expires}</p>
                      </div>
                      {method.isDefault && (
                        <Badge variant="secondary" className="text-xs">Default</Badge>
                      )}
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  Add Payment Method
                </Button>
              </CardContent>
            </Card>

            {/* Billing History */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Billing History</CardTitle>
                    <CardDescription>
                      View and download your invoices
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {invoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium">{invoice.description}</p>
                          <p className="text-sm text-gray-500">{invoice.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge 
                          variant={invoice.status === "paid" ? "secondary" : "destructive"}
                          className="text-xs"
                        >
                          {invoice.status.toUpperCase()}
                        </Badge>
                        <span className="font-medium">{invoice.amount}</span>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Billing Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                  Billing Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <Clock className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                      Next billing in 12 days
                    </p>
                    <p className="text-xs text-amber-700 dark:text-amber-300">
                      Your Pro plan will renew on January 15, 2025 for $29.00
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Email billing reminders</span>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
