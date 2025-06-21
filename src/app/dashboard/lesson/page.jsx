export const runtime = 'edge';

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Play, Clock, Users } from "lucide-react";

const lessons = [
  {
    id: 1,
    title: "Introduction to Design Systems",
    course: "UI/UX Design Fundamentals",
    duration: "45 min",
    progress: 100,
    status: "completed",
    instructor: "Presas Mahiole"
  },
  {
    id: 2,
    title: "Color Theory and Psychology",
    course: "UI/UX Design Fundamentals", 
    duration: "32 min",
    progress: 65,
    status: "in-progress",
    instructor: "Presas Mahiole"
  },
  {
    id: 3,
    title: "Typography Best Practices",
    course: "Advanced Design Principles",
    duration: "55 min",
    progress: 0,
    status: "locked",
    instructor: "Sir Dandy"
  }
];

export default function LessonPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Lessons</h1>
          <p className="text-muted-foreground">Continue your learning journey</p>
        </div>
        <Button>
          <BookOpen className="w-4 h-4 mr-2" />
          Browse Courses
        </Button>
      </div>

      {/* Lesson List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <Card key={lesson.id} className="p-6 space-y-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <Badge 
                variant={lesson.status === 'completed' ? 'default' : lesson.status === 'in-progress' ? 'secondary' : 'outline'}
                className="text-xs"
              >
                {lesson.status.replace('-', ' ')}
              </Badge>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {lesson.duration}
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">{lesson.title}</h3>
              <p className="text-sm text-muted-foreground">{lesson.course}</p>
              <p className="text-xs text-muted-foreground">by {lesson.instructor}</p>
            </div>
            
            {lesson.status !== 'locked' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-foreground">{lesson.progress}%</span>
                </div>
                <Progress value={lesson.progress} className="h-2" />
              </div>
            )}
            
            <Button 
              className="w-full" 
              variant={lesson.status === 'locked' ? 'outline' : 'default'}
              disabled={lesson.status === 'locked'}
            >
              <Play className="w-4 h-4 mr-2" />
              {lesson.status === 'completed' ? 'Review' : lesson.status === 'in-progress' ? 'Continue' : 'Unlock'}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
