import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlayCircle } from "lucide-react";

export function YourLesson({ lessons = [] }) {
  // Default lessons if none provided
  const defaultLessons = [
    {
      id: 1,
      title: 'Understand Of UI/UX Design',
      instructor: 'Padhang Satio',
      instructorAvatar: '/avatars/padhang.jpg',
      date: '2/12/2024',
      type: 'UI/UX DESIGN',
      status: 'pending'
    }
  ];

  const lessonsToShow = lessons.length > 0 ? lessons : defaultLessons;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Your Lesson</h2>
        <Button variant="ghost" className="text-primary text-sm font-medium">
          See all
        </Button>
      </div>

      {/* Lesson Table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-4 gap-4 p-4 bg-muted/30 border-b border-border">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            MENTOR
          </div>
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            TYPE
          </div>
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            DESC
          </div>
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            ACTION
          </div>
        </div>

        {/* Lesson Rows */}
        {lessonsToShow.map((lesson) => (
          <div key={lesson.id} className="grid grid-cols-4 gap-4 p-4 items-center hover:bg-muted/10 transition-colors">
            {/* Mentor */}
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={lesson.instructorAvatar} />
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {lesson.instructor.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-foreground">{lesson.instructor}</p>
                <p className="text-xs text-muted-foreground">{lesson.date}</p>
              </div>
            </div>

            {/* Type */}
            <div>
              <Badge 
                variant="secondary" 
                className="text-xs px-2 py-1"
                style={{ 
                  backgroundColor: '#7C5CFC15',
                  color: '#7C5CFC',
                  border: 'none'
                }}
              >
                {lesson.type}
              </Badge>
            </div>

            {/* Description */}
            <div>
              <p className="text-sm text-foreground">{lesson.title}</p>
            </div>

            {/* Action */}
            <div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-8 h-8 p-0 rounded-full border border-border hover:bg-primary hover:text-white hover:border-primary"
              >
                <PlayCircle className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
