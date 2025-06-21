"use client";
export const runtime = 'edge';


import { useState } from "react";
import ReactMarkdown from 'react-markdown';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Bot, Send, User, Brain, TrendingUp, Target, Users } from "lucide-react";

export default function ChatBot({props}) {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "Hi! I'm CreoYT AI Assistant. How can I help you grow your YouTube channel today? Try clicking on the suggested topics below to get started!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const suggestedTopics = [
    {
      icon: <TrendingUp className="w-4 h-4" />,
      text: "How to increase my YouTube channel's engagement rate?",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: <Target className="w-4 h-4" />,
      text: "What are the best practices for YouTube SEO in 2024?",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: <Brain className="w-4 h-4" />,
      text: "Generate video ideas for my tech channel",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: <Users className="w-4 h-4" />,
      text: "How to grow my subscriber base organically?",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Get previous messages for context (excluding the initial bot greeting)
      const contextMessages = messages.slice(1).map(msg => msg.content).join("\n");
      
      const response = await fetch('/api/scout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          context: contextMessages // Send conversation history
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      const botResponse = {
        role: "bot",
        content: data.content,
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        role: "bot", 
        content: "I apologize, but I'm having trouble processing your request. Please try again."
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const MessageContent = ({ content, isUser }) => {
    return isUser ? (
      <p className="text-sm leading-relaxed">{content}</p>
    ) : (
      <ReactMarkdown 
        className="text-sm leading-relaxed prose prose-sm dark:prose-invert max-w-none"
        components={{
          // Style markdown elements
          h1: ({node, ...props}) => <h1 className="text-xl font-bold my-2" {...props}/>,
          h2: ({node, ...props}) => <h2 className="text-lg font-bold my-2" {...props}/>,
          h3: ({node, ...props}) => <h3 className="text-md font-bold my-2" {...props}/>,
          ul: ({node, ...props}) => <ul className="list-disc ml-4 my-2" {...props}/>,
          ol: ({node, ...props}) => <ol className="list-decimal ml-4 my-2" {...props}/>,
          li: ({node, ...props}) => <li className="my-1" {...props}/>,
          code: ({node, ...props}) => <code className="bg-muted px-1 py-0.5 rounded" {...props}/>,
        }}
      >
        {content}
      </ReactMarkdown>
    );
  };

  return (
    <div className="h-screen flex" {...props}>
      <Card className="flex-1 rounded-none border-0 shadow-none">
        <CardHeader className="border-b bg-card px-6 py-4 sticky top-0 z-10">
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary" />
            <div>
              <h2 className="text-lg font-bold">CreoYT AI Assistant</h2>
              <p className="text-xs text-muted-foreground">Powered by advanced AI</p>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0 h-[80vh]">
          <ScrollArea className="flex-1 px-6 py-4">
            <div className="space-y-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 ${
                    message.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <Avatar className={`w-8 h-8 ${message.role === "bot" ? "bg-primary/10" : "bg-muted"}`}>
                    {message.role === "bot" ? (
                      <Bot className="w-5 h-5 text-primary" />
                    ) : (
                      <User className="w-5 h-5" />
                    )}
                  </Avatar>
                  <div
                    className={`rounded-lg p-4 max-w-[80%] ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <MessageContent 
                      content={message.content} 
                      isUser={message.role === "user"} 
                    />
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Bot className="w-5 h-5 animate-pulse text-primary" />
                  <span className="text-sm">AI is thinking...</span>
                </div>
              )}
            </div>

            {messages.length === 1 && (
              <div className="mt-8">
                <h3 className="text-sm font-medium text-muted-foreground mb-4">Suggested Topics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {suggestedTopics.map((topic, index) => (
                    <button
                      key={index}
                      onClick={() => setInput(topic.text)}
                      className={`flex items-center gap-2 p-4 rounded-lg text-left transition-all hover:scale-[1.02] ${topic.bgColor} ${topic.color}`}
                    >
                      <span className="shrink-0">{topic.icon}</span>
                      <span className="text-sm font-medium">{topic.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </ScrollArea>

          <div className="border-t bg-background p-4 sticky bottom-0">
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 max-w-4xl mx-auto"
            >
              <Input
                placeholder="Ask about YouTube growth strategies..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                <Send className="w-4 h-4 mr-2" />
                Send
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
