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
  Radar, 
  TrendingUp, 
  Eye, 
  Heart, 
  Share2,
  Bookmark,
  Filter,
  Search,
  Calendar,
  BarChart3,
  Users,
  Globe,
  Play,
  Hash,
  ExternalLink
} from "lucide-react";

export default function ScoutPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [platform, setPlatform] = useState("");
  const [timeRange, setTimeRange] = useState("");

  const platforms = [
    { value: "all", label: "All Platforms" },
    { value: "youtube", label: "YouTube" },
    { value: "instagram", label: "Instagram" },
    { value: "twitter", label: "Twitter/X" },
    { value: "tiktok", label: "TikTok" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "reddit", label: "Reddit" }
  ];

  const timeRanges = [
    { value: "1h", label: "Last Hour" },
    { value: "24h", label: "Last 24 Hours" },
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
    { value: "90d", label: "Last 3 Months" }
  ];

  const viralContent = [
    {
      id: 1,
      title: "AI Writing Tool Comparison: Which One Actually Works?",
      platform: "YouTube",
      creator: "TechReviewer",
      views: "2.3M",
      engagement: "156K",
      viralScore: 95,
      growthRate: "+245%",
      publishedAt: "2 hours ago",
      thumbnail: "/api/placeholder/300/200",
      tags: ["AI", "Writing", "Tools", "Comparison"],
      description: "Comprehensive review of 10 AI writing tools with real-world testing"
    },
    {
      id: 2,
      title: "This AI prompt changed my entire content strategy",
      platform: "Twitter",
      creator: "@ContentGuru",
      views: "890K",
      engagement: "45K",
      viralScore: 88,
      growthRate: "+189%",
      publishedAt: "4 hours ago",
      thumbnail: "/api/placeholder/300/200",
      tags: ["AI", "Prompts", "Strategy", "Content"],
      description: "Simple AI prompt that revolutionized content creation workflow"
    },
    {
      id: 3,
      title: "Why everyone is switching to AI content creation",
      platform: "LinkedIn",
      creator: "Marketing Expert",
      views: "567K",
      engagement: "23K",
      viralScore: 82,
      growthRate: "+167%",
      publishedAt: "6 hours ago",
      thumbnail: "/api/placeholder/300/200",
      tags: ["AI", "Marketing", "Trends", "Business"],
      description: "Industry analysis on the shift towards AI-powered content creation"
    },
    {
      id: 4,
      title: "AI Content Creation Setup for Beginners",
      platform: "TikTok",
      creator: "@AICreator",
      views: "1.2M",
      engagement: "78K",
      viralScore: 79,
      growthRate: "+134%",
      publishedAt: "8 hours ago",
      thumbnail: "/api/placeholder/300/200",
      tags: ["AI", "Tutorial", "Beginners", "Setup"],
      description: "Step-by-step guide to getting started with AI content tools"
    }
  ];

  const trendingHashtags = [
    { tag: "#AIContent", posts: "245K", growth: "+78%" },
    { tag: "#ContentCreation", posts: "189K", growth: "+45%" },
    { tag: "#AIWriting", posts: "156K", growth: "+89%" },
    { tag: "#DigitalMarketing", posts: "234K", growth: "+34%" },
    { tag: "#ContentStrategy", posts: "98K", growth: "+67%" },
    { tag: "#AITools", posts: "167K", growth: "+123%" }
  ];

  const opportunityAreas = [
    {
      topic: "AI-Powered Video Editing",
      opportunity: "High",
      competition: "Low",
      searchVolume: "45K/month",
      trend: "growing",
      description: "Growing demand for AI video editing tutorials and reviews"
    },
    {
      topic: "Content Automation Workflows",
      opportunity: "Medium",
      competition: "Medium",
      searchVolume: "23K/month",
      trend: "stable",
      description: "Steady interest in automated content creation processes"
    },
    {
      topic: "AI Ethics in Content",
      opportunity: "High",
      competition: "Low",
      searchVolume: "12K/month",
      trend: "growing",
      description: "Emerging discussions about ethical AI content creation"
    }
  ];

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "YouTube":
        return <Play className="h-4 w-4 text-red-600" />;
      case "Twitter":
        return <Share2 className="h-4 w-4 text-blue-600" />;
      case "LinkedIn":
        return <Users className="h-4 w-4 text-blue-700" />;
      case "TikTok":
        return <Play className="h-4 w-4 text-black" />;
      default:
        return <Globe className="h-4 w-4 text-gray-600" />;
    }
  };

  const getViralScoreColor = (score: number) => {
    if (score >= 90) return "text-red-600 bg-red-100";
    if (score >= 80) return "text-orange-600 bg-orange-100";
    if (score >= 70) return "text-yellow-600 bg-yellow-100";
    return "text-blue-600 bg-blue-100";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Radar className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Scout & Discovery</h1>
          <p className="text-muted-foreground">Discover viral content and identify trending opportunities</p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="search">Search Content</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search topics, keywords, or creators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label>Platform</Label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger>
                  <SelectValue placeholder="All platforms" />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Time Range</Label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Last 24 hours" />
                </SelectTrigger>
                <SelectContent>
                  {timeRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex space-x-2 mt-4">
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Scout Content
            </Button>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Viral Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Viral Content</h2>
            <Button variant="outline" size="sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              Real-time Updates
            </Button>
          </div>

          <div className="space-y-4">
            {viralContent.map((content) => (
              <Card key={content.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex space-x-4">
                    <div className="w-20 h-16 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                      <Play className="h-6 w-6 text-gray-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {getPlatformIcon(content.platform)}
                            <span className="text-sm font-medium">{content.platform}</span>
                            <span className="text-sm text-muted-foreground">by {content.creator}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getViralScoreColor(content.viralScore)}`}>
                              🔥 {content.viralScore}
                            </span>
                          </div>
                          <h3 className="font-semibold text-lg mb-2 leading-tight">{content.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{content.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Eye className="h-4 w-4" />
                              <span>{content.views} views</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="h-4 w-4" />
                              <span>{content.engagement} engagements</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <TrendingUp className="h-4 w-4" />
                              <span className="text-green-600">{content.growthRate}</span>
                            </div>
                            <span>{content.publishedAt}</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            {content.tags.map((tag, index) => (
                              <span key={index} className="px-2 py-1 bg-accent text-accent-foreground rounded-md text-xs">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 ml-4">
                          <Button variant="ghost" size="sm">
                            <Bookmark className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending Hashtags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Hash className="h-5 w-5" />
                <span>Trending Hashtags</span>
              </CardTitle>
              <CardDescription>Popular hashtags in your niche</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {trendingHashtags.map((hashtag, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors">
                  <div>
                    <p className="font-medium text-sm">{hashtag.tag}</p>
                    <p className="text-xs text-muted-foreground">{hashtag.posts} posts</p>
                  </div>
                  <span className="text-xs font-medium text-green-600">{hashtag.growth}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Opportunity Areas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Content Opportunities</span>
              </CardTitle>
              <CardDescription>Untapped content areas to explore</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {opportunityAreas.map((opportunity, index) => (
                <div key={index} className="p-3 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{opportunity.topic}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      opportunity.opportunity === 'High' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {opportunity.opportunity} Opportunity
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{opportunity.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>🔍 {opportunity.searchVolume}</span>
                    <span>📊 {opportunity.competition} competition</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Analysis
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Bookmark className="h-4 w-4 mr-2" />
                Save to Collection
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
