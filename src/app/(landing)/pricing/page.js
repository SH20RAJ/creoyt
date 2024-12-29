import Link from "next/link";

/* eslint-disable react/no-unescaped-entities */
export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan to help grow your YouTube channel with our
            AI-powered tools.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="relative p-8 rounded-2xl bg-card border border-border hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold mb-4 text-foreground">Free</h3>
            <p className="text-muted-foreground mb-6">
              Perfect for getting started
            </p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-foreground">$0</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-2 text-muted-foreground">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Basic Channel Analytics
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                3 AI-Generated Titles/month
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Basic Thumbnail Creator
              </li>
            </ul>
            <button className="w-full py-3 rounded-lg bg-card hover:bg-accent/50 border border-border text-foreground font-medium transition-colors">
              Get Started
            </button>
          </div>

          {/* Pro Plan */}
          <div className="relative p-8 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white hover:shadow-xl transition-shadow">
            <div className="absolute top-0 right-0 bg-white/20 px-3 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
              Popular
            </div>
            <h3 className="text-2xl font-bold mb-4">Pro</h3>
            <p className="text-white/80 mb-6">Best for growing channels</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">$29</span>
              <span className="text-white/80">/month</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-2 text-white/80">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Advanced Analytics Dashboard
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Unlimited AI Content Generation
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Advanced Thumbnail Creator
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                AI Content Coach
              </li>
            </ul>
            <button className="w-full py-3 rounded-lg bg-white text-indigo-600 font-medium hover:bg-white/90 transition-colors">
              Get Started
            </button>
          </div>

          <div className="relative p-8 rounded-2xl bg-card border border-border hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Enterprise
            </h3>
            <p className="text-muted-foreground mb-6">
              For professional creators
            </p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-foreground">$99</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-2 text-muted-foreground">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Everything in Pro
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Priority Support
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Custom Integration
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Advanced API Access
              </li>
            </ul>
            <Link
              href="/contact"
              className="w-full py-3 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition-colors text-center block"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 px-4 bg-muted/50 mb-20 rounded-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12 text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                Can I upgrade or downgrade my plan?
              </h3>
              <p className="text-muted-foreground">
                Yes, you can change your plan at any time. Changes will be
                reflected in your next billing cycle.
              </p>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                Do you offer refunds?
              </h3>
              <p className="text-muted-foreground">
                We offer a 14-day money-back guarantee for all paid plans.
              </p>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                What payment methods do you accept?
              </h3>
              <p className="text-muted-foreground">
                We accept all major credit cards and PayPal.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
