"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  FileText, 
  Share2, 
  Mail, 
  TrendingUp, 
  Video, 
  Mic, 
  Image as ImageIcon,
  Calendar,
  Search,
  Filter,
  Clock,
  Users,
  Zap,
  Star,
  Sparkles
} from 'lucide-react';

interface ContentTemplatesProps {
  onSelectTemplate: (template: any) => void;
  selectedType?: string;
}

const ContentTemplates: React.FC<ContentTemplatesProps> = ({ 
  onSelectTemplate, 
  selectedType 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const templates = [
    // Blog Post Templates
    {
      id: 'how-to-guide',
      title: 'How-To Guide',
      description: 'Step-by-step instructional content',
      category: 'blog',
      icon: FileText,
      gradient: 'from-blue-500 to-blue-600',
      difficulty: 'Medium',
      estimatedTime: '20-30 min',
      engagement: 92,
      trending: true,
      template: `# How to [Your Topic]: A Complete Guide

## Introduction
Brief introduction to what readers will learn and why it's important.

## What You'll Need
- List required tools/materials
- Prerequisites or skills needed

## Step 1: [First Step]
Detailed explanation of the first step...

## Step 2: [Second Step]  
Continue with clear, actionable steps...

## Common Mistakes to Avoid
- Mistake 1 and how to prevent it
- Mistake 2 and solution

## Conclusion
Summarize key takeaways and next steps.`,
      prompts: [
        'How to start a successful online business',
        'How to create engaging social media content',
        'How to optimize your website for SEO'
      ]
    },
    {
      id: 'list-article',
      title: 'Listicle Article',
      description: 'Numbered list format for easy reading',
      category: 'blog',
      icon: FileText,
      gradient: 'from-green-500 to-green-600',
      difficulty: 'Easy',
      estimatedTime: '15-25 min',
      engagement: 88,
      trending: false,
      template: `# [Number] [Topic] That Will [Benefit]

## Introduction
Hook readers with why this list matters.

## 1. [First Item]
Explanation and details about first item...

## 2. [Second Item]
Continue with each list item...

## 3. [Third Item]
Keep consistent structure...

## Key Takeaways
Summarize the most important points.`,
      prompts: [
        '10 productivity apps that will change your life',
        '7 marketing trends to watch in 2024',
        '5 mistakes new entrepreneurs make'
      ]
    },
    
    // Social Media Templates
    {
      id: 'engagement-post',
      title: 'Engagement Post',
      description: 'Drive likes, comments, and shares',
      category: 'social',
      icon: Share2,
      gradient: 'from-pink-500 to-rose-500',
      difficulty: 'Easy',
      estimatedTime: '5-10 min',
      engagement: 95,
      trending: true,
      template: `🔥 [Attention-grabbing opening]

[Main content with value/insight]

💡 Pro tip: [Actionable advice]

What's your experience with [topic]? Drop it below! 👇

#hashtag1 #hashtag2 #hashtag3`,
      prompts: [
        'Share your biggest productivity win this week',
        'What\'s your favorite content creation tool?',
        'Monday motivation: What drives you?'
      ]
    },
    {
      id: 'carousel-post',
      title: 'Carousel Post',
      description: 'Multi-slide educational content',
      category: 'social',
      icon: ImageIcon,
      gradient: 'from-purple-500 to-violet-500',
      difficulty: 'Medium',
      estimatedTime: '15-20 min',
      engagement: 91,
      trending: true,
      template: `Slide 1: 🎯 [Hook/Title]
Did you know [surprising fact]?

Slide 2: 💡 Point #1
[First key insight]

Slide 3: ⚡ Point #2
[Second key insight]

Slide 4: 🚀 Point #3
[Third key insight]

Slide 5: ✅ Summary
Key takeaways and CTA`,
      prompts: [
        '5 AI tools every content creator needs',
        'The anatomy of a viral post',
        'Content creation workflow in 2024'
      ]
    },

    // Email Templates  
    {
      id: 'welcome-series',
      title: 'Welcome Email Series',
      description: 'Onboard new subscribers effectively',
      category: 'email',
      icon: Mail,
      gradient: 'from-emerald-500 to-green-500',
      difficulty: 'Medium',
      estimatedTime: '25-35 min',
      engagement: 89,
      trending: false,
      template: `Subject: Welcome to [Company] - Let's get started! 🎉

Hi [First Name],

Welcome to the [Company] family! I'm thrilled you've joined [number] other [audience] who are [achieving goal].

Over the next few days, I'll share:
→ [Benefit 1]
→ [Benefit 2]  
→ [Benefit 3]

But first, here's [immediate value/freebie]:
[Link or resource]

Looking forward to helping you [achieve goal]!

Best,
[Name]

P.S. Hit reply and tell me - what's your biggest challenge with [topic]?`,
      prompts: [
        'Welcome new subscribers to your newsletter',
        'Onboard customers to your SaaS platform',
        'Introduce new members to your community'
      ]
    },
    {
      id: 'promotional-email',
      title: 'Promotional Email',
      description: 'Drive sales and conversions',
      category: 'email',
      icon: TrendingUp,
      gradient: 'from-orange-500 to-red-500',
      difficulty: 'Hard',
      estimatedTime: '20-30 min',
      engagement: 85,
      trending: false,
      template: `Subject: [Urgency] - [Benefit] ends [deadline]

Hi [First Name],

[Pain point/problem statement]

That's exactly why I created [solution].

✅ [Benefit 1]
✅ [Benefit 2]  
✅ [Benefit 3]

[Social proof/testimonial]

⏰ Limited time: [Offer details]

[CTA Button: Get [Product] Now]

Questions? Just reply to this email.

[Name]`,
      prompts: [
        'Promote a limited-time discount',
        'Launch announcement for new product',
        'Re-engagement campaign for inactive users'
      ]
    },

    // Video Script Templates
    {
      id: 'tutorial-script',
      title: 'Tutorial Script',
      description: 'Educational video content',
      category: 'video',
      icon: Video,
      gradient: 'from-red-500 to-orange-500',
      difficulty: 'Medium',
      estimatedTime: '30-40 min',
      engagement: 90,
      trending: true,
      template: `[HOOK - 0:00-0:05]
Quick compelling opener that promises value

[INTRO - 0:05-0:15]  
"In this video, you'll learn..."
Brief outline of what's covered

[MAIN CONTENT - 0:15-2:30]
Step 1: [Action]
- Show on screen
- Explain why it matters

Step 2: [Action]
- Demonstrate clearly
- Common mistakes to avoid

Step 3: [Action]  
- Final step
- Results to expect

[CTA - 2:30-2:45]
"If this helped, subscribe for more [topic] content"
"Drop your questions below"

[END SCREEN - 2:45-3:00]
Related videos/playlists`,
      prompts: [
        'How to edit videos like a pro',
        'Setting up your home office for productivity',
        'Creating engaging TikTok content'
      ]
    },

    // Podcast Templates
    {
      id: 'interview-script',
      title: 'Interview Script',
      description: 'Guest interview structure',
      category: 'podcast',
      icon: Mic,
      gradient: 'from-indigo-500 to-blue-500',
      difficulty: 'Medium',
      estimatedTime: '25-35 min',
      engagement: 87,
      trending: false,
      template: `[INTRO MUSIC - 0:30]

[HOST INTRO - 0:30-1:00]
"Welcome to [Podcast Name], I'm [Host]..."

[GUEST INTRO - 1:00-2:00]  
"Today's guest is [Name], [credentials/achievements]"

[MAIN INTERVIEW - 2:00-35:00]

Opening Questions:
1. Tell us about your journey into [field]
2. What's your biggest lesson learned?
3. [Industry-specific question]

Deep Dive Questions:  
4. Walk us through [process/strategy]
5. What would you do differently?
6. Advice for beginners?

[RAPID FIRE - 35:00-38:00]
Quick personal questions

[WRAP UP - 38:00-40:00]
Where can people find you?
Final thoughts?

[OUTRO - 40:00-41:00]
Thank guest, preview next episode`,
      prompts: [
        'Interview with a successful entrepreneur',
        'Expert discussing industry trends',
        'Creator sharing their journey'
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Templates', count: templates.length },
    { id: 'blog', label: 'Blog Posts', count: templates.filter(t => t.category === 'blog').length },
    { id: 'social', label: 'Social Media', count: templates.filter(t => t.category === 'social').length },
    { id: 'email', label: 'Email', count: templates.filter(t => t.category === 'email').length },
    { id: 'video', label: 'Video Scripts', count: templates.filter(t => t.category === 'video').length },
    { id: 'podcast', label: 'Podcast', count: templates.filter(t => t.category === 'podcast').length }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSelectedType = !selectedType || template.category === selectedType;
    
    return matchesSearch && matchesCategory && matchesSelectedType;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'hard': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            Content Templates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="gap-2"
              >
                {category.label}
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTemplates.map((template) => {
          const IconComponent = template.icon;
          return (
            <Card 
              key={template.id}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm"
              onClick={() => onSelectTemplate(template)}
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${template.gradient}`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold group-hover:text-purple-600 transition-colors">
                          {template.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {template.description}
                        </p>
                      </div>
                    </div>
                    
                    {template.trending && (
                      <Badge variant="destructive" className="text-xs gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Hot
                      </Badge>
                    )}
                  </div>

                  {/* Metrics */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {template.estimatedTime}
                      </div>
                      <div className={`font-medium ${getDifficultyColor(template.difficulty)}`}>
                        {template.difficulty}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500" />
                      <span className="text-green-600 font-medium">{template.engagement}%</span>
                    </div>
                  </div>

                  {/* Sample Prompts */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Popular Ideas:
                    </p>
                    <div className="space-y-1">
                      {template.prompts.slice(0, 2).map((prompt, index) => (
                        <div key={index} className="text-xs text-muted-foreground bg-gray-50 dark:bg-slate-700 px-2 py-1 rounded">
                          "{prompt}"
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    size="sm"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Use Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No templates found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentTemplates;