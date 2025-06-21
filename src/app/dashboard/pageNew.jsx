import { HeroSection } from "@/components/dashboard/HeroSection";
import { CourseSection } from "@/components/dashboard/CourseSection";
import { ContinueWatching } from "@/components/dashboard/ContinueWatching";
import { YourLesson } from "@/components/dashboard/YourLesson";
import { StatisticCard } from "@/components/dashboard/StatisticCard";
import { MentorCard } from "@/components/dashboard/MentorCard";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero Section */}
          <HeroSection />
          
          {/* Course Categories */}
          <CourseSection />
          
          {/* Continue Watching */}
          <ContinueWatching />
          
          {/* Your Lesson */}
          <YourLesson />
        </div>

        {/* Right Column - Sidebar Content */}
        <div className="space-y-6">
          {/* Statistics */}
          <StatisticCard />
          
          {/* Mentor */}
          <MentorCard />
        </div>
      </div>
    </div>
  );
}
