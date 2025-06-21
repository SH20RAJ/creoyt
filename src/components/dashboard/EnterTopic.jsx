/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, Sparkles, TrendingUp } from "lucide-react";
import { AnimatedCard, AnimatedButton } from "../ui/animated-components";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

export function EnterTopic() {
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const suggestions = [
    { text: "Gaming setup reviews", trend: "🎮" },
    { text: "DIY home improvement", trend: "🔨" },
    { text: "Healthy meal prep", trend: "🥗" },
    { text: "Tech gadget unboxing", trend: "📱" },
    { text: "Travel destination guides", trend: "✈️" },
    { text: "Fitness routines", trend: "💪" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsLoading(true);
    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    router.push(`/dashboard/research?topic=${encodeURIComponent(topic)}`);
  };

  const handleSuggestionClick = (suggestionText) => {
    setTopic(suggestionText);
  };

  return (
    <section className="py-8 px-4 sm:px-6">
      <AnimatedCard className="max-w-4xl mx-auto text-center" gradient>
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 text-primary">
              <Sparkles className="h-6 w-6" />
              <span className="text-sm font-medium">AI-Powered Content Research</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              What's Your <span className="text-primary">Topic</span>?
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Enter your content topic and let our AI generate ideas, research trends, and create optimized content for your audience.
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <Input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter your content topic..."
                className="pl-10 pr-4 py-3 text-base border-2 border-border focus:border-primary transition-all duration-200 rounded-xl bg-background/50"
                autoFocus
              />
            </div>

            <AnimatedButton
              type="submit"
              size="lg"
              disabled={!topic.trim() || isLoading}
              className={cn(
                "w-full sm:w-auto min-w-[180px]",
                isLoading && "opacity-50 cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-background border-t-transparent mr-2" />
                  Researching...
                </>
              ) : (
                <>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Start Research
                </>
              )}
            </AnimatedButton>
          </form>

          {/* Suggestions */}
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Popular topics:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion.text)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-full transition-all duration-200 hover:scale-105"
                >
                  <span>{suggestion.trend}</span>
                  {suggestion.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </AnimatedCard>
    </section>
  );
}
