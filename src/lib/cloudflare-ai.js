// Cloudflare AI service using bindings instead of API tokens
export class CloudflareAIService {
  constructor(aiBinding) {
    this.ai = aiBinding;
  }

  async generateIdeas(topic, settings = {}) {
    const prompt = `
Generate 5 creative and innovative business ideas related to "${topic}".

Requirements:
- Each idea should be unique and practical
- Include a brief description (2-3 sentences)
- Consider market viability
- Focus on solving real problems

Format your response as a JSON array with objects containing:
- title: string
- description: string
- category: string
- marketPotential: string (low/medium/high)

Settings applied: ${JSON.stringify(settings)}
`;

    try {
      const response = await this.ai.run('@cf/meta/llama-3-8b-instruct', {
        messages: [
          {
            role: 'system',
            content: 'You are a creative business consultant and innovation expert. Generate practical, viable business ideas in valid JSON format.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1024,
        temperature: 0.7,
        top_p: 0.9,
      });

      // Parse the response and extract ideas
      let ideas;
      try {
        ideas = JSON.parse(response.response);
      } catch (parseError) {
        // Fallback if JSON parsing fails
        ideas = [
          {
            title: `${topic} Innovation Platform`,
            description: `A comprehensive platform that connects ${topic} enthusiasts with experts and resources.`,
            category: 'Technology',
            marketPotential: 'high'
          },
          {
            title: `Smart ${topic} Analytics`,
            description: `AI-powered analytics tool that provides insights and optimization for ${topic}-related businesses.`,
            category: 'Analytics',
            marketPotential: 'medium'
          },
          {
            title: `${topic} Community Hub`,
            description: `A social platform where people can share experiences and collaborate on ${topic} projects.`,
            category: 'Social',
            marketPotential: 'medium'
          }
        ];
      }

      return {
        success: true,
        ideas: Array.isArray(ideas) ? ideas : [ideas],
        model: '@cf/meta/llama-3-8b-instruct',
        usage: response.usage || {}
      };
    } catch (error) {
      console.error('Cloudflare AI Error:', error);
      throw new Error(`Failed to generate ideas: ${error.message}`);
    }
  }

  async generateContent(prompt, options = {}) {
    const {
      maxTokens = 512,
      temperature = 0.7,
      systemPrompt = 'You are a helpful assistant that provides accurate and creative content.'
    } = options;

    try {
      const response = await this.ai.run('@cf/meta/llama-3-8b-instruct', {
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: maxTokens,
        temperature,
        top_p: 0.9,
      });

      return {
        success: true,
        content: response.response,
        model: '@cf/meta/llama-3-8b-instruct',
        usage: response.usage || {}
      };
    } catch (error) {
      console.error('Cloudflare AI Error:', error);
      throw new Error(`Failed to generate content: ${error.message}`);
    }
  }

  async analyzeText(text, analysisType = 'general') {
    const prompts = {
      sentiment: `Analyze the sentiment of the following text and provide a detailed breakdown:\n\n"${text}"\n\nReturn your analysis in JSON format with sentiment (positive/negative/neutral), confidence score (0-1), and key phrases.`,
      summary: `Provide a concise summary of the following text:\n\n"${text}"\n\nSummary:`,
      keywords: `Extract the main keywords and topics from the following text:\n\n"${text}"\n\nReturn as a JSON array of keywords with relevance scores.`,
      general: `Analyze the following text and provide insights about its content, tone, and key themes:\n\n"${text}"\n\nAnalysis:`
    };

    const prompt = prompts[analysisType] || prompts.general;

    try {
      const response = await this.ai.run('@cf/meta/llama-3-8b-instruct', {
        messages: [
          {
            role: 'system',
            content: 'You are an expert text analyst. Provide detailed, accurate analysis in the requested format.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 512,
        temperature: 0.3,
      });

      return {
        success: true,
        analysis: response.response,
        type: analysisType,
        model: '@cf/meta/llama-3-8b-instruct',
        usage: response.usage || {}
      };
    } catch (error) {
      console.error('Cloudflare AI Error:', error);
      throw new Error(`Failed to analyze text: ${error.message}`);
    }
  }

  async generateTags(content) {
    const prompt = `Generate relevant tags for the following content. Return only a JSON array of strings, no explanation:\n\n"${content}"`;

    try {
      const response = await this.ai.run('@cf/meta/llama-3-8b-instruct', {
        messages: [
          {
            role: 'system',
            content: 'You are a content tagging expert. Generate relevant, concise tags in JSON array format.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 256,
        temperature: 0.5,
      });

      let tags;
      try {
        tags = JSON.parse(response.response);
      } catch (parseError) {
        // Fallback tag extraction
        tags = content.toLowerCase()
          .split(/\W+/)
          .filter(word => word.length > 3)
          .slice(0, 10);
      }

      return {
        success: true,
        tags: Array.isArray(tags) ? tags : [tags],
        model: '@cf/meta/llama-3-8b-instruct',
        usage: response.usage || {}
      };
    } catch (error) {
      console.error('Cloudflare AI Error:', error);
      throw new Error(`Failed to generate tags: ${error.message}`);
    }
  }
}

// Helper function to get AI service instance
export function getAIService(env) {
  if (!env?.AI) {
    throw new Error('Cloudflare AI binding not available. Please configure AI binding in wrangler.toml');
  }
  return new CloudflareAIService(env.AI);
}
