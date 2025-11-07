// Cloudflare Workers types for AI binding
export interface CloudflareAI {
  run(
    _model: string,
    _params: {
      messages?: Array<{
        role: 'user' | 'assistant' | 'system';
        content: string;
      }>;
      max_tokens?: number;
      temperature?: number;
      stream?: boolean;
      [key: string]: unknown;
    }
  ): Promise<{
    response?: string;
    content?: string;
  }>;
}

export interface CloudflareEnv {
  AI: CloudflareAI;
  DB: unknown;
  ASSETS: unknown;
}

declare global {
  const AI: CloudflareAI | undefined;
}
