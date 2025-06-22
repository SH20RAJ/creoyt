import { NextRequest, NextResponse } from 'next/server';

interface QuotaInfo {
  hasQuota: boolean;
  tokensUsed: number;
  tokensLimit: number;
  tokensRemaining: number;
  subscriptionTier: string;
  resetDate: string;
}

// Get user quota information
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

    // Placeholder quota information for development
    const subscriptionTiers = {
      free: { limit: 10000, name: 'Free' },
      pro: { limit: 1000000, name: 'Pro' },
      enterprise: { limit: 10000000, name: 'Enterprise' }
    };

    // Simulate some usage
    const tier = 'free'; // This would come from the database in production
    const used = Math.floor(Math.random() * 3000) + 1000; // Random usage between 1000-4000
    const limit = subscriptionTiers[tier].limit;
    const remaining = Math.max(0, limit - used);

    const quotaInfo: QuotaInfo = {
      hasQuota: remaining > 0,
      tokensUsed: used,
      tokensLimit: limit,
      tokensRemaining: remaining,
      subscriptionTier: tier,
      resetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
    };

    return NextResponse.json(quotaInfo);
  } catch (error) {
    console.error('Quota API Error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve quota information' },
      { status: 500 }
    );
  }
}

// Update user quota (for admin use or subscription changes)
export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const body = await request.json() as { subscriptionTier: string };

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // In production, this would update the user's subscription tier in the database
    return NextResponse.json({
      success: true,
      message: 'Quota updated successfully',
      newTier: body.subscriptionTier,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Quota Update API Error:', error);
    return NextResponse.json(
      { error: 'Failed to update quota' },
      { status: 500 }
    );
  }
}
