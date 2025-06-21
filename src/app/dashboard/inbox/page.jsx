export const runtime = 'edge';

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Clock, Archive } from "lucide-react";

const messages = [
  {
    id: 1,
    sender: "Presas Mahiole",
    subject: "Assignment Review for UI/UX Course",
    preview: "Hi there! I've reviewed your assignment and have some feedback...",
    time: "2 hours ago",
    unread: true,
    avatar: "/avatars/presas.jpg"
  },
  {
    id: 2,
    sender: "Sir Dandy",
    subject: "New Course Material Available",
    preview: "I've uploaded new learning materials for the advanced animation...",
    time: "5 hours ago",
    unread: true,
    avatar: "/avatars/dandy.jpg"
  },
  {
    id: 3,
    sender: "Course System",
    subject: "Weekly Progress Summary",
    preview: "Here's your weekly learning progress summary...",
    time: "1 day ago",
    unread: false,
    avatar: null
  }
];

export default function InboxPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Inbox</h1>
          <p className="text-muted-foreground">Manage your messages and notifications</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Archive className="w-4 h-4 mr-2" />
            Archive All
          </Button>
          <Button size="sm">
            <Mail className="w-4 h-4 mr-2" />
            Compose
          </Button>
        </div>
      </div>

      {/* Message List */}
      <div className="space-y-3">
        {messages.map((message) => (
          <Card key={message.id} className={`p-4 cursor-pointer hover:shadow-md transition-shadow ${message.unread ? 'border-primary/20 bg-primary/5' : ''}`}>
            <div className="flex items-start gap-4">
              <Avatar className="w-10 h-10">
                <AvatarImage src={message.avatar} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {message.sender.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className={`font-medium ${message.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {message.sender}
                  </h3>
                  <div className="flex items-center gap-2">
                    {message.unread && (
                      <Badge className="bg-primary text-white text-xs">New</Badge>
                    )}
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {message.time}
                    </span>
                  </div>
                </div>
                
                <h4 className={`font-medium ${message.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {message.subject}
                </h4>
                
                <p className="text-sm text-muted-foreground">
                  {message.preview}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
