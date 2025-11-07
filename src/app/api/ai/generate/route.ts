import { NextRequest, NextResponse } from 'next/server';
import { OpenAIService } from '@/lib/ai/openai-service';

interface GenerateRequest {
  prompt: string;
  type: 'blog' | 'social' | 'email' | 'marketing';
  userId?: string;
  tone?: 'professional' | 'casual' | 'friendly' | 'authoritative' | 'conversational';
  audience?: string;
  length?: 'short' | 'medium' | 'long';
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json();
    
    if (!body.prompt || !body.type) {
      return NextResponse.json(
        { error: 'Prompt and type are required' },
        { status: 400 }
      );
    }

    // Check if OpenAI is available
    if (!OpenAIService.isConfigured()) {
      return NextResponse.json(
        { error: 'OpenAI API is not configured. Please set OPENAI_API_KEY environment variable.' },
        { status: 503 }
      );
    }

    const openaiService = new OpenAIService();

    // Create content type specific prompts
    const prompts = {
      blog: `Write a comprehensive and engaging blog post about "${body.prompt}". 
        Structure it with:
        - A compelling headline
        - An engaging introduction that hooks the reader
        - Well-organized main sections with subheadings
        - Actionable insights and practical examples
        - A strong conclusion with key takeaways
        
        Tone: ${body.tone || 'professional'}
        Target audience: ${body.audience || 'general audience'}
        Length: ${body.length || 'medium'} (${body.length === 'short' ? '500-800' : body.length === 'long' ? '1500-2500' : '800-1500'} words)
        
        Make it informative, engaging, and valuable to readers. Use markdown formatting for headings and structure.`,
      
      social: `Create an engaging social media post about "${body.prompt}".
        Requirements:
        - Hook readers with the first line
        - Include relevant emojis naturally
        - Add 3-5 relevant hashtags
        - Keep it concise but impactful
        - Include a call-to-action
        - Make it shareable and conversation-starting
        
        Tone: ${body.tone || 'friendly'}
        Platform optimization: Multi-platform (works for Twitter, LinkedIn, Instagram)
        
        Format the output as a ready-to-post social media update.`,
      
      email: `Write a compelling email campaign about "${body.prompt}".
        Include:
        - Subject line (compelling and click-worthy)
        - Personal greeting
        - Engaging opening that relates to the recipient
        - Clear value proposition
        - Main content that delivers on the promise
        - Strong call-to-action
        - Professional signature placeholder
        
        Tone: ${body.tone || 'professional'}
        Purpose: ${body.audience || 'marketing/promotional'}
        
        Make it personal, valuable, and action-oriented while avoiding spam-like language.`,
      
      marketing: `Create persuasive marketing copy for "${body.prompt}".
        Structure:
        - Attention-grabbing headline
        - Problem identification (pain points)
        - Solution presentation with benefits
        - Social proof or credibility elements
        - Clear value proposition
        - Compelling call-to-action
        - Urgency or scarcity element (if appropriate)
        
        Tone: ${body.tone || 'professional'}
        Focus: Conversion-oriented copy that drives action
        
        Make it persuasive, benefit-focused, and action-driving while maintaining authenticity.`
    };

    const messages = [
      {
        role: 'system' as const,
        content: `You are an expert content writer and marketing specialist. Create high-quality, engaging content that resonates with the target audience. Always focus on value, clarity, and actionability. Adapt your writing style to match the requested tone and format.`
      },
      {
        role: 'user' as const,
        content: prompts[body.type]
      }
    ];

    const response = await openaiService.generateContent(messages, {
      maxTokens: body.length === 'short' ? 800 : body.length === 'long' ? 2500 : 1500,
      temperature: 0.7,
      model: 'gpt-3.5-turbo'
    });

    const content = response.choices[0]?.message?.content || 'Failed to generate content';
    
    // Calculate content stats
    const words = content.split(/\s+/).length;
    const readTime = Math.ceil(words / 200); // Average reading speed
    
    // Simple sentiment analysis based on keywords
    const positiveWords = ['great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'outstanding', 'brilliant'];
    const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'disappointing', 'poor', 'worst'];
    
    const lowerContent = content.toLowerCase();
    const positiveCount = positiveWords.filter(word => lowerContent.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerContent.includes(word)).length;
    
    let sentiment = 'neutral';
    if (positiveCount > negativeCount) sentiment = 'positive';
    else if (negativeCount > positiveCount) sentiment = 'negative';

    return NextResponse.json({
      success: true,
      content,
      stats: {
        words,
        readTime,
        sentiment,
        characters: content.length,
        paragraphs: content.split('\n\n').filter(p => p.trim()).length
      },
      metadata: {
        type: body.type,
        tone: body.tone || 'professional',
        generatedAt: new Date().toISOString(),
        model: 'gpt-3.5-turbo'
      }
    });
    
  } catch (error) {
    console.error('AI Generation Error:', error);
    
    // Return a helpful error message
    if (error instanceof Error && error.message.includes('OpenAI API key')) {
      return NextResponse.json(
        { error: 'OpenAI service is not properly configured. Please check API key.' },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to generate content. Please try again.' },
      { status: 500 }
    );
  }
}

// GET endpoint for content generation templates/examples
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  
  const templates = {
    blog: {
      examples: [
        "10 Essential Tips for Remote Work Productivity",
        "The Future of Artificial Intelligence in Business",
        "Complete Guide to Sustainable Living in 2024",
        "How to Build a Personal Brand on Social Media"
      ],
      tips: [
        "Start with a compelling headline that promises value",
        "Use subheadings to break up content and improve readability",
        "Include practical examples and actionable insights",
        "End with a strong conclusion that summarizes key points"
      ]
    },
    social: {
      examples: [
        "🚀 Just launched our new AI-powered tool! Game-changing for creators. What's your biggest content challenge?",
        "Monday motivation: Your only limit is your imagination. What are you creating today? ✨ #MondayMotivation #CreateDaily",
        "Behind the scenes: How we built our startup from an idea to 10k users in 6 months. Thread 🧵",
        "Pro tip: The best time to start was yesterday. The second best time is now. 💪 #Motivation #StartNow"
      ],
      tips: [
        "Hook readers with the first 5 words",
        "Use emojis strategically to add personality",
        "Ask questions to encourage engagement",
        "Include relevant hashtags (3-5 maximum)"
      ]
    },
    email: {
      examples: [
        "Welcome to [Company] - Your journey starts here",
        "Last chance: 50% off expires tonight",
        "You left something in your cart...",
        "How [Customer Name] achieved amazing results"
      ],
      tips: [
        "Write subject lines that create curiosity",
        "Personalize the greeting and content",
        "Focus on one clear call-to-action",
        "Use storytelling to make it engaging"
      ]
    },
    marketing: {
      examples: [
        "Transform Your Business with Our Revolutionary AI Solution",
        "Stop Wasting Time on Manual Tasks - Automate Everything",
        "Join 10,000+ Satisfied Customers Who Chose Excellence",
        "Limited Time: Get Premium Features at Startup Prices"
      ],
      tips: [
        "Lead with benefits, not features",
        "Use social proof and testimonials",
        "Create urgency with limited-time offers",
        "Make the call-to-action clear and compelling"
      ]
    }
  };

  if (type && templates[type as keyof typeof templates]) {
    return NextResponse.json(templates[type as keyof typeof templates]);
  }

  return NextResponse.json(templates);
}