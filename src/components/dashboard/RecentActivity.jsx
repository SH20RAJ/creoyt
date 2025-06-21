"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  ArrowRight,
  FileText,
  Video,
  BarChart3,
  Lightbulb
} from "lucide-react";

const recentLessons = [
  {
    id: 1,
    mentor: "Padhang Satio",
    date: "27/4/2024",
    type: "UI/UX DESIGN",
    title: "Understand Of UI/UX Design",
    status: "completed"
  },
  {
    id: 2, 
    mentor: "Leonardo Samuel",
    date: "25/4/2024",
    type: "FRONT END",
    title: "Advanced React Patterns",
    status: "in-progress"
  },
  {
    id: 3,
    mentor: "Bayu Seito", 
    date: "23/4/2024",
    type: "BRANDING",
    title: "Brand Identity Fundamentals",
    status: "pending"
  }
];

const getStatusColor = (status) => {
  switch (status) {
    case 'completed':
      return 'bg-green-500/10 text-green-600 border-green-200';
    case 'in-progress':
      return 'bg-blue-500/10 text-blue-600 border-blue-200';
    case 'pending':
      return 'bg-yellow-500/10 text-yellow-600 border-yellow-200';
    default:
      return 'bg-secondary text-text-secondary';
  }
};

const getTypeIcon = (type) => {
  switch (type) {
    case 'UI/UX DESIGN':
      return <FileText className="h-4 w-4" />;
    case 'FRONT END':
      return <Video className="h-4 w-4" />;
    case 'BRANDING':
      return <Lightbulb className="h-4 w-4" />;
    default:
      return <BarChart3 className="h-4 w-4" />;
  }
};

export function RecentActivity() {
  return (
    <Card className="shadow-card">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-subheading font-semibold">Your Lesson</CardTitle>
          <Button variant="ghost" size="sm" className="text-primary">
            See all
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentLessons.map((lesson) => (
            <div 
              key={lesson.id}
              className="flex items-center gap-4 p-3 rounded-medium border border-border hover:bg-secondary/50 transition-colors cursor-pointer"
            >
              {/* Avatar */}
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground text-sm font-semibold">
                  {lesson.mentor.split(' ').map(n => n[0]).join('')}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-body font-medium text-text-primary">
                    {lesson.mentor}
                  </span>
                  <span className="text-caption text-text-secondary">•</span>
                  <span className="text-caption text-text-secondary">{lesson.date}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {getTypeIcon(lesson.type)}
                    <span className="ml-1">{lesson.type}</span>
                  </Badge>
                </div>
                <h4 className="text-body font-medium text-text-primary truncate">
                  {lesson.title}
                </h4>
              </div>

              {/* Status */}
              <div className="flex items-center gap-2">
                <Badge className={`text-xs ${getStatusColor(lesson.status)}`}>
                  {lesson.status}
                </Badge>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
