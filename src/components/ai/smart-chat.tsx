"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Mic, 
  MicOff, 
  Copy, 
  ThumbsUp, 
  ThumbsDown, 
  Sparkles,
  MessageSquare,
  Loader2,
  Wand2
} from 'lucide-react';
import { useUser } from '@stackframe/stack';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  liked?: boolean;
  copied?: boolean;
}

interface SmartChatProps {
  onContentGenerated?: (content: string) => void;
  suggestions?: string[];
}

const SmartChat: React.FC<SmartChatProps> = ({ onContentGenerated, suggestions = [] }) => {
  const user = useUser();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `👋 Hi ${user?.displayName || 'there'}! I'm your AI content assistant. I can help you:

• **Generate** blog posts, social media content, emails, and marketing copy
• **Brainstorm** creative ideas and topics  
• **Improve** existing content for better engagement
• **Analyze** content performance and suggest optimizations
• **Research** trending topics in your industry

What would you like to create today?`,
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickPrompts = [
    "Write a blog post about AI trends in 2024",
    "Create a social media campaign for a product launch",
    "Help me brainstorm content ideas",
    "Improve this email subject line",
    "Generate marketing copy for a new feature"
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!currentMessage.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: `You are a helpful AI content creation assistant. You help users create high-quality content including blog posts, social media posts, emails, and marketing copy. 

Guidelines:
- Be friendly, helpful, and encouraging
- Ask clarifying questions when needed
- Provide actionable, specific advice
- Format responses with proper markdown when appropriate
- If generating content, make it engaging and valuable
- Suggest improvements and optimizations
- Keep responses concise but thorough`
            },
            ...messages.slice(-6).map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: currentMessage }
          ],
          userId: user?.id
        })
      });

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || 'Sorry, I encountered an issue. Please try again.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

      // If the response looks like generated content, offer to use it
      if (data.response && data.response.length > 200) {
        onContentGenerated?.(data.response);
      }

    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '⚠️ Sorry, I encountered a technical issue. Please check your connection and try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const copyMessage = (messageId: string, content: string) => {
    navigator.clipboard.writeText(content);
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, copied: true } : msg
    ));
    
    // Reset copied state after 2 seconds
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, copied: false } : msg
      ));
    }, 2000);
  };

  const likeMessage = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, liked: !msg.liked } : msg
    ));
  };

  const useQuickPrompt = (prompt: string) => {
    setCurrentMessage(prompt);
    inputRef.current?.focus();
  };

  // Mock voice recognition (would need Web Speech API in production)
  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // In a real app, implement Web Speech API here
    if (!isListening) {
      setTimeout(() => setIsListening(false), 3000);
    }
  };

  return (
    <Card className="h-[600px] flex flex-col border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-500" />
          AI Content Assistant
          <Badge variant="secondary" className="ml-auto">
            <Sparkles className="w-3 h-3 mr-1" />
            Smart
          </Badge>
        </CardTitle>
        <CardDescription>
          Chat with AI to generate, improve, and optimize your content
        </CardDescription>
      </CardHeader>

      {/* Quick Prompts */}
      <div className="px-6 pb-4">
        <div className="flex flex-wrap gap-2">
          {quickPrompts.slice(0, 3).map((prompt, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => useQuickPrompt(prompt)}
            >
              <Wand2 className="w-3 h-3 mr-1" />
              {prompt.length > 30 ? prompt.substring(0, 30) + '...' : prompt}
            </Button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <CardContent className="flex-1 overflow-y-auto space-y-4 px-6">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
            {message.role === 'assistant' && (
              <Avatar className="w-8 h-8 mt-1">
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs">
                  AI
                </AvatarFallback>
              </Avatar>
            )}
            
            <div className={`max-w-[80%] ${message.role === 'user' ? 'order-1' : ''}`}>
              <div className={`rounded-lg px-4 py-3 ${
                message.role === 'user' 
                  ? 'bg-blue-500 text-white ml-auto' 
                  : 'bg-gray-100 dark:bg-slate-700'
              }`}>
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  {message.content.split('\n').map((line, i) => (
                    <p key={i} className="mb-2 last:mb-0">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
              
              <div className={`flex items-center gap-2 mt-2 text-xs text-gray-500 ${
                message.role === 'user' ? 'justify-end' : ''
              }`}>
                <span>{message.timestamp.toLocaleTimeString()}</span>
                
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => copyMessage(message.id, message.content)}
                    >
                      <Copy className={`w-3 h-3 ${message.copied ? 'text-green-500' : ''}`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => likeMessage(message.id)}
                    >
                      <ThumbsUp className={`w-3 h-3 ${message.liked ? 'text-green-500' : ''}`} />
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            {message.role === 'user' && (
              <Avatar className="w-8 h-8 mt-1">
                <AvatarImage src={user?.profileImageUrl} />
                <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs">
                  {user?.displayName?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-3">
            <Avatar className="w-8 h-8 mt-1">
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs">
                AI
              </AvatarFallback>
            </Avatar>
            <div className="bg-gray-100 dark:bg-slate-700 rounded-lg px-4 py-3">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm text-gray-600 dark:text-gray-300">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </CardContent>

      {/* Input */}
      <div className="p-6 pt-4 border-t">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Input
              ref={inputRef}
              placeholder="Ask me to create content, brainstorm ideas, or get writing help..."
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isTyping}
              className="pr-10"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              onClick={toggleVoiceInput}
            >
              {isListening ? (
                <MicOff className="w-4 h-4 text-red-500" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </Button>
          </div>
          <Button 
            onClick={sendMessage} 
            disabled={!currentMessage.trim() || isTyping}
            className="px-3"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        {isListening && (
          <div className="mt-2 text-sm text-red-500 flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            Listening... (Voice input simulation)
          </div>
        )}
      </div>
    </Card>
  );
};

export default SmartChat;