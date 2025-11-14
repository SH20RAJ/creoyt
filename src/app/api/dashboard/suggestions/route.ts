import { NextRequest, NextResponse } from 'next/server';
import { OpenAIService } from '@/lib/ai/openai-service';

export async function POST(request: NextRequest) {
  try {
    const { userId } = (await request.json()) as any;
    
    if (!OpenAIService.isConfigured()) {
      // Return fallback suggestions if OpenAI is not configured
      return NextResponse.json({
        suggestions: getFallbackSuggestions()
      });
    }

    const openaiService = new OpenAIService();

    // Generate personalized content suggestions using AI
    const prompt = `Generate 6 creative and trending content ideas for a content creator. 
    Each idea should be:
    - Relevant to current trends and interests
    - Suitable for different content types (blog, social media, email, marketing)
    - Engaging and valuable to audiences
    - Actionable and specific
    
    Return the response as a JSON array with this structure:
    {
      "suggestions": [
        {
          "title": "specific title",
          "type": "blog|social|email|marketing",
          "description": "brief description of what the content would cover",
          "trending": true/false,
          "engagement": 75-95 (predicted engagement percentage)
        }
      ]
    }
    
    Make sure the ideas are diverse, current, and would perform well with audiences in 2024.`;

    const messages = [
      {
        role: 'system' as const,
        content: 'You are a content strategy expert who generates high-performing content ideas. Always return valid JSON format.'
      },
      {
        role: 'user' as const,
        content: prompt
      }
    ];

    const response = await openaiService.generateContent(messages, {
      maxTokens: 1000,
      temperature: 0.8,
      model: 'gpt-3.5-turbo'
    });

    let suggestions;
    try {
      const content = response.choices[0]?.message?.content || '{}';
      const parsed = JSON.parse(content);
      suggestions = parsed.suggestions || getFallbackSuggestions();
    } catch (parseError) {
      console.warn('Failed to parse AI suggestions, using fallback');
      suggestions = getFallbackSuggestions();
    }

    // Add IDs to suggestions
    const suggestionsWithIds = suggestions.map((suggestion: any, index: number) => ({
      id: `ai-${Date.now()}-${index}`,
      ...suggestion
    }));

    return NextResponse.json({
      suggestions: suggestionsWithIds,
      generated: true,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Suggestions API Error:', error);
    
    return NextResponse.json({
      suggestions: getFallbackSuggestions(),
      generated: false,
      error: 'AI suggestions unavailable, showing curated ideas'
    });
  }
}

function getFallbackSuggestions() {
  return [
    {
      id: '1',
      title: 'Top 10 AI Tools Revolutionizing Content Creation in 2024',
      type: 'blog',
      description: 'Comprehensive review of the latest AI tools that are changing how creators work',
      trending: true,
      engagement: 92
    },
    {
      id: '2',
      title: '🚀 Just discovered the secret to viral content...',
      type: 'social',
      description: 'Engaging hook about content creation strategies that drive engagement',
      trending: true,
      engagement: 87
    },
    {
      id: '3',
      title: 'Welcome to the Future of Content - Your First Steps',
      type: 'email',
      description: 'Onboarding email series introducing users to AI-powered content creation',
      engagement: 78
    },
    {
      id: '4',
      title: 'Stop Wasting Hours on Content - Automate Everything',
      type: 'marketing',
      description: 'Sales copy highlighting the time-saving benefits of AI content tools',
      engagement: 85
    },
    {
      id: '5',
      title: 'The Psychology Behind Viral Social Media Posts',
      type: 'blog',
      description: 'Deep dive into what makes content shareable and engaging',
      trending: true,
      engagement: 89
    },
    {
      id: '6',
      title: '💡 Quick tip: The 3-second rule for social media',
      type: 'social',
      description: 'Short, actionable advice for immediate social media improvement',
      engagement: 83
    }
  ];
}
