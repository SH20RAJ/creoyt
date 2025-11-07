"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Sparkles, 
  Zap, 
  PenTool, 
  MessageSquare, 
  TrendingUp, 
  FileText, 
  Lightbulb,
  Wand2,
  Copy,
  Download,
  RefreshCw,
  Heart,
  Eye,
  Share2,
  Calendar,
  Clock,
  BarChart3
} from 'lucide-react';
import { useUser } from '@stackframe/stack';

interface ContentSuggestion {
  id: string;
  title: string;
  type: 'blog' | 'social' | 'email' | 'marketing';
  description: string;
  trending?: boolean;
  engagement?: number;
}

interface GeneratedContent {
  id: string;
  title: string;
  content: string;
  type: string;
  createdAt: Date | string;
  stats?: {
    words: number;
    readTime: number;
    sentiment: string;
  };
}

interface ProjectStats {
  totalProjects: number;
  activeProjects: number;
  totalWords: number;
  avgEngagement: number;
}

const ModernDashboard: React.FC = () => {
  const user = useUser();
  const [activeTab, setActiveTab] = useState('overview');
  const [isGenerating, setIsGenerating] = useState(false);
  const [contentPrompt, setContentPrompt] = useState('');
  const [selectedType, setSelectedType] = useState('blog');
  const [suggestions, setSuggestions] = useState<ContentSuggestion[]>([]);
  const [recentContent, setRecentContent] = useState<GeneratedContent[]>([]);
  const [projectStats, setProjectStats] = useState<ProjectStats>({
    totalProjects: 0,
    activeProjects: 0,
    totalWords: 0,
    avgEngagement: 0
  });

  // Load dashboard data on mount
  useEffect(() => {
    loadSuggestions();
    loadRecentContent();
    loadProjectStats();
  }, []);

  const loadSuggestions = async () => {
    try {
      setIsGenerating(true);
      const response = await fetch('/api/dashboard/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.id })
      });
      const data = await response.json();
      setSuggestions(data.suggestions || []);
    } catch (error) {
      console.error('Failed to load suggestions:', error);
      // Fallback to demo suggestions
      setSuggestions([
        {
          id: '1',
          title: 'Top 10 AI Tools for Content Creators in 2024',
          type: 'blog',
          description: 'Comprehensive guide to the latest AI tools revolutionizing content creation',
          trending: true,
          engagement: 95
        },
        {
          id: '2',
          title: '🚀 Just launched: AI-powered content creation platform',
          type: 'social',
          description: 'Engaging announcement post for social media platforms',
          engagement: 87
        },
        {
          id: '3',
          title: 'Welcome to the Future of Content Creation',
          type: 'email',
          description: 'Onboarding email sequence for new users',
          engagement: 78
        }
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  const loadRecentContent = async () => {
    try {
      const response = await fetch(`/api/dashboard/recent-content?userId=${user?.id}`);
      const data = await response.json();
      setRecentContent(data.content || []);
    } catch (error) {
      console.error('Failed to load recent content:', error);
    }
  };

  const loadProjectStats = async () => {
    try {
      const response = await fetch(`/api/dashboard/stats?userId=${user?.id}`);
      const data = await response.json();
      setProjectStats(data.stats || projectStats);
    } catch (error) {
      console.error('Failed to load project stats:', error);
      // Set demo stats
      setProjectStats({
        totalProjects: 12,
        activeProjects: 5,
        totalWords: 45230,
        avgEngagement: 82
      });
    }
  };

  const generateContent = async (prompt?: string, type?: string) => {
    const finalPrompt = prompt || contentPrompt;
    const finalType = type || selectedType;
    
    if (!finalPrompt.trim()) return;

    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: finalPrompt,
          type: finalType,
          userId: user?.id
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        const newContent: GeneratedContent = {
          id: Date.now().toString(),
          title: finalPrompt.length > 50 ? finalPrompt.substring(0, 50) + '...' : finalPrompt,
          content: data.content,
          type: finalType,
          createdAt: new Date(),
          stats: data.stats
        };
        
        setRecentContent(prev => [newContent, ...prev.slice(0, 4)]);
        setContentPrompt('');
      }
    } catch (error) {
      console.error('Failed to generate content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyContent = (content: string) => {
    navigator.clipboard.writeText(content);
    // You could add a toast notification here
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              Welcome back, {user?.displayName || 'Creator'}! 👋
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Let's create something amazing today with the power of AI
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => loadSuggestions()} 
              variant="outline" 
              className="gap-2"
              disabled={isGenerating}
            >
              <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              Refresh Ideas
            </Button>
            <Avatar className="w-12 h-12">
              <AvatarImage src={user?.profileImageUrl} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user?.displayName?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-primary text-primary-foreground">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-foreground/80 text-sm font-medium">Total Projects</p>
                  <p className="text-3xl font-bold">{projectStats.totalProjects}</p>
                </div>
                <FileText className="w-8 h-8 text-primary-foreground/80" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-secondary text-secondary-foreground">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-secondary-foreground/80 text-sm font-medium">Active Projects</p>
                  <p className="text-3xl font-bold">{projectStats.activeProjects}</p>
                </div>
                <Zap className="w-8 h-8 text-secondary-foreground/80" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-accent text-accent-foreground">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-accent-foreground/80 text-sm font-medium">Words Written</p>
                  <p className="text-3xl font-bold">{projectStats.totalWords.toLocaleString()}</p>
                </div>
                <PenTool className="w-8 h-8 text-accent-foreground/80" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-muted text-muted-foreground">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground/80 text-sm font-medium">Avg Engagement</p>
                  <p className="text-3xl font-bold">{projectStats.avgEngagement}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-muted-foreground/80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3 bg-background shadow-lg">
            <TabsTrigger value="overview" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="create" className="gap-2">
              <Wand2 className="w-4 h-4" />
              AI Create
            </TabsTrigger>
            <TabsTrigger value="ideas" className="gap-2">
              <Lightbulb className="w-4 h-4" />
              Smart Ideas
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* AI-Powered Suggestions */}
              <Card className="border-0 shadow-lg bg-card/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    AI Content Suggestions
                  </CardTitle>
                  <CardDescription>
                    Personalized ideas generated just for you
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {suggestions.slice(0, 3).map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className="p-4 rounded-lg border-2 border-dashed border-border hover:border-primary transition-colors cursor-pointer group"
                      onClick={() => generateContent(suggestion.title, suggestion.type)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="text-xs">
                              {suggestion.type}
                            </Badge>
                            {suggestion.trending && (
                              <Badge variant="destructive" className="text-xs gap-1">
                                <TrendingUp className="w-3 h-3" />
                                Trending
                              </Badge>
                            )}
                            {suggestion.engagement && (
                              <span className="text-xs text-primary font-medium">
                                {suggestion.engagement}% engagement
                              </span>
                            )}
                          </div>
                          <h4 className="font-medium group-hover:text-primary transition-colors">
                            {suggestion.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {suggestion.description}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Wand2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setActiveTab('ideas')}
                  >
                    View All AI Ideas
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Content */}
              <Card className="border-0 shadow-lg bg-card/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Recent Creations
                  </CardTitle>
                  <CardDescription>
                    Your latest AI-generated content
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentContent.length > 0 ? recentContent.slice(0, 3).map((content) => (
                    <div key={content.id} className="p-4 bg-muted rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {content.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(content.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => copyContent(content.content)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      <h4 className="font-medium mb-1">{content.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {content.content.substring(0, 100)}...
                      </p>
                      {content.stats && (
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>{content.stats.words} words</span>
                          <span>{content.stats.readTime} min read</span>
                          <span className="capitalize">{content.stats.sentiment}</span>
                        </div>
                      )}
                    </div>
                  )) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <PenTool className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No content yet. Start creating!</p>
                    </div>
                  )}
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setActiveTab('create')}
                  >
                    Create New Content
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg bg-muted border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Jump into your most-used features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-auto p-6 flex-col gap-2 hover:bg-accent"
                    onClick={() => setActiveTab('create')}
                  >
                    <MessageSquare className="w-8 h-8 text-primary" />
                    <span className="font-medium">AI Chat</span>
                    <span className="text-xs text-muted-foreground">Interactive assistant</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-auto p-6 flex-col gap-2 hover:bg-accent"
                  >
                    <FileText className="w-8 h-8 text-primary" />
                    <span className="font-medium">Blog Post</span>
                    <span className="text-xs text-muted-foreground">Long-form content</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-auto p-6 flex-col gap-2 hover:bg-accent"
                  >
                    <Share2 className="w-8 h-8 text-primary" />
                    <span className="font-medium">Social Posts</span>
                    <span className="text-xs text-muted-foreground">Engaging snippets</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-auto p-6 flex-col gap-2 hover:bg-accent"
                  >
                    <Heart className="w-8 h-8 text-primary" />
                    <span className="font-medium">Email Copy</span>
                    <span className="text-xs text-muted-foreground">Marketing emails</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Create Tab */}
          <TabsContent value="create" className="space-y-6">
            <Card className="border-0 shadow-lg bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-primary" />
                  AI Content Generator
                </CardTitle>
                <CardDescription>
                  Describe what you want to create, and let AI do the magic
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Content Type</label>
                      <Select value={selectedType} onValueChange={setSelectedType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="blog">📝 Blog Post</SelectItem>
                          <SelectItem value="social">📱 Social Media</SelectItem>
                          <SelectItem value="email">📧 Email Campaign</SelectItem>
                          <SelectItem value="marketing">🎯 Marketing Copy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">What do you want to create?</label>
                      <Textarea
                        placeholder="Describe your content idea in detail... Be specific about tone, audience, key points, etc."
                        value={contentPrompt}
                        onChange={(e) => setContentPrompt(e.target.value)}
                        className="min-h-[120px] resize-none"
                      />
                    </div>
                    
                    <Button
                      onClick={() => generateContent()}
                      disabled={!contentPrompt.trim() || isGenerating}
                      className="w-full bg-primary hover:bg-primary/90"
                      size="lg"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Generate with AI
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
                      <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4" />
                        Pro Tips
                      </h4>
                      <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                        <li>• Be specific about your target audience</li>
                        <li>• Mention the desired tone and style</li>
                        <li>• Include key points or topics to cover</li>
                        <li>• Specify the content length if needed</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Smart Ideas Tab */}
          <TabsContent value="ideas" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestions.map((suggestion) => (
                <Card 
                  key={suggestion.id} 
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105 bg-card/80 backdrop-blur-sm"
                  onClick={() => generateContent(suggestion.title, suggestion.type)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <Badge 
                        variant={suggestion.type === 'blog' ? 'default' : 
                               suggestion.type === 'social' ? 'secondary' : 
                               suggestion.type === 'email' ? 'outline' : 'destructive'}
                        className="capitalize"
                      >
                        {suggestion.type}
                      </Badge>
                      {suggestion.trending && (
                        <Badge variant="destructive" className="text-xs gap-1">
                          <TrendingUp className="w-3 h-3" />
                          Hot
                        </Badge>
                      )}
                    </div>
                    
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {suggestion.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      {suggestion.description}
                    </p>
                    
                    {suggestion.engagement && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs">
                          <Eye className="w-3 h-3" />
                          <span className="text-primary font-medium">
                            {suggestion.engagement}% engagement
                          </span>
                        </div>
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Wand2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center">
              <Button 
                variant="outline" 
                onClick={loadSuggestions}
                disabled={isGenerating}
                className="gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                Generate More Ideas
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ModernDashboard;