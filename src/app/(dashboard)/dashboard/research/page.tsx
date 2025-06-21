"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  TrendingUp, 
  BarChart3, 
  Users, 
  Globe,
  Filter,
  Download,
  Eye,
  Calendar
} from "lucide-react";

export default function ResearchPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const trendingTopics = [
    {
      topic: "AI Content Creation",
      growth: "+245%",
      searches: "127K",
      category: "Technology",
      trend: "up"
    },
    {
      topic: "Sustainable Marketing",
      growth: "+89%",
      searches: "45K",
      category: "Marketing",
      trend: "up"
    },
    {
      topic: "Remote Work Tools",
      growth: "+156%",
      searches: "89K",
      category: "Business",
      trend: "up"
    },
    {
      topic: "Personal Branding",
      growth: "+67%",
      searches: "234K",
      category: "Career",
      trend: "up"
    }
  ];

  const competitorAnalysis = [
    {
      competitor: "ContentKing",
      domain: "contentking.com",
      monthlyVisits: "2.3M",
      topKeywords: ["content marketing", "SEO tools"],
      contentGaps: 15,
      performance: "strong"
    },
    {
      competitor: "CreativeFlow",
      domain: "creativeflow.io",
      monthlyVisits: "890K",
      topKeywords: ["creative writing", "AI content"],
      contentGaps: 8,
      performance: "moderate"
    },
    {
      competitor: "IdeaLab",
      domain: "idealab.co",
      monthlyVisits: "1.7M",
      topKeywords: ["content ideas", "brainstorming"],
      contentGaps: 23,
      performance: "strong"
    }
  ];

  const researchReports = [
    {
      title: "Q4 2024 Content Marketing Trends",
      description: "Comprehensive analysis of content marketing trends and predictions",
      date: "Dec 15, 2024",
      type: "Trend Report",
      status: "completed"
    },
    {
      title: "Competitor Content Strategy Analysis",
      description: "Deep dive into top competitors' content strategies",
      date: "Dec 10, 2024",
      type: "Competitor Analysis",
      status: "completed"
    },
    {
      title: "Social Media Engagement Study",
      description: "Analysis of engagement patterns across social platforms",
      date: "Dec 8, 2024",
      type: "Social Research",
      status: "in-progress"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Search className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Research Dashboard</h1>
          <p className="text-muted-foreground">Discover trends, analyze competitors, and gather insights</p>
        </div>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Search trends, keywords, competitors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-lg h-12"
              />
            </div>
            <Button size="lg">
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
            <Button variant="outline" size="lg">
              <Filter className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Trending Topics */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Trending Topics</span>
                </CardTitle>
                <CardDescription>Hot topics and growing trends in your niche</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trendingTopics.map((topic, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-semibold">{topic.topic}</h3>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {topic.growth}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                      <span>{topic.searches} searches</span>
                      <span>•</span>
                      <span>{topic.category}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Research Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Active Queries</span>
                </div>
                <span className="font-semibold">47</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Competitors Tracked</span>
                </div>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">Data Sources</span>
                </div>
                <span className="font-semibold">8</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {researchReports.slice(0, 3).map((report, index) => (
                  <div key={index} className="p-3 rounded-lg border">
                    <h4 className="font-medium text-sm">{report.title}</h4>
                    <div className="flex items-center space-x-2 mt-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{report.date}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-3" size="sm">
                View All Reports
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Competitor Analysis */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Competitor Analysis</CardTitle>
              <CardDescription>Track your competitors&apos; content strategies and performance</CardDescription>
            </div>
            <Button>Add Competitor</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {competitorAnalysis.map((competitor, index) => (
              <div key={index} className="p-4 rounded-lg border">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-semibold">{competitor.competitor}</h3>
                      <span className="text-sm text-muted-foreground">{competitor.domain}</span>
                    </div>
                    <div className="flex items-center space-x-6 mt-2 text-sm text-muted-foreground">
                      <span>📈 {competitor.monthlyVisits} monthly visits</span>
                      <span>🔍 {competitor.contentGaps} content gaps found</span>
                      <span>🎯 {competitor.topKeywords.join(", ")}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
