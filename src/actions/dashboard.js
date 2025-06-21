'use server';

import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

// Mock data for the dashboard
export async function getDashboardData() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  // Mock course data
  const courses = [
    {
      id: 1,
      title: 'UI/UX Design',
      category: 'Design',
      progress: 75,
      totalLessons: 12,
      completedLessons: 9,
      instructor: 'Sarah Johnson',
      thumbnail: '/course-thumbnails/uiux.jpg',
      color: '#7C5CFC'
    },
    {
      id: 2,
      title: 'Branding',
      category: 'Marketing',
      progress: 45,
      totalLessons: 8,
      completedLessons: 4,
      instructor: 'Mike Chen',
      thumbnail: '/course-thumbnails/branding.jpg',
      color: '#FF7043'
    },
    {
      id: 3,
      title: 'Front End',
      category: 'Development',
      progress: 90,
      totalLessons: 15,
      completedLessons: 14,
      instructor: 'Alex Rodriguez',
      thumbnail: '/course-thumbnails/frontend.jpg',
      color: '#4CAF50'
    }
  ];

  // Mock continue watching data
  const continueWatching = [
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

  // Mock lesson data
  const lessons = [
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

  // Mock statistics
  const statistics = {
    weeklyProgress: [
      { day: '1-10 Aug', value: 20 },
      { day: '11-20 Aug', value: 45 },
      { day: '21-30 Aug', value: 80 }
    ],
    totalCourses: 12,
    completedCourses: 8,
    currentStreak: 15
  };

  // Mock mentors
  const mentors = [
    {
      id: 1,
      name: 'Padhang Satio',
      role: 'Mentor',
      avatar: '/avatars/padhang.jpg',
      isFollowing: false,
      speciality: 'UI/UX Design'
    },
    {
      id: 2,
      name: 'Zakir Horizontal',
      role: 'Mentor', 
      avatar: '/avatars/zakir.jpg',
      isFollowing: true,
      speciality: 'Frontend Development'
    },
    {
      id: 3,
      name: 'Leonardo Samuel',
      role: 'Mentor',
      avatar: '/avatars/leonardo.jpg',
      isFollowing: false,
      speciality: 'Full Stack Development'
    }
  ];

  return {
    courses,
    continueWatching,
    lessons,
    statistics,
    mentors
  };
}

export async function toggleFollowMentor(mentorId) {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  // Mock API call - in real app, this would update the database
  console.log(`Toggling follow status for mentor ${mentorId}`);
  
  return { success: true };
}

export async function markLessonComplete(lessonId) {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  // Mock API call - in real app, this would update the database
  console.log(`Marking lesson ${lessonId} as complete`);
  
  return { success: true };
}

export async function updateCourseProgress(courseId, progress) {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  // Mock API call - in real app, this would update the database
  console.log(`Updating course ${courseId} progress to ${progress}%`);
  
  return { success: true };
}
