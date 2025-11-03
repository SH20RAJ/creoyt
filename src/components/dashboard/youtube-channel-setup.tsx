"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Youtube, Plus, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface YouTubeChannelSetupProps {
  isCollapsed?: boolean;
}

export function YouTubeChannelSetup({ isCollapsed = false }: YouTubeChannelSetupProps) {
  const [channelUrl, setChannelUrl] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAddChannel = () => {
    if (!channelUrl.trim()) return;
    
    // Store the channel URL in localStorage for now
    // In production, this would be handled differently
    const existingChannels = JSON.parse(localStorage.getItem('pendingYouTubeChannels') || '[]');
    existingChannels.push({
      url: channelUrl,
      addedAt: new Date().toISOString()
    });
    localStorage.setItem('pendingYouTubeChannels', JSON.stringify(existingChannels));
    
    setChannelUrl('');
    setIsExpanded(false);
    
    // Show success message (you could add a toast here)
    console.log('Channel saved! Sign up to manage your channels.');
  };

  if (isCollapsed) {
    return (
      <div className="px-3 py-3">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-center p-2 h-10 hover:bg-accent"
          onClick={() => setIsExpanded(true)}
          title="Add YouTube Channel"
        >
          <Youtube className="w-5 h-5 text-red-500" />
        </Button>
      </div>
    );
  }

  if (isExpanded) {
    return (
      <Card className="mx-3 my-3">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Youtube className="w-4 h-4 text-red-500" />
            Add YouTube Channel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            placeholder="https://youtube.com/@channel"
            value={channelUrl}
            onChange={(e) => setChannelUrl(e.target.value)}
            className="text-sm"
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleAddChannel}
              disabled={!channelUrl.trim()}
              className="flex-1"
            >
              <Plus className="w-3 h-3 mr-1" />
              Add
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(false)}
            >
              Cancel
            </Button>
          </div>
          <div className="text-xs text-muted-foreground">
            <Link href="/handler/sign-up" className="text-primary hover:underline flex items-center gap-1">
              Sign up to manage channels
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-3 my-3 border-dashed">
      <CardContent className="pt-4">
        <div className="text-center space-y-3">
          <Youtube className="w-8 h-8 mx-auto text-red-500" />
          <div>
            <p className="text-sm font-medium">Add YouTube Channel</p>
            <p className="text-xs text-muted-foreground">
              Connect your channel to get started
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsExpanded(true)}
            className="w-full"
          >
            <Plus className="w-3 h-3 mr-1" />
            Add Channel
          </Button>
          <div className="text-xs text-muted-foreground">
            <Link href="/handler/sign-up" className="text-primary hover:underline flex items-center justify-center gap-1">
              Sign up for full features
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}