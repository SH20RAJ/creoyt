import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // In a real app, you would fetch from database based on userId
    // For now, return demo data
    const demoContent = [
      {
        id: 'content-1',
        title: '10 AI Tools Every Creator Should Know',
        content: `# 10 AI Tools Every Creator Should Know

Artificial Intelligence is revolutionizing the way we create content. From writing assistance to image generation, AI tools are becoming essential for modern creators.

## 1. ChatGPT for Writing
ChatGPT has become the go-to tool for writers looking to overcome writer's block and generate ideas quickly.

## 2. Midjourney for Images  
Create stunning visuals with simple text prompts using Midjourney's powerful AI image generation.

## 3. Canva's AI Features
Canva now includes AI-powered design suggestions and magic resize features that save hours of work.

The future of content creation is here, and it's powered by AI. These tools don't replace creativity—they amplify it.`,
        type: 'blog',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        stats: {
          words: 156,
          readTime: 1,
          sentiment: 'positive'
        }
      },
      {
        id: 'content-2',
        title: 'Social Media Strategy Update',
        content: `🚀 Just launched our new content creation workflow!

After months of testing, we've discovered the perfect formula for viral content:

✨ Authentic storytelling
📊 Data-driven insights  
🎯 Audience-first approach
🔄 Consistent posting schedule

What's your biggest content challenge? Drop it below! 👇

#ContentCreation #SocialMediaStrategy #CreatorTips #AITools #ViralContent`,
        type: 'social',
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        stats: {
          words: 67,
          readTime: 1,
          sentiment: 'positive'
        }
      },
      {
        id: 'content-3',
        title: 'Welcome Email Series - Part 1',
        content: `Subject: Welcome to Creaovate - Your Content Journey Starts Now! 🎉

Hi [First Name],

Welcome to the Creaovate family! I'm thrilled you've joined thousands of creators who are transforming their content game with AI.

Over the next few days, I'll share:
→ Quick wins you can implement today
→ Advanced strategies that drive real results  
→ Behind-the-scenes insights from successful creators

Your first mission (should you choose to accept it): Create one piece of content using our AI tools in the next 24 hours. Even something small counts!

Ready to get started? Hit reply and tell me what type of content you're most excited to create.

Cheers to your success,
The Creaovate Team

P.S. Check out our creator community where you can share wins and get feedback!`,
        type: 'email',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        stats: {
          words: 142,
          readTime: 1,
          sentiment: 'positive'
        }
      },
      {
        id: 'content-4',
        title: 'Product Launch Marketing Copy',
        content: `# Transform Your Content Strategy in Just 30 Days

## Stop Struggling with Content Creation

Are you tired of staring at blank pages? Frustrated with inconsistent posting? Watching competitors get all the engagement while your content gets ignored?

**You're not alone.** 73% of creators say their biggest challenge is consistent, high-quality content creation.

## Introducing Creaovate: Your AI Content Assistant

✅ Generate blog posts in minutes, not hours
✅ Create engaging social media content that converts  
✅ Write compelling emails that get opened and clicked
✅ Develop marketing copy that actually sells

**Real Results:** Our beta users increased their content output by 300% while improving engagement by 45%.

## Limited Time: Get Started for Free

For the next 48 hours, we're offering free access to our premium AI tools. No credit card required.

**[Start Creating Amazing Content Now →]**

Don't let another week pass wondering "what if." Your audience is waiting for your best content.`,
        type: 'marketing',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        stats: {
          words: 178,
          readTime: 1,
          sentiment: 'positive'
        }
      }
    ];

    return NextResponse.json({
      content: demoContent,
      total: demoContent.length,
      userId
    });

  } catch (error) {
    console.error('Recent Content API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recent content' },
      { status: 500 }
    );
  }
}