"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useYouTube } from "@/contexts/youtube-context";
import { Youtube, ChevronDown, Plus } from "lucide-react";

interface ChannelSwitcherProps {
  variant?: "default" | "compact";
  showLabel?: boolean;
  className?: string;
}

export function ChannelSwitcher({ 
  variant = "default", 
  showLabel = true,
  className = "" 
}: ChannelSwitcherProps) {
  const { channels, selectedChannel, setSelectedChannel, loading } = useYouTube();

  const handleChannelConnect = () => {
    window.location.href = '/api/auth/youtube';
  };

  if (loading) {
    return (
      <div className={`flex items-center space-x-2 px-3 py-2 ${className}`}>
        <div className="w-6 h-6 bg-muted rounded-full animate-pulse" />
        <div className="h-4 bg-muted rounded flex-1 animate-pulse" />
      </div>
    );
  }

  if (channels.length === 0) {
    return (
      <Button
        variant="outline"
        className={`justify-start h-auto p-3 ${className}`}
        onClick={handleChannelConnect}
      >
        <Plus className="w-4 h-4 mr-2" />
        <span>Connect YouTube</span>
      </Button>
    );
  }

  const formatSubscribers = (count?: number) => {
    if (!count) return '';
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M subscribers`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K subscribers`;
    }
    return `${count} subscribers`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`justify-between h-auto p-3 ${className}`}
        >
          <div className="flex items-center space-x-2 min-w-0">
            <Avatar className="w-6 h-6">
              <AvatarImage src={selectedChannel?.channelThumbnail} />
              <AvatarFallback className="text-xs">
                <Youtube className="w-3 h-3 text-red-600" />
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1 text-left">
              <p className="text-sm font-medium truncate">
                {selectedChannel?.channelName || 'Select Channel'}
              </p>
              {variant === "default" && selectedChannel?.subscriberCount && (
                <p className="text-xs text-muted-foreground">
                  {formatSubscribers(selectedChannel.subscriberCount)}
                </p>
              )}
            </div>
          </div>
          <ChevronDown className="w-4 h-4 flex-shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuLabel>Select Channel</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {channels.map((channel) => (
          <DropdownMenuItem
            key={channel.id}
            onClick={() => setSelectedChannel(channel)}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <Avatar className="w-8 h-8">
              <AvatarImage src={channel.channelThumbnail} />
              <AvatarFallback>
                <Youtube className="w-4 h-4 text-red-600" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {channel.channelName}
              </p>
              {channel.subscriberCount && (
                <p className="text-xs text-muted-foreground">
                  {formatSubscribers(channel.subscriberCount)}
                </p>
              )}
            </div>
            {selectedChannel?.id === channel.id && (
              <Badge variant="secondary" className="text-xs">Active</Badge>
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleChannelConnect} className="cursor-pointer">
          <Plus className="w-4 h-4 mr-2" />
          Connect Another Channel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}