"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Zap } from 'lucide-react';
import { useUser } from '@stackframe/stack';

interface QuotaInfo {
  hasQuota: boolean;
  tokensUsed: number;
  tokensLimit: number;
  tokensRemaining: number;
  subscriptionTier: string;
  resetDate: string;
}

interface UsageQuotaProps {
  isCollapsed?: boolean;
}

export function UsageQuota({ isCollapsed = false }: UsageQuotaProps) {
  const [quotaInfo, setQuotaInfo] = useState<QuotaInfo | null>(null);
  const user = useUser();

  // Demo user ID for testing - in production, this would come from the authenticated user
  const userId = user?.id || 'demo-user-123';

  useEffect(() => {
    if (user) {
      loadQuotaInfo();
    }
  }, [user]);

  const loadQuotaInfo = async () => {
    try {
      const response = await fetch(`/api/ai/quota?userId=${userId}`);
      const data = await response.json() as QuotaInfo;
      setQuotaInfo(data);
    } catch (error) {
      console.error('Failed to load quota info:', error);
    }
  };

  if (!user || !quotaInfo) {
    return null;
  }

  const quotaPercentage = (quotaInfo.tokensUsed / quotaInfo.tokensLimit) * 100;

  if (isCollapsed) {
    return (
      <div className="px-3 py-3">
        <div className="flex items-center justify-center h-10 hover:bg-accent rounded-lg transition-colors cursor-pointer" title="Usage Quota">
          <div className="relative">
            <Zap className="w-5 h-5 text-primary" />
            <div className="absolute -top-1 -right-1">
              <div className={`w-3 h-3 rounded-full ${
                quotaPercentage > 80 ? 'bg-red-500' : 
                quotaPercentage > 60 ? 'bg-yellow-500' : 'bg-green-500'
              }`} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className="mx-3 my-3">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <Zap className="w-4 h-4" />
          Usage Quota
          <Badge variant={quotaInfo.hasQuota ? "default" : "destructive"} className="text-xs">
            {quotaInfo.subscriptionTier}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Progress value={quotaPercentage} className="h-2" />
        <div className="text-xs text-muted-foreground">
          {quotaInfo.tokensUsed.toLocaleString()} / {quotaInfo.tokensLimit.toLocaleString()} tokens
        </div>
        <div className="text-xs font-medium">
          {quotaInfo.tokensRemaining.toLocaleString()} remaining
        </div>
      </CardContent>
    </Card>
  );
}