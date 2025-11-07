"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  PenTool, 
  FileText, 
  Video, 
  Mic, 
  Mail, 
  Share2,
  Save,
  Wand2,
  Copy,
  Download,
  Eye,
  MoreHorizontal
} from "lucide-react";

export default function StudioPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const contentTemplates = [
    {
      id: "blog-post",
      title: "Blog Post",
      description: "Long-form article with AI assistance",
      icon: FileText,
      color: "bg-blue-500"
    },
    {
      id: "social-post",
      title: "Social Media Post",
      description: "Engaging social media content",
      icon: Share2,
      color: "bg-pink-500"
    },
    {
      id: "video-script",
      title: "Video Script",
      description: "Script for YouTube, TikTok, or other videos",
      icon: Video,
      color: "bg-red-500"
    },
    {
      id: "podcast-outline",
      title: "Podcast Outline",
      description: "Structured podcast episode outline",
      icon: Mic,
      color: "bg-purple-500"
    },
    {
      id: "newsletter",
      title: "Newsletter",
      description: "Email newsletter content",
      icon: Mail,
      color: "bg-green-500"
    },
    {
      id: "product-description",
      title: "Product Description",
      description: "Compelling product descriptions",
      icon: PenTool,
      color: "bg-orange-500"
    }
  ];

  const recentDrafts = [
    {
      id: 1,
      title: "The Future of AI in Content Creation",
      type: "Blog Post",
      lastEdited: "2 hours ago",
      wordCount: 1250,
      status: "draft"
    },
    {
      id: 2, 
      title: "5 Tips for Better Social Media Engagement",
      type: "Social Post",
      lastEdited: "1 day ago",
      wordCount: 150,
      status: "published"
    },
    {
      id: 3,
      title: "How to Create Viral TikTok Content",
      type: "Video Script",
      lastEdited: "3 days ago",
      wordCount: 800,
      status: "draft"
    }
  ];

  const aiFeatures = [
    {
      name: "Smart Rewrite",
      description: "Improve clarity and flow",
      icon: Wand2
    },
    {
      name: "Tone Adjustment",
      description: "Change writing tone",
      icon: PenTool
    },
    {
      name: "SEO Optimize",
      description: "Optimize for search",
      icon: Eye
    },
    {
      name: "Expand Ideas",
      description: "Add more detail",
      icon: FileText
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <PenTool className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Content Studio</h1>
          <p className="text-muted-foreground">Create, edit, and optimize your content with AI assistance</p>
        </div>
      </div>

  <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Template Selection */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Content Templates</CardTitle>
            <CardDescription>Choose a template to get started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 max-h-[60vh] overflow-y-auto">
            {contentTemplates.map((template) => {
              const IconComponent = template.icon;
              return (
                <Button
                  key={template.id}
                  variant={selectedTemplate === template.id ? "default" : "ghost"}
                  className="w-full justify-start h-auto p-3"
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className={`w-8 h-8 rounded-lg ${template.color} flex items-center justify-center mr-3 flex-shrink-0`}>
                    <IconComponent className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-sm">{template.title}</div>
                    <div className="text-xs text-muted-foreground">{template.description}</div>
                  </div>
                </Button>
              );
            })}
          </CardContent>
        </Card>

        {/* Main Editor */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Content Editor</CardTitle>
                <CardDescription>Write and edit your content</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
                <Button size="sm">
                  Publish
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter your content title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg font-medium"
              />
            </div>
            
            <div>
              <Label htmlFor="content">Content</Label>
              <textarea
                id="content"
                placeholder="Start writing your content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-96 p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* AI Tools */}
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">AI Tools</h3>
              <div className="grid grid-cols-2 gap-2">
                {aiFeatures.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <Button key={index} variant="outline" size="sm" className="justify-start">
                      <IconComponent className="h-4 w-4 mr-2" />
                      {feature.name}
                    </Button>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* AI Assistant */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI Assistant</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Wand2 className="h-4 w-4 mr-2" />
                Generate Outline
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Continue Writing
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                SEO Analysis
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Copy className="h-4 w-4 mr-2" />
                Grammar Check
              </Button>
            </CardContent>
          </Card>

          {/* Recent Drafts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Drafts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentDrafts.map((draft) => (
                  <div key={draft.id} className="p-3 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{draft.title}</h4>
                        <div className="flex items-center space-x-2 mt-1 text-xs text-muted-foreground">
                          <span>{draft.type}</span>
                          <span>•</span>
                          <span>{draft.wordCount} words</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{draft.lastEdited}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Export Options */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Export</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download as PDF
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export to WordPress
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Copy className="h-4 w-4 mr-2" />
                Copy to Clipboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
