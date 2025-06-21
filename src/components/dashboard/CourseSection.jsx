import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export function CourseSection({ courses = [] }) {
  // Default courses if none provided
  const defaultCourses = [
    {
      id: 1,
      title: 'UI/UX Design',
      category: 'Design',
      progress: 75,
      totalLessons: 12,
      completedLessons: 9,
      color: '#7C5CFC'
    },
    {
      id: 2,
      title: 'Branding',
      category: 'Marketing', 
      progress: 45,
      totalLessons: 8,
      completedLessons: 4,
      color: '#FF7043'  
    },
    {
      id: 3,
      title: 'Front End',
      category: 'Development',
      progress: 90,
      totalLessons: 15,
      completedLessons: 14,
      color: '#4CAF50'
    }
  ];

  const coursesToShow = courses.length > 0 ? courses : defaultCourses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {coursesToShow.map((course) => (
        <div 
          key={course.id}
          className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow cursor-pointer"
        >
          {/* Course Icon and Progress */}
          <div className="flex items-start justify-between mb-4">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${course.color}20` }}
            >
              <div 
                className="w-6 h-6 rounded"
                style={{ backgroundColor: course.color }}
              />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">{course.progress}%</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
          </div>

          {/* Course Title */}
          <h3 className="font-semibold text-foreground mb-2">{course.title}</h3>
          
          {/* Category Badge */}
          <Badge 
            variant="secondary" 
            className="mb-4 text-xs px-2 py-1"
            style={{ 
              backgroundColor: `${course.color}15`,
              color: course.color,
              border: 'none'
            }}
          >
            {course.category.toUpperCase()}
          </Badge>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress 
              value={course.progress} 
              className="h-2"
              style={{
                backgroundColor: '#E0E0E0'
              }}
            />
            <p className="text-xs text-muted-foreground">
              {course.completedLessons || Math.floor((course.progress / 100) * (course.totalLessons || 10))} of {course.totalLessons || 10} lessons completed
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
