"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Wand2, 
  Sparkles, 
  RefreshCw, 
  Copy, 
  Eye, 
  TrendingUp, 
  Target, 
  Globe,
  Hash,
  MessageSquare,
  FileText,
  Lightbulb,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface AIWritingAssistantProps {
  content: string;
  onContentUpdate: (newContent: string) => void;
  contentType: string;
}

const AIWritingAssistant: React.FC<AIWritingAssistantProps> = ({
  content,
  onContentUpdate,
  contentType
}) => {
  const [activeTask, setActiveTask] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [taskPrompt, setTaskPrompt] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  
  const aiTasks = [
    {
      id: 'improve',
      title: 'Improve Writing',
      description: 'Enhance clarity, flow, and readability',
      icon: Sparkles,
      color: 'text-purple-500'
    },
    {
      id: 'tone',
      title: 'Change Tone',
      description: 'Adjust the writing tone and style',
      icon: Target,
      color: 'text-blue-500'
    },
    {
      id: 'seo',
      title: 'SEO Optimize',
      description: 'Optimize for search engines',
      icon: TrendingUp,
      color: 'text-green-500'
    },
    {
      id: 'expand',
      title: 'Expand Content',
      description: 'Add more details and depth',
      icon: FileText,
      color: 'text-orange-500'
    },
    {
      id: 'summarize',
      title: 'Summarize',
      description: 'Create a concise summary',
      icon: Eye,
      color: 'text-indigo-500'
    },
    {
      id: 'translate',
      title: 'Translate',
      description: 'Translate to different languages',
      icon: Globe,
      color: 'text-cyan-500'
    },
    {
      id: 'hashtags',
      title: 'Add Hashtags',
      description: 'Generate relevant hashtags',
      icon: Hash,
      color: 'text-pink-500'
    },
    {
      id: 'proofread',
      title: 'Proofread',
      description: 'Check grammar and spelling',
      icon: CheckCircle,
      color: 'text-emerald-500'
    }
  ];

  const toneOptions = [
    'Professional',
    'Casual',
    'Friendly',
    'Authoritative',
    'Conversational',
    'Formal',
    'Humorous',
    'Persuasive'
  ];

  const languageOptions = [
    'Spanish',
    'French',
    'German',
    'Italian',
    'Portuguese',
    'Chinese',
    'Japanese',
    'Korean'
  ];

  const processWithAI = async (taskId: string, additionalPrompt: string = '') => {
    if (!content.trim()) {
      alert('Please add some content first');
      return;
    }

    setIsProcessing(true);
    setActiveTask(taskId);

    try {
      let prompt = '';
      
      switch (taskId) {
        case 'improve':
          prompt = `Improve the following ${contentType} content by enhancing clarity, flow, and readability. Make it more engaging and professional: ${content}`;
          break;
        case 'tone':
          prompt = `Rewrite the following ${contentType} content in a ${additionalPrompt || 'professional'} tone: ${content}`;
          break;
        case 'seo':
          prompt = `Optimize the following ${contentType} content for SEO. Add relevant keywords, improve headings, and make it search-engine friendly: ${content}`;
          break;
        case 'expand':
          prompt = `Expand the following ${contentType} content with more details, examples, and depth while maintaining the original message: ${content}`;
          break;
        case 'summarize':
          prompt = `Create a concise summary of the following ${contentType} content, capturing the key points: ${content}`;
          break;
        case 'translate':
          prompt = `Translate the following ${contentType} content to ${additionalPrompt || 'Spanish'}: ${content}`;
          break;
        case 'hashtags':
          prompt = `Generate 10 relevant hashtags for the following ${contentType} content: ${content}`;
          break;
        case 'proofread':
          prompt = `Proofread and correct any grammar, spelling, or punctuation errors in the following ${contentType} content: ${content}`;
          break;
        default:
          prompt = `${additionalPrompt || 'Improve'} the following ${contentType} content: ${content}`;
      }

      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          type: contentType,
          tone: additionalPrompt || 'professional'
        })
      });

      const data = await response.json();
      
      if (data.success) {
        if (taskId === 'hashtags') {
          setSuggestions(data.content.split('\n').filter(line => line.trim()));
        } else {
          onContentUpdate(data.content);
        }
      }
    } catch (error) {
      console.error('AI processing failed:', error);
    } finally {
      setIsProcessing(false);
      setActiveTask('');
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-purple-500" />
            AI Writing Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {aiTasks.map((task) => {
              const IconComponent = task.icon;
              const isActive = activeTask === task.id;
              const isDisabled = isProcessing && !isActive;

              return (
                <div key={task.id} className="space-y-2">
                  <Button
                    variant="outline"
                    className={`w-full justify-start gap-2 h-auto p-3 ${
                      isActive ? 'border-purple-300 bg-purple-50 dark:bg-purple-900/20' : ''
                    }`}
                    onClick={() => {
                      if (task.id === 'tone' || task.id === 'translate') {
                        // These tasks need additional input
                        setActiveTask(task.id === activeTask ? '' : task.id);
                      } else {
                        processWithAI(task.id);
                      }
                    }}
                    disabled={isDisabled}
                  >
                    <IconComponent className={`w-4 h-4 ${task.color}`} />
                    <div className="text-left flex-1">
                      <div className="font-medium text-sm">{task.title}</div>
                      <div className="text-xs text-muted-foreground">{task.description}</div>
                    </div>
                    {isActive && isProcessing && (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    )}
                  </Button>

                  {/* Additional options for tone and translate */}
                  {activeTask === task.id && (task.id === 'tone' || task.id === 'translate') && (
                    <div className="ml-6 space-y-3 p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                      <Select value={taskPrompt} onValueChange={setTaskPrompt}>
                        <SelectTrigger>
                          <SelectValue placeholder={
                            task.id === 'tone' ? 'Select tone...' : 'Select language...'
                          } />
                        </SelectTrigger>
                        <SelectContent>
                          {(task.id === 'tone' ? toneOptions : languageOptions).map((option) => (
                            <SelectItem key={option} value={option.toLowerCase()}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        size="sm"
                        onClick={() => processWithAI(task.id, taskPrompt)}
                        disabled={!taskPrompt || isProcessing}
                        className="w-full"
                      >
                        {isProcessing ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 mr-2" />
                            Apply {task.title}
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Custom AI Prompt */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
            <Lightbulb className="w-5 h-5" />
            Custom AI Task
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            placeholder="Tell AI what you want to do with your content... e.g., 'Make it more emotional and compelling' or 'Add statistics and data'"
            value={taskPrompt}
            onChange={(e) => setTaskPrompt(e.target.value)}
            className="min-h-[80px]"
          />
          <Button
            onClick={() => processWithAI('custom', taskPrompt)}
            disabled={!taskPrompt.trim() || isProcessing}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                AI Working...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 mr-2" />
                Process with AI
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Hashtag Suggestions */}
      {suggestions.length > 0 && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hash className="w-5 h-5 text-pink-500" />
              Generated Hashtags
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((hashtag, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="cursor-pointer hover:bg-pink-100 dark:hover:bg-pink-900/20"
                  onClick={() => {
                    navigator.clipboard.writeText(hashtag);
                  }}
                >
                  {hashtag}
                </Badge>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-3"
              onClick={() => {
                const hashtagText = suggestions.join(' ');
                navigator.clipboard.writeText(hashtagText);
              }}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy All Hashtags
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Quick Tips */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
            <MessageSquare className="w-5 h-5" />
            AI Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <p>Use "Improve Writing" for overall content enhancement</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <p>Try different tones to match your brand voice</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <p>SEO optimize before publishing for better reach</p>
            </div>
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
              <p>Always review AI suggestions before using</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIWritingAssistant;