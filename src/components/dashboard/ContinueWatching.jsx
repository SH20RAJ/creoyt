import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";

export function ContinueWatching({ videos = [] }) {
  // Default videos if none provided
  const defaultVideos = [
    {
      id: 1,
      title: "Beginner's Guide to Becoming a Professional Front-End Developer",
      instructor: 'Leonardo Samuel',
      instructorRole: 'Mentor',
      thumbnail: '/videos/frontend-guide.jpg',
      progress: 65,
      duration: '45 min',
      category: 'FRONT END'
    },
    {
      id: 2,
      title: "Optimizing User Experience with the Best UI/UX Design",
      instructor: 'Bayu Setio',
      instructorRole: 'Mentor', 
      thumbnail: '/videos/ux-optimization.jpg',
      progress: 30,
      duration: '35 min',
      category: 'UI/UX DESIGN'
    },
    {
      id: 3,
      title: "Reviving and Refresh Company Image",
      instructor: 'Padhang Satio',
      instructorRole: 'Mentor',
      thumbnail: '/videos/company-branding.jpg',
      progress: 80,
      duration: '28 min',
      category: 'BRANDING'
    }
  ];

  const videosToShow = videos.length > 0 ? videos : defaultVideos;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Continue Watching</h2>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Video Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {videosToShow.map((video) => (
          <div key={video.id} className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-shadow">
            {/* Thumbnail */}
            <div className="relative aspect-video bg-muted">
              <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted-foreground/20" />
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 w-8 h-8 p-0 bg-white/20 hover:bg-white/30 backdrop-blur-sm"
              >
                <Heart className="w-4 h-4 text-white" />
              </Button>
              
              {/* Category Badge */}
              <Badge 
                className="absolute bottom-2 left-2 text-xs px-2 py-1 bg-primary text-white"
              >
                {video.category}
              </Badge>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-medium text-foreground mb-3 line-clamp-2 leading-snug">
                {video.title}
              </h3>

              {/* Instructor */}
              <div className="flex items-center gap-2 mb-3">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={`/avatars/${video.instructor.toLowerCase().replace(' ', '-')}.jpg`} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {video.instructor.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground">{video.instructor}</p>
                  <p className="text-xs text-muted-foreground">{video.instructorRole}</p>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <Progress value={video.progress} className="h-1" />
                <p className="text-xs text-muted-foreground">
                  {video.progress}% complete • {video.duration}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
