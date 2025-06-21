"use client";
import { useState } from "react";
import { Search, Bell, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useUser } from "@clerk/nextjs";

export default function DashboardHeader() {
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 backdrop-blur-sm bg-card border-b border-border">
      <div className="flex w-full items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          
          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search your course..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background border-border text-sm h-10 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Messages */}
          <Button variant="ghost" size="sm" className="p-2 w-10 h-10 rounded-lg">
            <MessageSquare className="w-5 h-5 text-foreground" />
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative p-2 w-10 h-10 rounded-lg">
            <Bell className="w-5 h-5 text-foreground" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-accent border-none"
            >
              3
            </Badge>
          </Button>

          {/* User Profile */}
          <div className="flex items-center gap-3 ml-2">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-foreground">
                {user?.firstName} {user?.lastName || 'Ranti'}
              </p>
              <p className="text-xs text-muted-foreground">
                Student
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
