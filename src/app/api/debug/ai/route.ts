import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Debug: Check what's available in the global context
    const globalKeys = Object.keys(globalThis);
    const hasAI = 'AI' in globalThis;
    
    // Check if we can access the AI through the request context
    const requestAI = (request as unknown as { cf?: { env?: { AI?: unknown } } })?.cf?.env?.AI;
    
    // Check if AI is available as a global
    const globalAI = (globalThis as { AI?: unknown }).AI;
    
    // Try to access AI in different ways
    const debugInfo = {
      hasGlobalAI: hasAI,
      globalAIType: typeof globalAI,
      requestAIType: typeof requestAI,
      globalKeys: globalKeys.filter(key => key.includes('AI') || key.includes('ai')),
      environment: process.env.NODE_ENV || 'unknown'
    };
    
    return NextResponse.json({
      debug: debugInfo,
      message: 'AI binding debug information'
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Debug failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
