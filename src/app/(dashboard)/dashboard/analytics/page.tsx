"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Eye, 
  Heart, 
  Share2,
  Users,
  Clock,
  Target,
  Download,
  Calendar,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from "lucide-react";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d");
  const [contentType, setContentType] = useState("all");

  const timeRanges = [
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
    { value: "90d", label: "Last 3 Months" },
    { value: "12m", label: "Last 12 Months" }
  ];

  const contentTypes = [
    { value: "all", label: "All Content" },
    { value: "blog", label: "Blog Posts" },
    { value: "social", label: "Social Media" },
    { value: "video", label: "Videos" },
    { value: "newsletter", label: "Newsletters" }
  ];

  const overviewStats = [
    {
      title: "Total Views",
      value: "847,392",
      change: "+12.5%",
      trend: "up",
      icon: Eye,
      color: "text-blue-600"
    },
    {
      title: "Engagement Rate",
      value: "4.8%",
      change: "+0.8%",
      trend: "up",
      icon: Heart,
      color: "text-red-600"
    },
    {
      title: "Shares",
      value: "12,847",
      change: "-2.3%",
      trend: "down",
      icon: Share2,
      color: "text-green-600"
    },
    {
      title: "New Followers",
      value: "3,291",
      change: "+18.2%",
      trend: "up",
      icon: Users,
      color: "text-purple-600"
    }
  ];

  const topPerformingContent = [
    {
      id: 1,
      title: "10 AI Tools Every Content Creator Needs",
      type: "Blog Post",
      platform: "Website",
      views: "45,231",
      engagement: "8.7%",
      shares: "892",
      publishedDate: "Dec 15, 2024",
      performance: "excellent"
    },
    {
      id: 2,
      title: "How AI Changed My Content Strategy",
      type: "Video",
      platform: "YouTube",
      views: "23,108",
      engagement: "12.4%",
      shares: "456",
      publishedDate: "Dec 12, 2024",
      performance: "good"
    },
    {
      id: 3,
      title: "Quick AI Writing Tips Thread",
      type: "Social Media",
      platform: "Twitter",
      views: "18,765",
      engagement: "15.2%",
      shares: "734",
      publishedDate: "Dec 10, 2024",
      performance: "excellent"
    },
    {
      id: 4,
      title: "Content Creation Workflow with AI",
      type: "Newsletter",
      platform: "Email",
      views: "12,456",
      engagement: "6.8%",
      shares: "234",
      publishedDate: "Dec 8, 2024",
      performance: "average"
    }
  ];

  const audienceInsights = [
    {
      metric: "Top Age Group",
      value: "25-34 years",
      percentage: "42%"
    },
    {
      metric: "Primary Location",
      value: "United States",
      percentage: "38%"
    },
    {
      metric: "Peak Activity Time",
      value: "2-4 PM EST",
      percentage: "23%"
    },
    {
      metric: "Device Preference",
      value: "Mobile",
      percentage: "67%"
    }
  ];

  const contentTopics = [
    { topic: "AI Tools", performance: 92, posts: 15 },
    { topic: "Content Strategy", performance: 87, posts: 12 },
    { topic: "Productivity", performance: 78, posts: 8 },
    { topic: "Marketing Tips", performance: 74, posts: 10 },
    { topic: "Social Media", performance: 69, posts: 18 }
  ];

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "excellent":
        return "bg-green-100 text-green-800";
      case "good":
        return "bg-blue-100 text-blue-800";
      case "average":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPerformanceScore = (score: number) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-blue-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BarChart3 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Track your content performance and audience insights</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => {
          const IconComponent = stat.icon;
          const isPositive = stat.trend === "up";
          
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <IconComponent className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center space-x-1 text-xs">
                  {isPositive ? (
                    <ArrowUpRight className="h-3 w-3 text-green-600" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-red-600" />
                  )}
                  <span className={isPositive ? "text-green-600" : "text-red-600"}>
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground">vs last period</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Performing Content */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Top Performing Content</CardTitle>
                <CardDescription>Your best content from the selected period</CardDescription>
              </div>
              <Select value={contentType} onValueChange={setContentType}>
                <SelectTrigger className="w-40">
                  <SelectValue />
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
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformingContent.map((content, index) => (
                <div key={content.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium">{content.title}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPerformanceColor(content.performance)}`}>
                        {content.performance}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{content.type} • {content.platform}</span>
                      <span>📊 {content.views} views</span>
                      <span>💖 {content.engagement} engagement</span>
                      <span>🔄 {content.shares} shares</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Published {content.publishedDate}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar Analytics */}
        <div className="space-y-6">
          {/* Audience Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Audience Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {audienceInsights.map((insight, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{insight.metric}</p>
                    <p className="text-sm text-muted-foreground">{insight.value}</p>
                  </div>
                  <span className="text-sm font-semibold text-primary">{insight.percentage}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Content Topics Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Topic Performance</span>
              </CardTitle>
              <CardDescription>How your content topics are performing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {contentTopics.map((topic, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{topic.topic}</span>
                    <span className={`text-sm font-semibold ${getPerformanceScore(topic.performance)}`}>
                      {topic.performance}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{topic.posts} posts</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${topic.performance}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Analytics Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Report
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Custom Analysis
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Activity className="h-4 w-4 mr-2" />
                Real-time Tracking
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Performance Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
          <CardDescription>Content performance trends over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Interactive charts will be displayed here</p>
              <p className="text-xs text-muted-foreground">Integration with analytics providers coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
