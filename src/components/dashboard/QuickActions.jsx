"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { 
  Video, 
  FileText, 
  BarChart3, 
  Lightbulb,
  ArrowRight,
  Play,
  BookOpen,
  Users
} from "lucide-react";

const continueWatching = [
  {
    id: 1,
    title: "Beginner's Guide to Becoming a Professional Front-End Developer",
    instructor: "Leonardo Samuel",
    type: "FRONT END",
    progress: 45,
    thumbnail: "/api/placeholder/300/200",
    category: "Development"
  },
  {
    id: 2,
    title: "Optimizing User Experience with the Best UI/UX Design",
    instructor: "Bayu Seito",
    type: "UI/UX DESIGN", 
    progress: 32,
    thumbnail: "/api/placeholder/300/200",
    category: "Design"
  },
  {
    id: 3,
    title: "Rebranding and Refresh Company Image",
    instructor: "Padhang Safio",
    type: "BRANDING",
    progress: 78,
    thumbnail: "/api/placeholder/300/200", 
    category: "Marketing"
  }
];

const quickActions = [
  {
    title: "Generate Ideas",
    description: "Get AI-powered content ideas",
    icon: Lightbulb,
    href: "/dashboard/ideas",
    color: "bg-yellow-500/10 text-yellow-600"
  },
  {
    title: "Create Video",
    description: "Start a new video project",
    icon: Video,
    href: "/dashboard/projects",
    color: "bg-blue-500/10 text-blue-600"
  },
  {
    title: "Analytics",
    description: "View your performance",
    icon: BarChart3,
    href: "/dashboard/analytics", 
    color: "bg-green-500/10 text-green-600"
  }
];

export function QuickActions() {
  return (
    <div className="space-y-large">
      {/* Continue Watching Section */}
      <Card className="shadow-card">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-subheading font-semibold">Continue Watching</CardTitle>
            <Button variant="ghost" size="sm" className="text-primary">
              See all
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-medium">
            {continueWatching.map((course) => (
              <Link key={course.id} href={`/dashboard/learn/${course.id}`}>
                <Card className="group hover:shadow-lg transition-shadow cursor-pointer border-border">
                  <div className="aspect-video bg-secondary rounded-t-medium relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                    <div className="absolute bottom-3 left-3">
                      <Badge className="bg-primary text-primary-foreground text-xs">
                        {course.type}
                      </Badge>
                    </div>
                    <Button 
                      size="sm"
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full w-12 h-12 bg-primary/80 hover:bg-primary"
                    >
                      <Play className="h-4 w-4 fill-current" />
                    </Button>
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <h3 className="text-body font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    <div className="flex items-center gap-2 text-caption text-text-secondary">
                      <Users className="h-3 w-3" />
                      <span>{course.instructor}</span>
                      <span>•</span>
                      <span>{course.category}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-caption">
                        <span className="text-text-secondary">Progress</span>
                        <span className="text-text-primary font-medium">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-1">
                        <div 
                          className="bg-progress h-1 rounded-full transition-all"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-subheading font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-medium">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <Card className="group hover:shadow-md transition-shadow cursor-pointer border-border">
                  <CardContent className="p-medium text-center space-y-3">
                    <div className={`w-12 h-12 mx-auto rounded-medium ${action.color} flex items-center justify-center`}>
                      <action.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-body font-semibold group-hover:text-primary transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-caption text-text-secondary">
                        {action.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
