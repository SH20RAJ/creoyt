'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Zap, TrendingUp, FileText, BarChart3 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

interface QuotaInfo {
  hasQuota: boolean;
  tokensUsed: number;
  tokensLimit: number;
  tokensRemaining: number;
  subscriptionTier: string;
  resetDate: string;
}

const AIDashboard: React.FC = () => {
  // State management
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [quotaInfo, setQuotaInfo] = useState<QuotaInfo | null>(null);
  const [contentType, setContentType] = useState('blog_post');
  const [topic, setTopic] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [analyzeContent, setAnalyzeContent] = useState('');
  const [analysisResult, setAnalysisResult] = useState<Record<string, unknown> | null>(null);

  // Demo user ID for testing
  const userId = 'demo-user-123';

  // Load quota information on component mount
  useEffect(() => {
    loadQuotaInfo();
  }, []);

  const loadQuotaInfo = async () => {
    try {
      const response = await fetch(`/api/ai/quota?userId=${userId}`);
      const data = await response.json() as QuotaInfo;
      setQuotaInfo(data);
    } catch (error) {
      console.error('Failed to load quota info:', error);
    }
  };

  const sendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: currentMessage,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })),
          userId
        })
      });

      const data = await response.json() as { response: string };

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || 'Sorry, I could not process your request.',
        timestamp: Date.now() + 1
      };

      setMessages(prev => [...prev, aiMessage]);
      loadQuotaInfo(); // Update quota after usage
    } catch (error) {
      console.error('Failed to send message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, there was an error processing your request.',
        timestamp: Date.now() + 1
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateAIContent = async () => {
    if (!topic.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/ai/content?action=generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentType,
          topic,
          userId
        })
      });

      const data = await response.json() as { content: string };
      setGeneratedContent(data.content || 'Failed to generate content');
      loadQuotaInfo();
    } catch (error) {
      console.error('Failed to generate content:', error);
      setGeneratedContent('Error generating content');
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeAIContent = async () => {
    if (!analyzeContent.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/ai/content?action=analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: analyzeContent,
          analysisType: 'all',
          userId
        })
      });

      const data = await response.json() as { analysis: Record<string, unknown> };
      setAnalysisResult(data.analysis);
      loadQuotaInfo();
    } catch (error) {
      console.error('Failed to analyze content:', error);
      setAnalysisResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const quotaPercentage = quotaInfo ? (quotaInfo.tokensUsed / quotaInfo.tokensLimit) * 100 : 0;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">AI Content Dashboard</h1>
          <p className="text-muted-foreground">Create, analyze, and optimize content with Llama 3.1</p>
        </div>
        
        {/* Quota Display */}
        {quotaInfo && (
          <Card className="w-80">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Usage Quota
                <Badge variant={quotaInfo.hasQuota ? "default" : "destructive"}>
                  {quotaInfo.subscriptionTier}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={quotaPercentage} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  {quotaInfo.tokensUsed.toLocaleString()} / {quotaInfo.tokensLimit.toLocaleString()} tokens used
                </div>
                <div className="text-xs">
                  {quotaInfo.tokensRemaining.toLocaleString()} tokens remaining
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="chat" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            AI Chat
          </TabsTrigger>
          <TabsTrigger value="generate" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Generate
          </TabsTrigger>
          <TabsTrigger value="analyze" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Analyze
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Insights
          </TabsTrigger>
        </TabsList>

        {/* AI Chat Tab */}
        <TabsContent value="chat">
          <Card>
            <CardHeader>
              <CardTitle>AI Chat Assistant</CardTitle>
              <CardDescription>
                Chat with Llama 3.1 for content creation assistance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Messages Area */}
              <div className="h-96 overflow-y-auto border rounded-lg p-4 bg-muted/10">
                {messages.length === 0 ? (
                  <div className="text-center text-muted-foreground py-20">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Start a conversation with the AI assistant</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${ 
                            message.role === 'user' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-muted max-w-xs px-4 py-2 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Message Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  disabled={isLoading}
                />
                <Button onClick={sendMessage} disabled={isLoading || !currentMessage.trim()}>
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Generation Tab */}
        <TabsContent value="generate">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Generate Content</CardTitle>
                <CardDescription>
                  Create AI-powered content for various purposes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Content Type</label>
                  <Select value={contentType} onValueChange={setContentType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blog_post">Blog Post</SelectItem>
                      <SelectItem value="social_media">Social Media</SelectItem>
                      <SelectItem value="marketing_copy">Marketing Copy</SelectItem>
                      <SelectItem value="email_campaign">Email Campaign</SelectItem>
                      <SelectItem value="product_description">Product Description</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Topic</label>
                  <Input
                    placeholder="Enter your topic..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>

                <Button 
                  onClick={generateAIContent}
                  disabled={isLoading || !topic.trim()}
                  className="w-full"
                >
                  {isLoading ? 'Generating...' : 'Generate Content'}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Generated Content</CardTitle>
                <CardDescription>
                  AI-generated content will appear here
                </CardDescription>
              </CardHeader>
              <CardContent>
                {generatedContent ? (
                  <Textarea
                    value={generatedContent}
                    onChange={(e) => setGeneratedContent(e.target.value)}
                    className="min-h-96 font-mono text-sm"
                    placeholder="Generated content will appear here..."
                  />
                ) : (
                  <div className="text-center text-muted-foreground py-20">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Generate content to see results here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Content Analysis Tab */}
        <TabsContent value="analyze">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Analyze Content</CardTitle>
                <CardDescription>
                  Get AI-powered insights on your content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Content to Analyze</label>
                  <Textarea
                    placeholder="Paste your content here for analysis..."
                    value={analyzeContent}
                    onChange={(e) => setAnalyzeContent(e.target.value)}
                    className="min-h-48"
                  />
                </div>

                <Button 
                  onClick={analyzeAIContent}
                  disabled={isLoading || !analyzeContent.trim()}
                  className="w-full"
                >
                  {isLoading ? 'Analyzing...' : 'Analyze Content'}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Analysis Results</CardTitle>
                <CardDescription>
                  Detailed content analysis and recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                {analysisResult ? (
                  <div className="space-y-4">
                    <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto">
                      {JSON.stringify(analysisResult, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-20">
                    <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Analyze content to see insights here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 from last week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Content Generated</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-muted-foreground">+12 from last week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Quality Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87</div>
                <p className="text-xs text-muted-foreground">+5% from last week</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Usage Analytics</CardTitle>
              <CardDescription>
                Your AI usage patterns and productivity metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-20">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Detailed analytics coming soon...</p>
                <p className="text-sm mt-2">Track your content performance, AI usage patterns, and productivity metrics.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIDashboard;
