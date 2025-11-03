// OpenAI service for content generation
import type { OpenAIMessage, OpenAIResponse } from '@/types/openai';

export class OpenAIService {
    private apiKey: string;
    private baseURL: string = 'https://api.openai.com/v1';

    constructor(apiKey?: string) {
        this.apiKey = apiKey || process.env.OPENAI_API_KEY || '';
        if (!this.apiKey) {
            throw new Error('OpenAI API key is required');
        }
    }

    // Get OpenAI API key from environment
    static getAPIKey(): string | null {
        return process.env.OPENAI_API_KEY || null;
    }

    async generateContent(
        messages: OpenAIMessage[],
        options: {
            maxTokens?: number;
            temperature?: number;
            model?: string;
            stream?: boolean;
        } = {}
    ): Promise<OpenAIResponse> {
        const response = await fetch(`${this.baseURL}/chat/completions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: options.model || 'gpt-3.5-turbo',
                messages,
                max_tokens: options.maxTokens || 1000,
                temperature: options.temperature || 0.7,
                stream: options.stream || false,
                frequency_penalty: 0.1,
                presence_penalty: 0.1
            })
        });

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
        }

        return response.json();
    }

    async generateContentStream(
        messages: OpenAIMessage[],
        options: {
            maxTokens?: number;
            temperature?: number;
            model?: string;
        } = {}
    ): Promise<ReadableStream> {
        const response = await fetch(`${this.baseURL}/chat/completions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: options.model || 'gpt-3.5-turbo',
                messages,
                max_tokens: options.maxTokens || 1000,
                temperature: options.temperature || 0.7,
                stream: true,
                frequency_penalty: 0.1,
                presence_penalty: 0.1
            })
        });

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
        }

        return response.body as ReadableStream;
    }

    isAvailable(): boolean {
        return !!this.apiKey;
    }

    static isConfigured(): boolean {
        return !!OpenAIService.getAPIKey();
    }
}