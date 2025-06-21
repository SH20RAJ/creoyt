'use server';

import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export async function searchCourses(query) {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  // Mock search functionality
  const allCourses = [
    { id: 1, title: 'UI/UX Design', category: 'Design', instructor: 'Sarah Johnson' },
    { id: 2, title: 'Branding', category: 'Marketing', instructor: 'Mike Chen' },
    { id: 3, title: 'Front End Development', category: 'Development', instructor: 'Alex Rodriguez' },
    { id: 4, title: 'React Advanced', category: 'Development', instructor: 'John Doe' },
    { id: 5, title: 'Figma Mastery', category: 'Design', instructor: 'Jane Smith' },
  ];

  const filteredCourses = allCourses.filter(course => 
    course.title.toLowerCase().includes(query.toLowerCase()) ||
    course.category.toLowerCase().includes(query.toLowerCase()) ||
    course.instructor.toLowerCase().includes(query.toLowerCase())
  );

  return filteredCourses;
}

export async function enrollInCourse(courseId) {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  // Mock enrollment
  console.log(`User ${userId} enrolled in course ${courseId}`);
  
  return { success: true, message: 'Successfully enrolled in course!' };
}

export async function getNotifications() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  // Mock notifications
  return [
    {
      id: 1,
      title: 'New lesson available',
      message: 'UI/UX Design - Lesson 10 is now available',
      time: '2 minutes ago',
      read: false
    },
    {
      id: 2,
      title: 'Assignment due',
      message: 'Front End Development assignment due tomorrow',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      title: 'Course completed',
      message: 'Congratulations! You completed Branding course',
      time: '2 days ago',
      read: true
    }
  ];
}

export async function markNotificationRead(notificationId) {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  // Mock marking notification as read
  console.log(`Notification ${notificationId} marked as read for user ${userId}`);
  
  return { success: true };
}
