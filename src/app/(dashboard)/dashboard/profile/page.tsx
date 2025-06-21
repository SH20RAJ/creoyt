"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Camera, 
  MapPin, 
  Calendar,
  Award,
  Users,
  BarChart3,
  FileText,
  Star,
  Globe,
  Twitter,
  Linkedin,
  Github
} from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    displayName: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    bio: "Content creator and digital marketer passionate about AI-powered tools. Always exploring new ways to leverage technology for creative storytelling.",
    location: "San Francisco, CA",
    website: "https://johndoe.com",
    company: "Creative Studio Inc.",
    title: "Senior Content Strategist",
    joinDate: "March 2024",
    avatar: "",
    // Social Links
    twitter: "johndoe",
    linkedin: "johndoe",
    github: "johndoe",
    instagram: "johndoe"
  });

  const stats = [
    { id: "projects", label: "Projects Created", value: 24, icon: FileText },
    { id: "collaborators", label: "Collaborators", value: 8, icon: Users },
    { id: "content", label: "Content Pieces", value: 156, icon: BarChart3 },
    { id: "ideas", label: "AI Ideas Generated", value: 342, icon: Award }
  ];

  const achievements = [
    {
      id: "early-adopter",
      title: "Early Adopter",
      description: "One of the first 1000 users",
      date: "March 2024",
      icon: Star
    },
    {
      id: "content-master",
      title: "Content Master",
      description: "Created 100+ content pieces",
      date: "November 2024",
      icon: Award
    },
    {
      id: "collaborator",
      title: "Team Player",
      description: "Collaborated on 10+ projects",
      date: "December 2024",
      icon: Users
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "project",
      title: "Created new project 'Q1 2025 Strategy'",
      date: "2 hours ago"
    },
    {
      id: 2,
      type: "content",
      title: "Generated 5 new content ideas",
      date: "5 hours ago"
    },
    {
      id: 3,
      type: "collaboration",
      title: "Invited Sarah to 'Blog Series' project",
      date: "1 day ago"
    },
    {
      id: 4,
      type: "analytics",
      title: "Viewed analytics dashboard",
      date: "2 days ago"
    }
  ];

  const updateProfile = (key: string, value: string) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to your backend
    console.log("Saving profile:", profile);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <User className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your public profile and personal information
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="relative inline-block">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={profile.avatar} />
                      <AvatarFallback className="text-2xl">
                        {profile.displayName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-xl font-bold">{profile.displayName}</h2>
                    <p className="text-gray-600 dark:text-gray-400">@{profile.username}</p>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      Joined {profile.joinDate}
                    </div>
                  </div>

                  <div className="space-y-2">
                    {profile.title && (
                      <p className="font-medium text-blue-600">{profile.title}</p>
                    )}
                    {profile.company && (
                      <p className="text-sm text-gray-600">{profile.company}</p>
                    )}
                    {profile.location && (
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        {profile.location}
                      </div>
                    )}
                  </div>

                  {profile.bio && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-left">
                      {profile.bio}
                    </p>
                  )}

                  {/* Social Links */}
                  <div className="flex justify-center gap-2">
                    {profile.website && (
                      <Button variant="outline" size="sm">
                        <Globe className="w-4 h-4" />
                      </Button>
                    )}
                    {profile.twitter && (
                      <Button variant="outline" size="sm">
                        <Twitter className="w-4 h-4" />
                      </Button>
                    )}
                    {profile.linkedin && (
                      <Button variant="outline" size="sm">
                        <Linkedin className="w-4 h-4" />
                      </Button>
                    )}
                    {profile.github && (
                      <Button variant="outline" size="sm">
                        <Github className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <Button 
                    onClick={() => setIsEditing(!isEditing)}
                    className="w-full"
                    variant={isEditing ? "outline" : "default"}
                  >
                    {isEditing ? "Cancel Edit" : "Edit Profile"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {stats.map((stat) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={stat.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                          <IconComponent className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</span>
                      </div>
                      <span className="font-bold text-lg">{stat.value}</span>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Edit Profile Form */}
            {isEditing && (
              <Card>
                <CardHeader>
                  <CardTitle>Edit Profile</CardTitle>
                  <CardDescription>
                    Update your profile information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input
                        id="displayName"
                        value={profile.displayName}
                        onChange={(e) => updateProfile("displayName", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={profile.username}
                        onChange={(e) => updateProfile("username", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => updateProfile("bio", e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Job Title</Label>
                      <Input
                        id="title"
                        value={profile.title}
                        onChange={(e) => updateProfile("title", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={profile.company}
                        onChange={(e) => updateProfile("company", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profile.location}
                        onChange={(e) => updateProfile("location", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={profile.website}
                        onChange={(e) => updateProfile("website", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input
                        id="twitter"
                        value={profile.twitter}
                        onChange={(e) => updateProfile("twitter", e.target.value)}
                        placeholder="username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={profile.linkedin}
                        onChange={(e) => updateProfile("linkedin", e.target.value)}
                        placeholder="username"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave}>
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>
                  Your milestones and accomplishments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => {
                    const IconComponent = achievement.icon;
                    return (
                      <div key={achievement.id} className="flex items-start gap-3 p-4 border rounded-lg">
                        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                          <IconComponent className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-semibold">{achievement.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {achievement.description}
                          </p>
                          <p className="text-xs text-gray-500">{achievement.date}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your latest actions and updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 pb-4 border-b last:border-b-0">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-gray-500">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
