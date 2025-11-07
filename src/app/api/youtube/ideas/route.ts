import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';
import { eq, and, desc } from 'drizzle-orm';
import { db, youtubeChannels, youtubeVideos } from '@/lib/db';

/**
 * GET /api/youtube/ideas?channelId=xxx
 * Generates AI-powered video ideas based on channel's top-performing content
 */
export async function GET(request: NextRequest) {
  try {
    // Verify user authentication
    const user = await stackServerApp.getUser({ tokenStore: 'nextjs-cookie' });
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const channelId = searchParams.get('channelId');

    if (!channelId) {
      return NextResponse.json({ error: 'Channel ID is required' }, { status: 400 });
    }

    // Get user's YouTube channel
    const channel = await db
      .select()
      .from(youtubeChannels)
      .where(
        and(
          eq(youtubeChannels.id, channelId),
          eq(youtubeChannels.userId, user.id),
          eq(youtubeChannels.isActive, true)
        )
      )
      .limit(1);

    if (channel.length === 0) {
      return NextResponse.json({ error: 'Channel not found or not authorized' }, { status: 404 });
    }

    const channelData = channel[0];

    // Get top 10 performing videos by engagement rate and views
    const topVideos = await db
      .select()
      .from(youtubeVideos)
      .where(eq(youtubeVideos.channelId, channelData.id))
      .orderBy(desc(youtubeVideos.engagementRate), desc(youtubeVideos.viewCount))
      .limit(10);

    if (topVideos.length === 0) {
      return NextResponse.json({
        success: true,
        ideas: [],
        message: 'No videos found to analyze. Please sync your videos first.'
      });
    }

    // Prepare data for AI analysis
    const videoTitles = topVideos.map(video => video.title).join('\n');
    const channelName = channelData.channelName;
    const channelDescription = channelData.channelDescription;

    // Create AI prompt for video idea generation
    const prompt = `
You are a YouTube content strategist AI. Based on the following channel information and top-performing video titles, generate 5 new video ideas that are likely to perform well.

Channel Name: ${channelName}
Channel Description: ${channelDescription}

Top Performing Video Titles:
${videoTitles}

Please analyze the patterns in these successful videos and generate 5 new video ideas that:
1. Follow similar content patterns and themes
2. Are likely to get high engagement based on the channel's audience
3. Are trendy and relevant to current topics
4. Have good SEO potential
5. Are specific and actionable

Format your response as a JSON array with this structure:
[
  {
    "title": "Video title here",
    "description": "Brief description of the video concept",
    "reasoning": "Why this idea would work based on the channel's performance",
    "estimatedEngagement": 85,
    "tags": ["tag1", "tag2", "tag3"],
    "difficulty": "easy|medium|hard"
  }
]

Return only the JSON array, no additional text.`;

    try {
      // Call OpenAI API to generate video ideas
      const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a YouTube content strategist AI that generates video ideas based on successful content patterns. Always respond with valid JSON only.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 1500,
          temperature: 0.8,
        }),
      });

      if (!openaiResponse.ok) {
        throw new Error(`OpenAI API error: ${openaiResponse.statusText}`);
      }

      const openaiData = await openaiResponse.json();
      const aiResponse = openaiData.choices[0]?.message?.content;

      if (!aiResponse) {
        throw new Error('No response from AI');
      }

      // Parse AI response
      let videoIdeas;
      try {
        videoIdeas = JSON.parse(aiResponse);
      } catch (parseError) {
        console.error('Failed to parse AI response:', aiResponse);
        // Fallback: create basic ideas based on top video patterns
        videoIdeas = generateFallbackIdeas(topVideos, channelName);
      }

      // Ensure we have valid ideas
      if (!Array.isArray(videoIdeas) || videoIdeas.length === 0) {
        videoIdeas = generateFallbackIdeas(topVideos, channelName);
      }

      return NextResponse.json({
        success: true,
        ideas: videoIdeas,
        channel: {
          id: channelData.id,
          name: channelData.channelName,
        },
        basedOnVideos: topVideos.length,
        generatedAt: new Date().toISOString()
      });

    } catch (aiError) {
      console.error('AI generation error:', aiError);
      
      // Fallback to pattern-based idea generation
      const fallbackIdeas = generateFallbackIdeas(topVideos, channelName);
      
      return NextResponse.json({
        success: true,
        ideas: fallbackIdeas,
        channel: {
          id: channelData.id,
          name: channelData.channelName,
        },
        basedOnVideos: topVideos.length,
        generatedAt: new Date().toISOString(),
        fallback: true,
        message: 'Generated using pattern analysis (AI temporarily unavailable)'
      });
    }

  } catch (error) {
    console.error('Error generating video ideas:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate video ideas',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

/**
 * Fallback function to generate ideas based on patterns in top videos
 */
function generateFallbackIdeas(topVideos: any[], channelName: string) {
  const commonWords = extractCommonWords(topVideos.map(v => v.title));
  const avgEngagement = Math.round(
    topVideos.reduce((sum, video) => sum + (video.engagementRate || 0), 0) / topVideos.length
  );

  return [
    {
      title: `${commonWords[0]} Tips That Actually Work in 2024`,
      description: `Share advanced tips and strategies related to ${commonWords[0]} that your audience hasn't heard before.`,
      reasoning: `Based on your successful videos, content about ${commonWords[0]} performs well with your audience.`,
      estimatedEngagement: Math.min(avgEngagement + 5, 95),
      tags: [commonWords[0], "tips", "2024", "tutorial"],
      difficulty: "easy"
    },
    {
      title: `Why Everyone is Wrong About ${commonWords[1] || commonWords[0]}`,
      description: `Challenge common misconceptions and provide your unique perspective on this topic.`,
      reasoning: `Contrarian takes tend to generate discussion and engagement, building on your established expertise.`,
      estimatedEngagement: Math.min(avgEngagement + 3, 95),
      tags: [commonWords[1] || commonWords[0], "opinion", "controversy"],
      difficulty: "medium"
    },
    {
      title: `My Biggest ${commonWords[0]} Mistakes (And How to Avoid Them)`,
      description: `Share personal failures and lessons learned to help your audience avoid similar pitfalls.`,
      reasoning: `Personal story content creates connection and provides valuable learning opportunities.`,
      estimatedEngagement: Math.min(avgEngagement + 7, 95),
      tags: ["mistakes", "lessons", commonWords[0], "personal"],
      difficulty: "easy"
    },
    {
      title: `${channelName} Reacts to Viral ${commonWords[0]} Trends`,
      description: `React to and analyze current trends in your niche, providing expert commentary.`,
      reasoning: `Reaction content capitalizes on trending topics while showcasing your expertise.`,
      estimatedEngagement: Math.min(avgEngagement + 10, 95),
      tags: ["reaction", "trends", commonWords[0], "analysis"],
      difficulty: "medium"
    },
    {
      title: `The Future of ${commonWords[0]}: Predictions for 2025`,
      description: `Make informed predictions about where your industry/topic is heading next year.`,
      reasoning: `Future-focused content generates curiosity and positions you as a thought leader.`,
      estimatedEngagement: Math.min(avgEngagement + 2, 95),
      tags: ["future", "predictions", "2025", commonWords[0]],
      difficulty: "hard"
    }
  ];
}

/**
 * Extract common words from video titles
 */
function extractCommonWords(titles: string[]): string[] {
  const allWords = titles
    .join(' ')
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 3)
    .filter(word => !['with', 'from', 'that', 'this', 'your', 'their', 'what', 'when', 'where', 'which', 'will', 'would', 'could', 'should'].includes(word));

  const wordCounts = allWords.reduce((counts, word) => {
    counts[word] = (counts[word] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);

  return Object.entries(wordCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([word]) => word);
}