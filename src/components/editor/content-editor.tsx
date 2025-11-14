"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  Save, 
  Download, 
  Copy, 
  Wand2, 
  BarChart3, 
  Eye, 
  Clock, 
  Type,
  Lightbulb,
  RefreshCw,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface ContentStats {
  words: number;
  characters: number;
  paragraphs: number;
  readTime: number;
  sentiment: string;
  readabilityScore?: number;
}

interface ContentEditorProps {
  initialContent?: string;
  contentType?: 'blog' | 'social' | 'email' | 'marketing';
  onSave?: (content: string, title: string) => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ 
  initialContent = '', 
  contentType = 'blog',
  onSave 
}) => {
  const [content, setContent] = useState(initialContent);
  const [title, setTitle] = useState('');
  const [stats, setStats] = useState<ContentStats>({
    words: 0,
    characters: 0,
    paragraphs: 0,
    readTime: 0,
    sentiment: 'neutral'
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [improvements, setImprovements] = useState<string[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    calculateStats();
  }, [content]);

  const calculateStats = () => {
    const words = content.trim() ? content.trim().split(/\s+/).length : 0;
    const characters = content.length;
    const paragraphs = content.split('\n\n').filter(p => p.trim()).length;
    const readTime = Math.ceil(words / 200); // Average reading speed

    // Simple sentiment analysis
    const positiveWords = ['great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'love', 'best'];
    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'worst', 'horrible'];
    const lowerContent = content.toLowerCase();
    
    const positiveCount = positiveWords.filter(word => lowerContent.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerContent.includes(word)).length;
    
    let sentiment = 'neutral';
    if (positiveCount > negativeCount) sentiment = 'positive';
    else if (negativeCount > positiveCount) sentiment = 'negative';

    setStats({
      words,
      characters,
      paragraphs,
      readTime,
      sentiment
    });
  };

  const analyzeContent = async () => {
    if (!content.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/ai/content?action=analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          analysisType: 'all'
        })
      });
      
      const data: any = await response.json();
      if (data.success && data.analysis) {
        const allSuggestions = [
          ...(data.analysis.tone?.suggestions || []),
          ...(data.analysis.readability?.suggestions || []),
          ...(data.analysis.seo?.suggestions || []),
          ...(data.analysis.engagement?.suggestions || [])
        ];
        setImprovements(allSuggestions.slice(0, 5)); // Top 5 suggestions
      }
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const improveContent = async () => {
    if (!content.trim() || improvements.length === 0) return;
    
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/ai/content?action=improve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          improvements: improvements.slice(0, 3) // Use top 3 improvements
        })
      });
      
      const data: any = await response.json();
      if (data.success) {
        setContent(data.improvedContent);
        setImprovements([]); // Clear improvements after applying
      }
    } catch (error) {
      console.error('Improvement failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const saveContent = () => {
    onSave?.(content, title);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
  };

  const downloadContent = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title || 'content'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getContentTypeIcon = () => {
    switch (contentType) {
      case 'blog': return <Type className="w-4 h-4" />;
      case 'social': return <BarChart3 className="w-4 h-4" />;
      case 'email': return <Clock className="w-4 h-4" />;
      case 'marketing': return <Lightbulb className="w-4 h-4" />;
      default: return <Type className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-white to-blue-50 dark:from-slate-800 dark:to-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                {getContentTypeIcon()}
              </div>
              <div>
                <CardTitle className="capitalize">{contentType} Editor</CardTitle>
                <CardDescription>
                  Create and optimize your {contentType} content with AI assistance
                </CardDescription>
              </div>
            </div>
            <Badge variant="secondary" className="capitalize">
              {contentType}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Main Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content Editor */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Enter your content title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-lg font-medium"
                />
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder={`Start writing your ${contentType} content here...

Tips for ${contentType}:
${contentType === 'blog' ? '• Start with a compelling headline\n• Use subheadings to structure your content\n• Include actionable insights' : ''}
${contentType === 'social' ? '• Hook readers in the first line\n• Use emojis and hashtags strategically\n• Include a clear call-to-action' : ''}
${contentType === 'email' ? '• Write a compelling subject line\n• Personalize the greeting\n• Focus on one main message' : ''}
${contentType === 'marketing' ? '• Lead with benefits, not features\n• Include social proof\n• Create urgency with clear CTAs' : ''}`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[400px] resize-none text-base leading-relaxed"
              />
              
              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={analyzeContent}
                    disabled={!content.trim() || isAnalyzing}
                    className="gap-2"
                  >
                    <BarChart3 className="w-4 h-4" />
                    {isAnalyzing ? 'Analyzing...' : 'AI Analysis'}
                  </Button>
                  
                  {improvements.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={improveContent}
                      disabled={isAnalyzing}
                      className="gap-2 text-blue-600"
                    >
                      <Wand2 className="w-4 h-4" />
                      Apply AI Improvements
                    </Button>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyToClipboard}
                    className="gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={downloadContent}
                    className="gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                  
                  <Button
                    onClick={saveContent}
                    className="gap-2"
                    disabled={!content.trim() || !title.trim()}
                  >
                    {isSaved ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Saved!
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Stats & Improvements */}
        <div className="space-y-6">
          {/* Content Stats */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Content Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.words}</div>
                  <div className="text-xs text-muted-foreground">Words</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{stats.readTime}</div>
                  <div className="text-xs text-muted-foreground">Min Read</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{stats.characters}</div>
                  <div className="text-xs text-muted-foreground">Characters</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{stats.paragraphs}</div>
                  <div className="text-xs text-muted-foreground">Paragraphs</div>
                </div>
              </div>
              
              <Separator />
              
              <div className="text-center">
                <div className={`text-lg font-medium ${getSentimentColor(stats.sentiment)}`}>
                  {stats.sentiment.charAt(0).toUpperCase() + stats.sentiment.slice(1)} Tone
                </div>
                <div className="text-xs text-muted-foreground">Overall sentiment</div>
              </div>
            </CardContent>
          </Card>

          {/* AI Improvements */}
          {improvements.length > 0 && (
            <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                  <Lightbulb className="w-5 h-5" />
                  AI Suggestions
                </CardTitle>
                <CardDescription className="text-yellow-700 dark:text-yellow-300">
                  Click "Apply AI Improvements" to enhance your content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {improvements.map((improvement, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        {improvement}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="w-5 h-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={analyzeContent}
                disabled={!content.trim() || isAnalyzing}
              >
                <Eye className="w-4 h-4" />
                Analyze Content
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                disabled={!content.trim()}
              >
                <RefreshCw className="w-4 h-4" />
                Rewrite Content
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                disabled={!content.trim()}
              >
                <BarChart3 className="w-4 h-4" />
                SEO Analysis
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContentEditor;
