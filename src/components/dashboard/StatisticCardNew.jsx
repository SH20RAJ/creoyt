"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export function StatisticCard({ statistics }) {
  // Default statistics if none provided
  const defaultStatistics = {
    weeklyProgress: [
      { day: '1-10 Aug', value: 20 },
      { day: '11-20 Aug', value: 45 },
      { day: '21-30 Aug', value: 80 }
    ],
    totalCourses: 12,
    completedCourses: 8,
    currentStreak: 15
  };

  const stats = statistics || defaultStatistics;

  return (
    <div className="bg-card rounded-2xl p-6 border border-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-foreground">Statistic</h3>
        <div className="w-2 h-2 bg-muted-foreground rounded-full" />
      </div>

      {/* User Avatar and Greeting */}
      <div className="text-center mb-6">
        <div className="relative inline-block mb-3">
          <Avatar className="w-16 h-16">
            <AvatarImage src="/avatars/jason-ranti.jpg" />
            <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
              JR
            </AvatarFallback>
          </Avatar>
          <Badge 
            className="absolute -top-1 -right-1 w-6 h-6 p-0 flex items-center justify-center text-xs bg-accent text-white"
          >
            👋
          </Badge>
        </div>
        
        <h4 className="font-semibold text-foreground mb-1">Good Morning Jason 🔥</h4>
        <p className="text-xs text-muted-foreground">
          Congratulations! Learning to achieve your target
        </p>
      </div>

      {/* Progress Chart */}
      <div className="mb-6">
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.weeklyProgress}>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#9B9B9B' }}
              />
              <YAxis hide />
              <Bar 
                dataKey="value" 
                fill="#7C5CFC" 
                radius={[4, 4, 0, 0]}
                barSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Chart Labels */}
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>20</span>
          <span>40</span>
          <span>60</span>
          <span>80</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-foreground">{stats.totalCourses}</p>
          <p className="text-xs text-muted-foreground">Total Courses</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">{stats.completedCourses}</p>
          <p className="text-xs text-muted-foreground">Completed</p>
        </div>
      </div>
    </div>
  );
}
