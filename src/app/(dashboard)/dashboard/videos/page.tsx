"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useYouTube } from "@/contexts/youtube-context";
import { 
  Video,
  Youtube,
  Play,
  Eye,
  ThumbsUp,
  MessageCircle,
  Calendar,
  Clock,
  Search,
  Filter,
  RefreshCw,
  ExternalLink,
  BarChart3,
  Plus,
  ChevronDown,
  TrendingUp,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

interface YouTubeVideo {
  id: string;
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  duration: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  engagementRate: number;
  tags?: string;
}

export default function VideosPage() {
  const { channels, selectedChannel, setSelectedChannel, loading: loadingChannels } = useYouTube();
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("publishedAt");
  const [filterBy, setFilterBy] = useState("all");
  const { toast } = useToast();

  // Load videos when channel changes
  useEffect(() => {
    if (selectedChannel) {
      loadVideos(selectedChannel.id);
    }
  }, [selectedChannel]);

  const loadVideos = async (channelId: string, refresh = false) => {
    setLoadingVideos(true);
    try {
      const params = new URLSearchParams({
        channelId,
        ...(refresh && { refresh: 'true' }),
        maxResults: '50'
      });

      const response = await fetch(`/api/youtube/videos?${params}`);
      if (response.ok) {
        const data = await response.json();
        setVideos(data.videos || []);
        
        if (refresh) {
          toast({
            title: "Videos Updated",
            description: `Fetched ${data.videos?.length || 0} videos from YouTube`
          });
        }
      } else {
        throw new Error('Failed to fetch videos');
      }
    } catch (error) {
      console.error('Failed to load videos:', error);
      toast({
        title: "Error",
        description: "Failed to load videos",
        variant: "destructive"
      });
    } finally {
      setLoadingVideos(false);
    }
  };

  const handleChannelConnect = () => {
    window.location.href = '/api/auth/youtube';
  };

  const handleRefreshVideos = () => {
    if (selectedChannel) {
      loadVideos(selectedChannel.id, true);
    }
  };

  const formatDuration = (duration: string) => {
    if (!duration) return "N/A";
    
    // Parse ISO 8601 duration (PT4M13S)
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return duration;
    
    const hours = parseInt(match[1] || '0');
    const minutes = parseInt(match[2] || '0');
    const seconds = parseInt(match[3] || '0');
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toLocaleString();
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    switch (filterBy) {
      case 'popular':
        return matchesSearch && video.viewCount > 1000;
      case 'recent':
        return matchesSearch && new Date(video.publishedAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      default:
        return matchesSearch;
    }
  }).sort((a, b) => {
    switch (sortBy) {
      case 'viewCount':
        return b.viewCount - a.viewCount;
      case 'likeCount':
        return b.likeCount - a.likeCount;
      case 'engagementRate':
        return b.engagementRate - a.engagementRate;
      case 'publishedAt':
      default:
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    }
  });

  if (loadingChannels) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <Skeleton className="aspect-video w-full mb-3 rounded" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-3 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (channels.length === 0) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Videos</h1>
            <p className="text-muted-foreground">
              Manage and analyze your YouTube videos
            </p>
          </div>
        </div>

        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <Youtube className="w-12 h-12 mx-auto text-red-600 mb-4" />
            <CardTitle>Connect Your YouTube Channel</CardTitle>
            <CardDescription>
              Connect your YouTube channel to start managing and analyzing your videos
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={handleChannelConnect} className="w-full">
              <Youtube className="w-4 h-4 mr-2" />
              Connect YouTube Channel
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Videos</h1>
          <p className="text-muted-foreground">
            Manage and analyze your YouTube videos
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleRefreshVideos} disabled={loadingVideos}>
            <RefreshCw className={cn("w-4 h-4 mr-2", loadingVideos && "animate-spin")} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Channel Selector & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Channel Info */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Active Channel</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedChannel && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={selectedChannel.channelThumbnail} />
                    <AvatarFallback>
                      <Youtube className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="font-medium truncate">{selectedChannel.channelName}</p>
                    {selectedChannel.subscriberCount && (
                      <p className="text-sm text-muted-foreground">
                        {formatNumber(selectedChannel.subscriberCount)} subscribers
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Videos</span>
                    <span className="font-medium">{videos.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Views</span>
                    <span className="font-medium">
                      {formatNumber(videos.reduce((sum, video) => sum + video.viewCount, 0))}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Likes</span>
                    <span className="font-medium">
                      {formatNumber(videos.reduce((sum, video) => sum + video.likeCount, 0))}
                    </span>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={handleChannelConnect}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Channel
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Views</p>
                  <p className="text-2xl font-bold">
                    {formatNumber(videos.reduce((sum, video) => sum + video.viewCount, 0))}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <ThumbsUp className="w-4 h-4 text-green-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Likes</p>
                  <p className="text-2xl font-bold">
                    {formatNumber(videos.reduce((sum, video) => sum + video.likeCount, 0))}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Video className="w-4 h-4 text-purple-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Videos</p>
                  <p className="text-2xl font-bold">{videos.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Filters & Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="publishedAt">Recent First</SelectItem>
                <SelectItem value="viewCount">Most Viewed</SelectItem>
                <SelectItem value="likeCount">Most Liked</SelectItem>
                <SelectItem value="engagementRate">Best Engagement</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Videos</SelectItem>
                <SelectItem value="popular">Popular (1K+ views)</SelectItem>
                <SelectItem value="recent">Recent (30 days)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Videos Grid */}
      {loadingVideos ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <Skeleton className="aspect-video w-full mb-3 rounded" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-3 w-2/3 mb-2" />
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredVideos.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Video className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No videos found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterBy !== 'all' 
                ? "Try adjusting your search or filters" 
                : "This channel doesn't have any videos yet"}
            </p>
            {selectedChannel && !searchTerm && filterBy === 'all' && (
              <Button onClick={handleRefreshVideos}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Videos
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <Card key={video.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {formatDuration(video.duration)}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(video.publishedAt)}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{formatNumber(video.viewCount)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="w-3 h-3" />
                      <span>{formatNumber(video.likeCount)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-3 h-3" />
                      <span>{formatNumber(video.commentCount)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t">
                    <Badge variant={video.engagementRate > 5 ? "default" : "secondary"} className="text-xs">
                      {video.engagementRate.toFixed(1)}% engagement
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          onClick={() => window.open(`https://youtube.com/watch?v=${video.videoId}`, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View on YouTube
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <BarChart3 className="w-4 h-4 mr-2" />
                          View Analytics
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}