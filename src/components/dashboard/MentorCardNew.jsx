"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, UserPlus } from "lucide-react";
import { toggleFollowMentor } from "@/actions/dashboard";

export function MentorCard({ mentors = [] }) {
  const [followStates, setFollowStates] = useState({});

  // Default mentors if none provided
  const defaultMentors = [
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

  const mentorsToShow = mentors.length > 0 ? mentors : defaultMentors;

  const handleToggleFollow = async (mentorId) => {
    // Update local state immediately for better UX
    const currentState = followStates[mentorId] ?? mentorsToShow.find(m => m.id === mentorId)?.isFollowing;
    setFollowStates(prev => ({
      ...prev,
      [mentorId]: !currentState
    }));

    // Call server action
    try {
      await toggleFollowMentor(mentorId);
    } catch (error) {
      // Revert state on error
      setFollowStates(prev => ({
        ...prev,
        [mentorId]: currentState
      }));
    }
  };

  return (
    <div className="bg-card rounded-2xl p-6 border border-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-foreground">Your mentor</h3>
        <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Mentor List */}
      <div className="space-y-4">
        {mentorsToShow.map((mentor) => {
          const isFollowing = followStates[mentor.id] ?? mentor.isFollowing;
          
          return (
            <div key={mentor.id} className="flex items-center justify-between">
              {/* Mentor Info */}
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={mentor.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                    {mentor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground">{mentor.name}</p>
                  <p className="text-xs text-muted-foreground">{mentor.role}</p>
                </div>
              </div>

              {/* Follow Button */}
              <Button
                variant={isFollowing ? "secondary" : "ghost"}
                size="sm"
                className={`text-xs px-3 py-1 h-auto ${
                  isFollowing 
                    ? "bg-primary/10 text-primary hover:bg-primary/20" 
                    : "text-primary hover:bg-primary/10"
                }`}
                onClick={() => handleToggleFollow(mentor.id)}
              >
                <UserPlus className="w-3 h-3 mr-1" />
                {isFollowing ? "Following" : "Follow"}
              </Button>
            </div>
          );
        })}
      </div>

      {/* See All Button */}
      <div className="mt-6 pt-4 border-t border-border">
        <Button 
          variant="ghost" 
          className="w-full text-primary text-sm font-medium hover:bg-primary/10"
        >
          See All
        </Button>
      </div>
    </div>
  );
}
