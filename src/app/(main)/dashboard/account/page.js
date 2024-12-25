"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Mail, User } from "lucide-react";

export default function AccountPage() {
  const { data: session, status } = useSession();

  const isUserLoading = status === "loading";

  

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent mx-auto" />
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    redirect("/join");
    return null;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-3xl mx-auto space-y-8">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={session.user.image} alt={session.user.name} />
                <AvatarFallback>
                  {session.user.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{session.user.name}</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary">Free Plan</Badge>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-muted-foreground">Member since 2024</span>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-5 w-5" />
                <span>{session.user.email}</span>
              </div>
              {session.user.username && (
                <div className="flex items-center gap-3 text-muted-foreground">
                  <User className="h-5 w-5" />
                  <span>@{session.user.username}</span>
                </div>
              )}
              <div className="flex items-center gap-3 text-muted-foreground">
                <CalendarDays className="h-5 w-5" />
                <span>Joined {new Date(session.user.createdAt || Date.now()).toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Add account settings options here */}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
              <CardDescription>Manage your linked accounts and services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Add connected accounts here */}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}