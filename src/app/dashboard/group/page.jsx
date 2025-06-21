export const runtime = 'edge';

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, MessageSquare, Calendar, Plus, Crown } from "lucide-react";

const groups = [
  {
    id: 1,
    name: "UI/UX Designers Community",
    description: "A space for designers to share ideas, get feedback, and collaborate",
    members: 245,
    category: "Design",
    isActive: true,
    lastActivity: "2 hours ago",
    role: "Member",
    image: "/groups/uiux.jpg"
  },
  {
    id: 2,
    name: "Frontend Developers Hub",
    description: "Learn, share, and grow together as frontend developers",
    members: 189,
    category: "Development",
    isActive: true,
    lastActivity: "5 hours ago",
    role: "Admin",
    image: "/groups/frontend.jpg"
  },
  {
    id: 3,
    name: "Branding & Marketing",
    description: "Discuss branding strategies and marketing techniques",
    members: 156,
    category: "Marketing",
    isActive: false,
    lastActivity: "2 days ago",
    role: "Member",
    image: "/groups/branding.jpg"
  }
];

const recentMembers = [
  { name: "Presas Mahiole", role: "Designer", avatar: "/avatars/presas.jpg" },
  { name: "Sir Dandy", role: "Developer", avatar: "/avatars/dandy.jpg" },
  { name: "Jhon Tosan", role: "Mentor", avatar: "/avatars/jhon.jpg" },
  { name: "Sarah Chen", role: "Student", avatar: "/avatars/sarah.jpg" },
  { name: "Mike Wilson", role: "Designer", avatar: "/avatars/mike.jpg" }
];

export default function GroupPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Groups</h1>
          <p className="text-muted-foreground">Connect and collaborate with your learning community</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Join Group
        </Button>
      </div>

      {/* Group Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <h3 className="text-2xl font-bold text-foreground">3</h3>
          <p className="text-sm text-muted-foreground">Total Groups</p>
        </Card>
        <Card className="p-4 text-center">
          <h3 className="text-2xl font-bold text-green-500">2</h3>
          <p className="text-sm text-muted-foreground">Active</p>
        </Card>
        <Card className="p-4 text-center">
          <h3 className="text-2xl font-bold text-primary">590</h3>
          <p className="text-sm text-muted-foreground">Total Members</p>
        </Card>
        <Card className="p-4 text-center">
          <h3 className="text-2xl font-bold text-yellow-500">1</h3>
          <p className="text-sm text-muted-foreground">Admin Role</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Groups List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Your Groups</h2>
          
          {groups.map((group) => (
            <Card key={group.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{group.name}</h3>
                        {group.role === 'Admin' && (
                          <Crown className="w-4 h-4 text-yellow-500" />
                        )}
                        <Badge 
                          variant={group.isActive ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {group.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{group.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {group.members} members
                        </span>
                        <span>Last active: {group.lastActivity}</span>
                      </div>
                    </div>
                    
                    <Badge variant="outline" className="text-xs">
                      {group.category}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    <Button size="sm">
                      View Group
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Recent Members */}
        <div className="space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold text-foreground mb-4">Recent Members</h3>
            <div className="space-y-3">
              {recentMembers.map((member, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="outline" className="w-full mt-4" size="sm">
              View All Members
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
