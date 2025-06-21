"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Lightbulb, 
  Sparkles, 
  Copy, 
  Heart, 
  MoreHorizontal,
  RefreshCw,
  Wand2
} from "lucide-react";

export default function IdeasPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [topic, setTopic] = useState("");
  const [contentType, setContentType] = useState("");
  const [platform, setPlatform] = useState("");

  const contentTypes = [
    { value: "blog", label: "Blog Posts" },
    { value: "social", label: "Social Media" },
    { value: "video", label: "Video Content" },
    { value: "podcast", label: "Podcast Episodes" },
    { value: "newsletter", label: "Newsletter" },
    { value: "course", label: "Course Content" }
  ];

  const platforms = [
    { value: "youtube", label: "YouTube" },
    { value: "instagram", label: "Instagram" },
    { value: "twitter", label: "Twitter/X" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "tiktok", label: "TikTok" },
    { value: "website", label: "Website/Blog" }
  ];

  const generatedIdeas = [
    {
      id: 1,
      title: "10 AI Tools That Will Transform Your Content Creation in 2025",
      description: "Explore the latest AI-powered tools revolutionizing content creation workflows",
      category: "Technology",
      platform: "Blog",
      engagement: "High",
      trending: true
    },
    {
      id: 2,
      title: "The Psychology Behind Viral Content: What Makes People Share",
      description: "Deep dive into the psychological triggers that make content go viral",
      category: "Marketing",
      platform: "YouTube",
      engagement: "Medium",
      trending: false
    },
    {
      id: 3,
      title: "Content Creation Burnout: Signs, Solutions, and Prevention",
      description: "Help creators recognize and overcome burnout while maintaining quality",
      category: "Wellness",
      platform: "LinkedIn",
      engagement: "High",
      trending: true
    }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Lightbulb className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">AI Idea Generation</h1>
          <p className="text-muted-foreground">Generate unlimited content ideas with AI assistance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Generation Form */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wand2 className="h-5 w-5" />
              <span>Generate Ideas</span>
            </CardTitle>
            <CardDescription>Customize your content idea generation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="topic">Topic or Keyword</Label>
              <Input
                id="topic"
                placeholder="e.g., AI, Marketing, Fitness..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="content-type">Content Type</Label>
              <Select value={contentType} onValueChange={setContentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  {contentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="platform">Target Platform</Label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((platform) => (
                    <SelectItem key={platform.value} value={platform.value}>
                      {platform.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              className="w-full" 
              onClick={handleGenerate}
              disabled={isGenerating || !topic}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Ideas
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Ideas */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Generated Ideas</h2>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Regenerate All
            </Button>
          </div>

          <div className="space-y-4">
            {generatedIdeas.map((idea) => (
              <Card key={idea.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {idea.trending && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            🔥 Trending
                          </span>
                        )}
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          idea.engagement === 'High' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {idea.engagement} Engagement
                        </span>
                      </div>
                      <CardTitle className="text-lg leading-tight">{idea.title}</CardTitle>
                      <CardDescription className="mt-2">{idea.description}</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{idea.category}</span>
                      <span>•</span>
                      <span>{idea.platform}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
