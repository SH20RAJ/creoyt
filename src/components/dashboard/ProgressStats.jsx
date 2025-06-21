"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp,
  Users,
  MessageSquare,
  Plus,
  Award,
  Target
} from "lucide-react";

const stats = {
  weeklyProgress: 85,
  totalVideos: 47,
  totalViews: "12.4K",
  engagement: 89
};

const mentors = [
  {
    id: 1,
    name: "Padhang Satio",
    role: "Mentor",
    avatar: "/api/placeholder/40/40",
    isFollowing: true
  },
  {
    id: 2,
    name: "Zakir Horizontal", 
    role: "Mentor",
    avatar: "/api/placeholder/40/40",
    isFollowing: false
  },
  {
    id: 3,
    name: "Leonardo Samuel",
    role: "Mentor", 
    avatar: "/api/placeholder/40/40",
    isFollowing: true
  }
];

export function ProgressStats() {
  return (
    <div className="space-y-large">
      {/* Greeting Card */}
      <Card className="shadow-card text-center">
        <CardContent className="p-medium space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto flex items-center justify-center">
            <span className="text-2xl">🔥</span>
          </div>
          <div>
            <h3 className="text-subheading font-semibold text-text-primary mb-1">
              Good Morning Jason 👋
            </h3>
            <p className="text-caption text-text-secondary">
              Keep working to achieve your target
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-body font-semibold">Statistic</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Weekly Progress */}
          <div className="text-center space-y-3">
            <div className="relative w-24 h-24 mx-auto">
              <div className="w-24 h-24 rounded-full border-8 border-secondary relative">
                <div 
                  className="absolute top-0 left-0 w-24 h-24 rounded-full border-8 border-progress border-t-transparent border-r-transparent transform rotate-45"
                  style={{ 
                    background: `conic-gradient(from 0deg, #A192F8 ${stats.weeklyProgress * 3.6}deg, transparent ${stats.weeklyProgress * 3.6}deg)`
                  }}
                />
                <div className="absolute inset-2 bg-card rounded-full flex items-center justify-center">
                  <span className="text-body font-bold text-primary">{stats.weeklyProgress}%</span>
                </div>
              </div>
            </div>
            <div>
              <div className="text-caption text-text-secondary">Weekly Progress</div>
              <div className="text-body font-semibold text-text-primary">85% Complete</div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-medium bg-secondary text-center">
              <div className="text-subheading font-bold text-text-primary">{stats.totalVideos}</div>
              <div className="text-caption text-text-secondary">Videos</div>
            </div>
            <div className="p-3 rounded-medium bg-secondary text-center">
              <div className="text-subheading font-bold text-text-primary">{stats.totalViews}</div>
              <div className="text-caption text-text-secondary">Views</div>
            </div>
          </div>

          <div className="p-3 rounded-medium bg-secondary text-center">
            <div className="text-subheading font-bold text-text-primary">{stats.engagement}%</div>
            <div className="text-caption text-text-secondary">Engagement Rate</div>
          </div>
        </CardContent>
      </Card>

      {/* Your Mentor */}
      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-body font-semibold">Your Mentor</CardTitle>
            <Button variant="ghost" size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={mentor.avatar} />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  {mentor.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="text-body font-medium text-text-primary truncate">
                  {mentor.name}
                </div>
                <div className="text-caption text-text-secondary">{mentor.role}</div>
              </div>
              <Button 
                variant={mentor.isFollowing ? "secondary" : "default"}
                size="sm"
                className="text-xs"
              >
                {mentor.isFollowing ? "Following" : "Follow"}
              </Button>
            </div>
          ))}
          
          <Button variant="ghost" className="w-full text-primary mt-3">
            See All
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
