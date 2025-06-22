// Cloudflare Workers AI service for OpenNext
import type { CloudflareAI } from '@/types/cloudflare';

export class AIService {
  private ai: CloudflareAI | null = null;

  constructor(ai?: CloudflareAI) {
    this.ai = ai || null;
  }

  // Try to get AI binding from various sources
  static getAI(): CloudflareAI | null {
    // Try different ways to access the AI binding in Cloudflare Workers
    
    // Method 1: Direct global access
    if ('AI' in globalThis) {
      return (globalThis as unknown as { AI: CloudflareAI }).AI;
    }
    
    // Method 2: Check if it's in the process env (for OpenNext)
    if (typeof process !== 'undefined' && process.env && 'AI' in process.env) {
      return (process.env as unknown as { AI: CloudflareAI }).AI;
    }
    
    // Method 3: Check if it's in globalThis under a different name
    const possibleNames = ['AI', 'ai', '__AI__', '_AI_'];
    for (const name of possibleNames) {
      if (name in globalThis) {
        const binding = (globalThis as Record<string, unknown>)[name];
        if (binding && typeof binding === 'object' && 'run' in binding) {
          return binding as CloudflareAI;
        }
      }
    }
    
    return null;
  }

  async generateContent(
    messages: Array<{
      role: 'user' | 'assistant' | 'system';
      content: string;
    }>,
    options: {
      maxTokens?: number;
      temperature?: number;
      model?: string;
    } = {}
  ) {
    const ai = this.ai || AIService.getAI();
    
    if (!ai) {
      throw new Error('AI binding not available');
    }

    return ai.run(options.model || '@cf/meta/llama-3.1-8b-instruct', {
      messages,
      max_tokens: options.maxTokens || 1000,
      temperature: options.temperature || 0.7
    });
  }

  isAvailable(): boolean {
    return !!(this.ai || AIService.getAI());
  }
}
