"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUser } from '@stackframe/stack';

interface YouTubeChannel {
  id: string;
  channelId: string;
  channelName: string;
  channelThumbnail?: string;
  subscriberCount?: number;
  isActive: boolean;
}

interface YouTubeContextType {
  channels: YouTubeChannel[];
  selectedChannel: YouTubeChannel | null;
  setSelectedChannel: (channel: YouTubeChannel | null) => void;
  loading: boolean;
  refetchChannels: () => Promise<void>;
}

const YouTubeContext = createContext<YouTubeContextType | undefined>(undefined);

export function YouTubeProvider({ children }: { children: ReactNode }) {
  const [channels, setChannels] = useState<YouTubeChannel[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<YouTubeChannel | null>(null);
  const [loading, setLoading] = useState(true);
  const user = useUser();

  const fetchChannels = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/youtube-channels');
      if (response.ok) {
        const data: any = await response.json();
        const channelsList = data.channels || [];
        setChannels(channelsList);
        
        // Auto-select first channel if none selected
        if (channelsList.length > 0 && !selectedChannel) {
          setSelectedChannel(channelsList[0]);
        }
        
        // If selected channel is no longer available, select first available
        if (selectedChannel && !channelsList.find((c: YouTubeChannel) => c.id === selectedChannel.id)) {
          setSelectedChannel(channelsList[0] || null);
        }
      }
    } catch (error) {
      console.error('Failed to load channels:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChannels();
  }, [user]);

  const contextValue: YouTubeContextType = {
    channels,
    selectedChannel,
    setSelectedChannel,
    loading,
    refetchChannels: fetchChannels,
  };

  return (
    <YouTubeContext.Provider value={contextValue}>
      {children}
    </YouTubeContext.Provider>
  );
}

export function useYouTube() {
  const context = useContext(YouTubeContext);
  if (context === undefined) {
    throw new Error('useYouTube must be used within a YouTubeProvider');
  }
  return context;
}
