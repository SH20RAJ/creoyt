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
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Sparkles, 
  Wand2, 
  PenTool, 
  MessageSquare, 
  FileText, 
  Share2, 
  Mail, 
  TrendingUp,
  Save, 
  Download, 
  Copy, 
  Eye, 
  BarChart3, 
  Clock, 
  Lightbulb,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Zap,
  Target,
  Users,
  Globe,
  Mic,
  Video,
  Image as ImageIcon,
  Calendar,
  Hash,
  AtSign
} from 'lucide-react';
import { useUser } from '@stackframe/stack';

export default function ContentStudioPage() {
  const user = useUser();
  const [activeTab, setActiveTab] = useState('create');
  const [selectedContentType, setSelectedContentType] = useState('');
  const [currentProject, setCurrentProject] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [contentPrompt, setContentPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [contentStats, setContentStats] = useState({
    words: 0,
    characters: 0,
    readTime: 0,
    sentiment: 'neutral'
  });
  const [recentProjects, setRecentProjects] = useState([]);
  const [aiSuggestions, setAiSuggestions] = useState([]);

  // Content type configurations with AI prompts and settings
  const contentTypes = [
    {
      id: 'blog',
      title: 'Blog Post',
      description: 'Long-form articles and thought leadership pieces',
      icon: FileText,
      gradient: 'from-blue-500 to-blue-600',
      estimatedTime: '15-30 min',
      features: ['SEO optimization', 'Structured headings', 'Research integration'],
      aiPrompt: 'Create a comprehensive, engaging blog post',
      maxLength: 2500,
      targetAudience: ['professionals', 'enthusiasts', 'general readers']
    },
    {
      id: 'social',
      title: 'Social Media',
      description: 'Engaging posts for all social platforms',
      icon: Share2,
      gradient: 'from-pink-500 to-rose-500',
      estimatedTime: '5-10 min',
      features: ['Platform optimization', 'Hashtag suggestions', 'Engagement hooks'],
      aiPrompt: 'Create viral-worthy social media content',
      maxLength: 280,
      targetAudience: ['millennials', 'gen-z', 'professionals']
    },
    {
      id: 'email',
      title: 'Email Campaign',
      description: 'Newsletters and marketing emails',
      icon: Mail,
      gradient: 'from-green-500 to-emerald-500',
      estimatedTime: '10-20 min',
      features: ['Subject line optimization', 'Personalization', 'CTA placement'],
      aiPrompt: 'Write compelling email marketing content',
      maxLength: 1500,
      targetAudience: ['subscribers', 'customers', 'prospects']
    },
    {
      id: 'marketing',
      title: 'Marketing Copy',
      description: 'Sales pages, ads, and promotional content',
      icon: TrendingUp,
      gradient: 'from-purple-500 to-violet-500',
      estimatedTime: '20-45 min',
      features: ['Conversion optimization', 'Persuasive language', 'A/B test variants'],
      aiPrompt: 'Create high-converting marketing copy',
      maxLength: 2000,
      targetAudience: ['potential customers', 'leads', 'decision makers']
    },
    {
      id: 'script',
      title: 'Video Script',
      description: 'YouTube, TikTok, and presentation scripts',
      icon: Video,
      gradient: 'from-red-500 to-orange-500',
      estimatedTime: '15-25 min',
      features: ['Scene directions', 'Engagement hooks', 'Call-to-actions'],
      aiPrompt: 'Write an engaging video script',
      maxLength: 1200,
      targetAudience: ['viewers', 'subscribers', 'audience']
    },
    {
      id: 'podcast',
      title: 'Podcast Content',
      description: 'Episode outlines, show notes, and scripts',
      icon: Mic,
      gradient: 'from-indigo-500 to-blue-500',
      estimatedTime: '20-40 min',
      features: ['Episode structure', 'Talking points', 'Guest questions'],
      aiPrompt: 'Create comprehensive podcast content',
      maxLength: 2000,
      targetAudience: ['listeners', 'podcast audience', 'audio learners']
    }
  ];

  // Load initial data
  useEffect(() => {
    loadRecentProjects();
    loadAiSuggestions();
  }, []);

  // Update content stats when content changes
  useEffect(() => {
    calculateContentStats();
  }, [content, generatedContent]);

  const loadRecentProjects = async () => {
    // Mock data - in production, fetch from API
    const projects = [
      {
        id: '1',
        title: 'AI Revolution in Marketing',
        type: 'blog',
        lastEdited: new Date(Date.now() - 2 * 60 * 60 * 1000),
        wordCount: 1247,
        status: 'draft',
        engagement: 85
      },
      {
        id: '2', 
        title: 'Social Media Strategy 2024',
        type: 'social',
        lastEdited: new Date(Date.now() - 5 * 60 * 60 * 1000),
        wordCount: 156,
        status: 'published',
        engagement: 92
      },
      {
        id: '3',
        title: 'Product Launch Email Series',
        type: 'email',
        lastEdited: new Date(Date.now() - 24 * 60 * 60 * 1000),
        wordCount: 892,
        status: 'scheduled',
        engagement: 78
      }
    ];
    setRecentProjects(projects);
  };

  const loadAiSuggestions = async () => {
    // Mock AI suggestions based on trends and user behavior
    const suggestions = [
      {
        id: '1',
        title: 'Write about emerging AI trends in 2024',
        type: 'blog',
        trending: true,
        difficulty: 'medium',
        estimatedEngagement: 88
      },
      {
        id: '2',
        title: 'Create a carousel post about productivity tips',
        type: 'social',
        trending: true,
        difficulty: 'easy',
        estimatedEngagement: 94
      },
      {
        id: '3',
        title: 'Email sequence for new product onboarding',
        type: 'email',
        trending: false,
        difficulty: 'hard',
        estimatedEngagement: 82
      }
    ];
    setAiSuggestions(suggestions);
  };

  const calculateContentStats = () => {
    const activeContent = generatedContent || content;
    if (!activeContent) {
      setContentStats({ words: 0, characters: 0, readTime: 0, sentiment: 'neutral' });
      return;
    }

    const words = activeContent.trim().split(/\s+/).length;
    const characters = activeContent.length;
    const readTime = Math.ceil(words / 200);

    // Simple sentiment analysis
    const positiveWords = ['great', 'excellent', 'amazing', 'love', 'perfect', 'outstanding'];
    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'horrible', 'worst'];
    const lowerContent = activeContent.toLowerCase();
    
    const positiveCount = positiveWords.filter(word => lowerContent.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerContent.includes(word)).length;
    
    let sentiment = 'neutral';
    if (positiveCount > negativeCount) sentiment = 'positive';
    else if (negativeCount > positiveCount) sentiment = 'negative';

    setContentStats({ words, characters, readTime, sentiment });
  };

  const generateContent = async (prompt?: string, type?: string) => {
    const finalPrompt = prompt || contentPrompt;
    const finalType = type || selectedContentType;
    
    if (!finalPrompt.trim() || !finalType) return;

    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: finalPrompt,
          type: finalType,
          userId: user?.id,
          tone: 'professional',
          audience: 'general'
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setGeneratedContent(data.content);
        if (!title) {
          setTitle(finalPrompt.length > 50 ? finalPrompt.substring(0, 50) + '...' : finalPrompt);
        }
      }
    } catch (error) {
      console.error('Failed to generate content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const useGeneratedContent = () => {
    setContent(generatedContent);
    setGeneratedContent('');
  };

  const saveProject = async () => {
    // Mock save functionality
    const projectData = {
      title,
      content: content || generatedContent,
      type: selectedContentType,
      stats: contentStats
    };
    
    console.log('Saving project:', projectData);
    // In production: await API call to save project
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    const typeConfig = contentTypes.find(t => t.id === type);
    return typeConfig ? typeConfig.icon : FileText;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary rounded-xl">
              <PenTool className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">
                Content Studio
              </h1>
              <p className="text-lg text-muted-foreground mt-1">
                AI-powered content creation workspace
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="px-3 py-1">
              <Sparkles className="w-4 h-4 mr-1" />
              AI Enhanced
            </Badge>
            <Avatar className="w-10 h-10">
              <AvatarImage src={user?.profileImageUrl} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user?.displayName?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4 bg-background shadow-lg">
            <TabsTrigger value="create" className="gap-2">
              <Wand2 className="w-4 h-4" />
              Create
            </TabsTrigger>
            <TabsTrigger value="edit" className="gap-2">
              <PenTool className="w-4 h-4" />
              Edit
            </TabsTrigger>
            <TabsTrigger value="projects" className="gap-2">
              <FileText className="w-4 h-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Create Tab */}
          <TabsContent value="create" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Content Type Selection */}
              <div className="lg:col-span-1 space-y-6">
                <Card className="border-0 shadow-lg bg-card/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      Content Types
                    </CardTitle>
                    <CardDescription>
                      Choose what you want to create
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {contentTypes.map((type) => {
                      const IconComponent = type.icon;
                      return (
                        <div
                          key={type.id}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                            selectedContentType === type.id
                              ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-md'
                              : 'border-border hover:border-primary/50 hover:bg-primary/5 dark:hover:bg-primary/5'
                          }`}
                          onClick={() => setSelectedContentType(type.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-primary">
                              <IconComponent className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-sm">{type.title}</h3>
                              <p className="text-xs text-muted-foreground mt-1">{type.description}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {type.estimatedTime}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          
                          {selectedContentType === type.id && (
                            <div className="mt-3 pt-3 border-t border-primary/20">
                              <div className="space-y-2">
                                <p className="text-xs font-medium text-primary/70">Features:</p>
                                <div className="flex flex-wrap gap-1">
                                  {type.features.map((feature, idx) => (
                                    <Badge key={idx} variant="secondary" className="text-xs">
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                {/* AI Suggestions */}
                <Card className="border-0 shadow-lg bg-muted border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Lightbulb className="w-5 h-5" />
                      AI Suggestions
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Trending content ideas for you
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {aiSuggestions.map((suggestion) => (
                      <div
                        key={suggestion.id}
                        className="p-3 bg-muted rounded-lg border border-border cursor-pointer hover:bg-accent transition-colors"
                        onClick={() => {
                          setSelectedContentType(suggestion.type);
                          setContentPrompt(suggestion.title);
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant={suggestion.trending ? "secondary" : "outline"} className="text-xs">
                                {suggestion.trending ? (
                                  <>
                                    <TrendingUp className="w-3 h-3 mr-1" />
                                    Trending
                                  </>
                                ) : (
                                  suggestion.type
                                )}
                              </Badge>
                              <span className="text-xs text-primary font-medium">
                                {suggestion.estimatedEngagement}% engagement
                              </span>
                            </div>
                            <p className="text-sm font-medium text-foreground">
                              {suggestion.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Difficulty: {suggestion.difficulty}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <Wand2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* AI Generation Interface */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-0 shadow-lg bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      AI Content Generator
                    </CardTitle>
                    <CardDescription>
                      Describe your content idea and let AI create it for you
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Content Title/Topic</label>
                        <Input
                          placeholder="What do you want to create? Be specific about your topic, audience, and goals..."
                          value={contentPrompt}
                          onChange={(e) => setContentPrompt(e.target.value)}
                          className="text-base"
                        />
                      </div>
                      
                      {selectedContentType && (
                        <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                          <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-primary">
                              {React.createElement(getTypeIcon(selectedContentType), { className: "w-4 h-4 text-primary-foreground" })}
                            </div>
                            <span className="font-medium">{contentTypes.find(t => t.id === selectedContentType)?.title}</span>
                          </div>
                          <Badge variant="outline">
                            Max {contentTypes.find(t => t.id === selectedContentType)?.maxLength} words
                          </Badge>
                        </div>
                      )}
                      
                      <Button 
                        onClick={() => generateContent()}
                        disabled={!contentPrompt.trim() || !selectedContentType || isGenerating}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                        size="lg"
                      >
                        {isGenerating ? (
                          <>
                            <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                            AI is creating your content...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5 mr-2" />
                            Generate with AI
                          </>
                        )}
                      </Button>
                    </div>

                    {generatedContent && (
                      <div className="space-y-4 pt-6 border-t">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            Generated Content
                          </h3>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => setGeneratedContent('')}>
                              <RefreshCw className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={useGeneratedContent}>
                              <Copy className="w-4 h-4 mr-2" />
                              Use Content
                            </Button>
                          </div>
                        </div>
                        
                        <div className="bg-muted rounded-lg p-4 max-h-96 overflow-y-auto">
                          <pre className="whitespace-pre-wrap text-sm font-sans text-gray-800 dark:text-gray-200">
                            {generatedContent}
                          </pre>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Content Stats */}
                {(content || generatedContent) && (
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" />
                        Content Analytics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{contentStats.words}</div>
                          <div className="text-xs text-muted-foreground">Words</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{contentStats.readTime}</div>
                          <div className="text-xs text-muted-foreground">Min Read</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{contentStats.characters}</div>
                          <div className="text-xs text-muted-foreground">Characters</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-lg font-medium ${getSentimentColor(contentStats.sentiment)}`}>
                            {contentStats.sentiment.charAt(0).toUpperCase() + contentStats.sentiment.slice(1)}
                          </div>
                          <div className="text-xs text-muted-foreground">Sentiment</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Edit Tab */}
          <TabsContent value="edit" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-lg h-[600px] flex flex-col">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Content Editor</CardTitle>
                        <CardDescription>Edit and refine your content</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={saveProject}>
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col space-y-4">
                    <Input
                      placeholder="Enter content title..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="text-lg font-medium"
                    />
                    <Textarea
                      placeholder="Start writing or paste your content here..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="flex-1 resize-none text-base leading-relaxed"
                    />
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                {/* AI Writing Tools */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wand2 className="w-5 h-5" />
                      AI Tools
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Sparkles className="w-4 h-4" />
                      Improve Writing
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Target className="w-4 h-4" />
                      Change Tone
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <TrendingUp className="w-4 h-4" />
                      SEO Optimize
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Globe className="w-4 h-4" />
                      Translate
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Hash className="w-4 h-4" />
                      Add Hashtags
                    </Button>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Copy className="w-4 h-4" />
                      Copy to Clipboard
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Share2 className="w-4 h-4" />
                      Share Preview
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Calendar className="w-4 h-4" />
                      Schedule Post
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Recent Projects
                </CardTitle>
                <CardDescription>
                  Your content creation history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {recentProjects.map((project) => {
                    const IconComponent = getTypeIcon(project.type);
                    return (
                      <div key={project.id} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-primary rounded-lg">
                              <IconComponent className="w-4 h-4 text-primary-foreground" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{project.title}</h3>
                              <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                                <span>{contentTypes.find(t => t.id === project.type)?.title}</span>
                                <span>{project.wordCount} words</span>
                                <span>{project.lastEdited.toRelativeTimeString ? project.lastEdited.toRelativeTimeString() : 'Recently'}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={
                              project.status === 'published' ? 'default' :
                              project.status === 'scheduled' ? 'secondary' : 'outline'
                            }>
                              {project.status}
                            </Badge>
                            <div className="text-right text-sm">
                              <div className="text-primary font-medium">{project.engagement}%</div>
                              <div className="text-xs text-muted-foreground">engagement</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-0 shadow-lg bg-primary text-primary-foreground">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-primary-foreground/80 text-sm font-medium">Total Content</p>
                      <p className="text-3xl font-bold">247</p>
                    </div>
                    <FileText className="w-8 h-8 text-primary-foreground/80" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg bg-secondary text-secondary-foreground">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-secondary-foreground/80 text-sm font-medium">Avg Engagement</p>
                      <p className="text-3xl font-bold">87%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-secondary-foreground/80" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg bg-accent text-accent-foreground">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-accent-foreground/80 text-sm font-medium">Words Written</p>
                      <p className="text-3xl font-bold">125K</p>
                    </div>
                    <PenTool className="w-8 h-8 text-accent-foreground/80" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg bg-muted text-muted-foreground">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground/80 text-sm font-medium">Time Saved</p>
                      <p className="text-3xl font-bold">342h</p>
                    </div>
                    <Clock className="w-8 h-8 text-muted-foreground/80" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
