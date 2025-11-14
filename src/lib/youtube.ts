/**
 * YouTube API Integration Library
 * Handles OAuth, API calls, and token management for YouTube Data API v3 & YouTube Analytics API
 */

interface YouTubeChannel {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: { url: string };
      medium: { url: string };
      high: { url: string };
    };
  };
  statistics: {
    viewCount: string;
    subscriberCount: string;
    videoCount: string;
  };
  contentDetails: {
    relatedPlaylists: {
      uploads: string;
    };
  };
}

interface YouTubeVideo {
  id: string;
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: {
      default: { url: string };
      medium: { url: string };
      high: { url: string };
    };
    tags?: string[];
    categoryId: string;
  };
  contentDetails: {
    duration: string;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    dislikeCount: string;
    commentCount: string;
  };
}

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

export class YouTubeAPI {
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;

  constructor() {
    this.clientId = process.env.GOOGLE_CLIENT_ID!;
    this.clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
    this.redirectUri = process.env.GOOGLE_REDIRECT_URI!;
  }

  /**
   * Generate OAuth URL for YouTube authentication
   */
  getAuthUrl(state?: string): string {
    const scopes = [
      'https://www.googleapis.com/auth/youtube.readonly',
      'https://www.googleapis.com/auth/youtube',
      'https://www.googleapis.com/auth/yt-analytics.readonly'
    ].join(' ');

    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      response_type: 'code',
      scope: scopes,
      access_type: 'offline',
      prompt: 'consent',
      ...(state && { state })
    });

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  /**
   * Exchange authorization code for access tokens
   */
  async exchangeCodeForTokens(code: string): Promise<TokenResponse> {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: this.redirectUri,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Token exchange failed: ${error}`);
    }

    return response.json();
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshAccessToken(refreshToken: string): Promise<TokenResponse> {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Token refresh failed: ${error}`);
    }

    return response.json();
  }

  /**
   * Get user's YouTube channels
   */
  async getChannels(accessToken: string): Promise<YouTubeChannel[]> {
    const response = await fetch(
      'https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails&mine=true',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to fetch channels: ${error}`);
    }

    const data: any = await response.json();
    return data.items || [];
  }

  /**
   * Get videos from a playlist (typically uploads playlist)
   */
  async getPlaylistVideos(accessToken: string, playlistId: string, maxResults: number = 20): Promise<any[]> {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${playlistId}&maxResults=${maxResults}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to fetch playlist videos: ${error}`);
    }

    const data: any = await response.json();
    return data.items || [];
  }

  /**
   * Get detailed video information
   */
  async getVideoDetails(accessToken: string, videoIds: string[]): Promise<YouTubeVideo[]> {
    if (videoIds.length === 0) return [];

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds.join(',')}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to fetch video details: ${error}`);
    }

    const data: any = await response.json();
    return data.items || [];
  }

  /**
   * Search for videos by query (ordered by view count)
   */
  async searchVideos(accessToken: string, query: string, maxResults = 10): Promise<string[]> {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&order=viewCount&maxResults=${maxResults}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to search videos: ${error}`);
    }
    const data: any = await response.json();
    const ids = (data.items || []).map((it: any) => it.id?.videoId).filter(Boolean);
    return ids;
  }

  /**
   * Get YouTube Analytics data
   */
  async getChannelAnalytics(
    accessToken: string, 
    channelId: string, 
    startDate: string, 
    endDate: string
  ): Promise<any> {
    // Use a conservative set of metrics broadly supported across channels
    // Note: impressions/CTR and dislikes are excluded to avoid API errors
    // where those identifiers are not available for the queried report.
    const metrics = [
      'views',
      'likes',
      'comments',
      'shares',
      'subscribersGained',
      'subscribersLost',
      'estimatedMinutesWatched',
      'averageViewDuration'
    ].join(',');

    const response = await fetch(
      `https://youtubeanalytics.googleapis.com/v2/reports?ids=channel==${channelId}&metrics=${metrics}&startDate=${startDate}&endDate=${endDate}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to fetch analytics: ${error}`);
    }

    return response.json();
  }

  /**
   * Get video analytics data
   */
  async getVideoAnalytics(
    accessToken: string,
    videoId: string,
    startDate: string,
    endDate: string
  ): Promise<any> {
    const metrics = [
      'views',
      'likes',
      'dislikes',
      'comments',
      'shares',
      'estimatedMinutesWatched',
      'averageViewDuration'
    ].join(',');

    const response = await fetch(
      `https://youtubeanalytics.googleapis.com/v2/reports?ids=video==${videoId}&metrics=${metrics}&startDate=${startDate}&endDate=${endDate}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to fetch video analytics: ${error}`);
    }

    return response.json();
  }

  /**
   * Check if access token is valid
   */
  async validateToken(accessToken: string): Promise<boolean> {
    try {
      const response = await fetch(
        'https://www.googleapis.com/youtube/v3/channels?part=id&mine=true',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Parse ISO 8601 duration to seconds
   */
  parseDuration(duration: string): number {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;

    const hours = parseInt(match[1] || '0', 10);
    const minutes = parseInt(match[2] || '0', 10);
    const seconds = parseInt(match[3] || '0', 10);

    return hours * 3600 + minutes * 60 + seconds;
  }

  /**
   * Calculate engagement rate
   */
  calculateEngagementRate(likes: number, dislikes: number, comments: number, views: number): number {
    if (views === 0) return 0;
    const engagement = likes + dislikes + comments;
    return Math.round((engagement / views) * 100 * 100) / 100; // Round to 2 decimal places
  }
}

export const youTubeAPI = new YouTubeAPI();
