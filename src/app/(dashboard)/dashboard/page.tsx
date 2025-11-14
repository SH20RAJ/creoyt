"use client";

import { useEffect, useMemo, useState } from "react";
import { useUser } from "@stackframe/stack";
import { useYouTube } from "@/contexts/youtube-context";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Lightbulb, Plus, Save, Rocket, RefreshCw, ExternalLink } from "lucide-react";

type Idea = {
  title: string;
  description: string;
  reasoning?: string;
  estimatedEngagement?: number;
  tags?: string[];
};

export default function DashboardPage() {
  const user = useUser();
  const { selectedChannel, loading: loadingChannels } = useYouTube();
  const { toast } = useToast();

  const [loadingIdeas, setLoadingIdeas] = useState(false);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [topicHint, setTopicHint] = useState("");
  const [stats, setStats] = useState<any | null>(null);

  const ytStudioUrl = useMemo(() => selectedChannel?.channelId
    ? `https://studio.youtube.com/channel/${selectedChannel.channelId}/analytics`
    : `https://studio.youtube.com/`, [selectedChannel?.channelId]);

  const fetchStats = async () => {
    try {
      const res = await fetch(`/api/dashboard/stats?userId=${encodeURIComponent(user?.id || "anon")}`);
      const data: any = await res.json();
      setStats((data as any).stats);
    } catch (e) {
      // non-blocking
    }
  };

  const generateIdeas = async (refresh = false) => {
    if (!selectedChannel) {
      toast({ title: "Select a channel", description: "Connect or choose a YouTube channel first." });
      return;
    }
    setLoadingIdeas(true);
    try {
      const qs = new URLSearchParams({ channelId: selectedChannel.id });
      if (refresh) qs.set("refresh", "true");
      const res = await fetch(`/api/youtube/ideas?${qs.toString()}`);
      const data: any = await res.json();
      if (data?.ideas?.length) setIdeas((data as any).ideas);
      else setIdeas([]);
    } catch (e) {
      setIdeas([]);
    } finally {
      setLoadingIdeas(false);
    }
  };

  const saveIdea = async (idea: Idea) => {
    try {
      const res = await fetch("/api/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: idea.title,
          description: idea.description,
          contentType: "video",
          prompt: topicHint || idea.title,
        }),
      });
      if (!res.ok) throw new Error("save failed");
      toast({ title: "Saved", description: "Idea saved to your suggestions." });
    } catch (e) {
      toast({ title: "Save failed", description: "Please try again.", variant: "destructive" });
    }
  };

  const startProject = async (idea: Idea) => {
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: idea.title,
          content: idea.description + (idea.reasoning ? `\n\nWhy it works: ${idea.reasoning}` : ""),
          contentType: "video",
        }),
      });
      if (!res.ok) throw new Error("project failed");
      toast({ title: "Project created", description: "Find it in Projects." });
    } catch (e) {
      toast({ title: "Could not create project", description: "Please try again.", variant: "destructive" });
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg"><Lightbulb className="h-6 w-6 text-primary" /></div>
          <div>
            <h1 className="text-3xl font-bold">Welcome, {user?.displayName || "Creator"}</h1>
            <p className="text-muted-foreground">
              {selectedChannel ? `Channel: ${selectedChannel.channelName}` : "Connect your YouTube channel to get tailored ideas"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => window.open(ytStudioUrl, "_blank")}> <ExternalLink className="h-4 w-4 mr-2"/> Open YouTube Studio</Button>
          <Button onClick={() => generateIdeas(true)} disabled={loadingIdeas || loadingChannels}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loadingIdeas ? "animate-spin" : ""}`} /> Generate Ideas
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Projects</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{stats?.totalProjects ?? <Skeleton className="h-7 w-16" />}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Words written</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{stats?.totalWords?.toLocaleString?.() ?? <Skeleton className="h-7 w-24" />}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Avg engagement</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{stats?.avgEngagement ? `${stats.avgEngagement}%` : <Skeleton className="h-7 w-16" />}</div></CardContent>
        </Card>
      </div>

      {/* Ideas Lab */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Ideas Lab</CardTitle>
              <CardDescription>Generate high‑impact video ideas and act on them instantly</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Input placeholder="Optional topic hint" value={topicHint} onChange={(e) => setTopicHint(e.target.value)} className="w-56" />
              <Button onClick={() => generateIdeas(false)} disabled={loadingIdeas || loadingChannels}>
                <Lightbulb className="h-4 w-4 mr-2" /> Explore
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loadingIdeas ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i}><CardContent className="p-4 space-y-3"><Skeleton className="h-5 w-2/3" /><Skeleton className="h-16" /><div className="flex gap-2"><Skeleton className="h-9 w-24" /><Skeleton className="h-9 w-36" /></div></CardContent></Card>
              ))}
            </div>
          ) : ideas.length === 0 ? (
            <div className="text-sm text-muted-foreground">No ideas yet. Click Explore or Generate Ideas.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {ideas.map((idea, idx) => (
                <Card key={idx} className="hover:shadow transition-shadow">
                  <CardHeader className="pb-2"><CardTitle className="text-base">{idea.title}</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-4">{idea.description}</p>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => saveIdea(idea)}>
                        <Save className="h-4 w-4 mr-2" /> Save
                      </Button>
                      <Button size="sm" onClick={() => startProject(idea)}>
                        <Rocket className="h-4 w-4 mr-2" /> Start project
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Shortcuts */}
      <Tabs defaultValue="quick">
        <TabsList>
          <TabsTrigger value="quick">Quick links</TabsTrigger>
          <TabsTrigger value="learn">Learn</TabsTrigger>
        </TabsList>
        <TabsContent value="quick">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card><CardHeader><CardTitle>Apps</CardTitle><CardDescription>Tag, script, title tools</CardDescription></CardHeader><CardContent><Button asChild variant="outline"><a href="/dashboard/apps"><Plus className="h-4 w-4 mr-2"/>Open Apps</a></Button></CardContent></Card>
            <Card><CardHeader><CardTitle>Videos</CardTitle><CardDescription>Manage your library</CardDescription></CardHeader><CardContent><Button asChild variant="outline"><a href="/dashboard/videos">Open Videos</a></Button></CardContent></Card>
            <Card><CardHeader><CardTitle>YouTube Studio</CardTitle><CardDescription>Deep analytics and more</CardDescription></CardHeader><CardContent><Button asChild variant="outline"><a href={ytStudioUrl} target="_blank">Open Studio</a></Button></CardContent></Card>
          </div>
        </TabsContent>
        <TabsContent value="learn">
          <Card><CardContent className="text-sm text-muted-foreground p-6">Tips: Use specificity in prompts, lead with outcomes, and iterate quickly. More guides coming soon.</CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
