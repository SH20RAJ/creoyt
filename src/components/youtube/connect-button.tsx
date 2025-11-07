"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Youtube, 
  Plus, 
  Trash2, 
  Users, 
  Video, 
  Eye, 
  RefreshCw,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { useUser } from '@stackframe/stack';

interface YouTubeChannel {
  id: string;
  channelId: string;
  channelName: string;
  channelDescription: string;
  channelThumbnail: string;
  subscriberCount: number;
  videoCount: number;
  viewCount: number;
  isActive: boolean;
  tokenExpired: boolean;
  daysUntilExpiry: number;
  createdAt: string;
}

export default function YouTubeConnectButton() {
  const user = useUser();
  const [channels, setChannels] = useState<YouTubeChannel[]>([]);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchChannels();
    }
  }, [user]);

  const fetchChannels = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/youtube-channels');
      
      if (response.ok) {
        const data = await response.json();
        setChannels(data.channels || []);
      } else {
        console.error('Failed to fetch channels');
      }
    } catch (error) {
      console.error('Error fetching channels:', error);
    } finally {
      setLoading(false);
    }
  };

  const connectYouTube = async () => {
    try {
      setConnecting(true);
      setError('');
      
      // Redirect to YouTube OAuth
      window.location.href = '/api/auth/youtube';
    } catch (error) {
      setError('Failed to connect YouTube. Please try again.');
      setConnecting(false);
    }
  };

  const disconnectChannel = async (channelId: string) => {
    if (!confirm('Are you sure you want to disconnect this YouTube channel?')) {
      return;
    }

    try {
      const response = await fetch(`/api/youtube-channels?channelId=${channelId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchChannels(); // Refresh the list
      } else {
        setError('Failed to disconnect channel');
      }
    } catch (error) {
      setError('Error disconnecting channel');
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Please log in to connect your YouTube channels.</p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
          <p className="text-muted-foreground">Loading YouTube channels...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Youtube className="w-5 h-5 text-red-500" />
            YouTube Integration
          </CardTitle>
          <CardDescription>
            Connect your YouTube channels to unlock analytics and AI-powered insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {channels.length === 0 ? (
            <div className="text-center py-8">
              <Youtube className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="font-medium mb-2">No YouTube channels connected</h3>
              <p className="text-muted-foreground mb-4">
                Connect your YouTube channel to access video analytics and AI content insights
              </p>
              <Button 
                onClick={connectYouTube} 
                disabled={connecting}
                className="bg-red-600 hover:bg-red-700"
              >
                {connecting ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Connect YouTube Channel
                  </>
                )}
              </Button>
            </div>
          ) : (
            <>
              {/* Connected Channels */}
              <div className="space-y-4">
                {channels.map((channel) => (
                  <div
                    key={channel.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={channel.channelThumbnail} alt={channel.channelName} />
                        <AvatarFallback>
                          <Youtube className="w-6 h-6" />
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{channel.channelName}</h3>
                          {channel.tokenExpired ? (
                            <Badge variant="destructive">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Expired
                            </Badge>
                          ) : (
                            <Badge variant="default">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Connected
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {formatNumber(channel.subscriberCount)} subscribers
                          </div>
                          <div className="flex items-center gap-1">
                            <Video className="w-3 h-3" />
                            {formatNumber(channel.videoCount)} videos
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {formatNumber(channel.viewCount)} views
                          </div>
                        </div>
                        
                        {channel.tokenExpired && (
                          <p className="text-xs text-red-600 mt-1">
                            Authentication expired. Please reconnect to continue using this channel.
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {channel.tokenExpired && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={connectYouTube}
                          disabled={connecting}
                        >
                          Reconnect
                        </Button>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => disconnectChannel(channel.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Another Channel */}
              <div className="mt-4 pt-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={connectYouTube}
                  disabled={connecting}
                  className="w-full"
                >
                  {connecting ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Connect Another Channel
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Features Preview */}
      {channels.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">What you can do now:</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Video className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">Video Analytics</h4>
                  <p className="text-sm text-muted-foreground">
                    Track performance metrics for all your videos
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <RefreshCw className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium">AI Content Ideas</h4>
                  <p className="text-sm text-muted-foreground">
                    Generate video ideas based on your top content
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Eye className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">Performance Insights</h4>
                  <p className="text-sm text-muted-foreground">
                    Understand what makes your content successful
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Users className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-medium">Audience Analytics</h4>
                  <p className="text-sm text-muted-foreground">
                    Learn more about your viewers and engagement
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}