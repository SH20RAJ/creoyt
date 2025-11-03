interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface AIResponse {
  response: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

interface GenerateContentParams {
  messages: AIMessage[];
  maxTokens?: number;
  temperature?: number;
  stream?: boolean;
  userId?: string;
}

export class AIService {
  private apiKey: string;
  private baseURL: string = 'https://api.openai.com/v1';

  constructor(private _env: { OPENAI_API_KEY: string; DB?: D1Database }) {
    this.apiKey = _env.OPENAI_API_KEY;
    if (!this.apiKey) {
      throw new Error('OPENAI_API_KEY is required');
    }
  }

  private get env() {
    return this._env;
  }

  /**
   * Generate content using OpenAI GPT models
   */
  async generateContent(params: GenerateContentParams): Promise<AIResponse> {
    const startTime = Date.now();

    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: params.messages,
          max_tokens: params.maxTokens || 1000,
          temperature: params.temperature || 0.7,
          stream: params.stream || false,
          frequency_penalty: 0.1,
          presence_penalty: 0.1
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const responseTime = Date.now() - startTime;

      const aiResponse: AIResponse = {
        response: data.choices[0]?.message?.content || '',
        usage: data.usage
      };

      // Track usage if database is available
      if (params.userId && this.env.DB) {
        await this.trackUsage({
          userId: params.userId,
          model: 'gpt-3.5-turbo',
          tokensInput: data.usage?.prompt_tokens || 0,
          tokensOutput: data.usage?.completion_tokens || 0,
          responseTime
        });
      }

      return aiResponse;
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error('Failed to generate AI content');
    }
  }

  /**
   * Generate content with streaming support
   */
  async generateContentStream(params: GenerateContentParams): Promise<ReadableStream> {
    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: params.messages,
          max_tokens: params.maxTokens || 1000,
          temperature: params.temperature || 0.7,
          stream: true,
          frequency_penalty: 0.1,
          presence_penalty: 0.1
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
      }

      return response.body as ReadableStream;
    } catch (error) {
      console.error('AI Streaming Error:', error);
      throw new Error('Failed to stream AI content');
    }
  }

  /**
   * Analyze content and provide suggestions
   */
  async analyzeContent(content: string, userId?: string): Promise<AIResponse> {
    const messages: AIMessage[] = [
      {
        role: 'system',
        content: 'You are a content analysis expert. Analyze the given content and provide actionable feedback on tone, clarity, engagement, and SEO optimization. Be concise and specific.'
      },
      {
        role: 'user',
        content: `Please analyze this content:\n\n${content}`
      }
    ];

    return this.generateContent({
      messages,
      maxTokens: 500,
      temperature: 0.3,
      userId
    });
  }

  /**
   * Generate content suggestions based on type and topic
   */
  async generateSuggestions(contentType: string, topic: string, userId?: string): Promise<AIResponse> {
    const messages: AIMessage[] = [
      {
        role: 'system',
        content: `You are a content creation expert. Generate creative and engaging ${contentType} ideas about the topic provided. Provide 5 specific, actionable suggestions with brief descriptions.`
      },
      {
        role: 'user',
        content: `Generate ${contentType} ideas for: ${topic}`
      }
    ];

    return this.generateContent({
      messages,
      maxTokens: 600,
      temperature: 0.8,
      userId
    });
  }

  /**
   * Improve existing content
   */
  async improveContent(content: string, improvements: string[], userId?: string): Promise<AIResponse> {
    const improvementsList = improvements.join(', ');
    const messages: AIMessage[] = [
      {
        role: 'system',
        content: 'You are a content improvement expert. Rewrite the provided content to improve it based on the specific requirements given. Maintain the original intent while enhancing quality.'
      },
      {
        role: 'user',
        content: `Please improve this content focusing on: ${improvementsList}\n\nOriginal content:\n${content}`
      }
    ];

    return this.generateContent({
      messages,
      maxTokens: 1200,
      temperature: 0.6,
      userId
    });
  }

  /**
   * Track AI usage for billing and analytics
   */
  private async trackUsage(params: {
    userId: string;
    model: string;
    tokensInput: number;
    tokensOutput: number;
    responseTime: number;
  }) {
    if (!this.env.DB) return;

    try {
      const today = new Date().toISOString().split('T')[0];
      const cost = this.calculateCost(params.tokensInput, params.tokensOutput);

      // Insert usage record
      await this.env.DB.prepare(`
        INSERT INTO ai_usage (id, user_id, model, tokens_input, tokens_output, cost, date)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(user_id, model, date) DO UPDATE SET
          tokens_input = tokens_input + excluded.tokens_input,
          tokens_output = tokens_output + excluded.tokens_output,
          cost = cost + excluded.cost
      `).bind(
        crypto.randomUUID(),
        params.userId,
        params.model,
        params.tokensInput,
        params.tokensOutput,
        cost,
        today
      ).run();

    } catch (error) {
      console.error('Failed to track AI usage:', error);
    }
  }

  /**
   * Calculate cost based on OpenAI GPT-3.5-turbo pricing
   * Input: $0.0015 per 1K tokens
   * Output: $0.002 per 1K tokens
   */
  private calculateCost(inputTokens: number, outputTokens: number): number {
    const inputCost = (inputTokens / 1000) * 0.0015;
    const outputCost = (outputTokens / 1000) * 0.002;
    return inputCost + outputCost;
  }

  /**
   * Check if user has remaining quota
   */
  async checkUserQuota(userId: string, subscriptionTier: string = 'free'): Promise<{
    hasQuota: boolean;
    tokensUsed: number;
    tokensLimit: number;
    tokensRemaining: number;
  }> {
    if (!this.env.DB) {
      return { hasQuota: true, tokensUsed: 0, tokensLimit: 10000, tokensRemaining: 10000 };
    }

    try {
      const today = new Date().toISOString().split('T')[0];
      const currentMonth = today.substring(0, 7); // YYYY-MM

      // Get monthly usage
      const result = await this.env.DB.prepare(`
        SELECT SUM(tokens_input + tokens_output) as total_tokens
        FROM ai_usage
        WHERE user_id = ? AND date LIKE ?
      `).bind(userId, `${currentMonth}%`).first();

      const tokensUsed = Number(result?.total_tokens || 0);

      // Define limits based on subscription tier
      const limits = {
        free: 10_000,
        pro: 1_000_000,
        enterprise: 10_000_000
      };

      const tokensLimit = limits[subscriptionTier as keyof typeof limits] || limits.free;
      const tokensRemaining = Math.max(0, tokensLimit - tokensUsed);
      const hasQuota = tokensRemaining > 0;

      return {
        hasQuota,
        tokensUsed,
        tokensLimit,
        tokensRemaining
      };
    } catch (error) {
      console.error('Failed to check user quota:', error);
      return { hasQuota: false, tokensUsed: 0, tokensLimit: 0, tokensRemaining: 0 };
    }
  }
}

// Content generation templates
export const CONTENT_TEMPLATES = {
  blog_post: {
    system: "You are a professional blog writer. Create engaging, well-structured blog posts with clear headings, compelling introductions, and actionable conclusions.",
    maxTokens: 1500,
    temperature: 0.7
  },
  social_media: {
    system: "You are a social media expert. Create engaging, platform-appropriate content that drives engagement and shares.",
    maxTokens: 300,
    temperature: 0.8
  },
  marketing_copy: {
    system: "You are a marketing copywriter. Create persuasive, benefit-focused copy that converts readers into customers.",
    maxTokens: 800,
    temperature: 0.6
  },
  email_campaign: {
    system: "You are an email marketing expert. Create compelling email content with strong subject lines and clear calls-to-action.",
    maxTokens: 1000,
    temperature: 0.7
  },
  product_description: {
    system: "You are a product copywriter. Create detailed, benefit-focused product descriptions that help customers make purchasing decisions.",
    maxTokens: 600,
    temperature: 0.6
  }
};

export type ContentTemplate = keyof typeof CONTENT_TEMPLATES;