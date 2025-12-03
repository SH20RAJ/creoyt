"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useYouTube } from "@/contexts/youtube-context";
import { useToast } from "@/hooks/use-toast";
import { Save, Copy, Download, Sparkles, Search, FolderOpen, MoreHorizontal, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

type GenResult = {
  title: string;
  description: string;
  thumbnailPrompt: string;
  tags: string[];
  playlists: string[];
  keywords: string[];
  source: 'ai' | 'scraped';
};

export default function ProjectsPage() {
  const { selectedChannel } = useYouTube();
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<'ai' | 'scraped'>('ai');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenResult | null>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [tab, setTab] = useState<'list' | 'create'>('list');
  const [filter, setFilter] = useState('');

  const channelId = selectedChannel?.id || '';
  const router = useRouter();

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      if (res.ok) {
        const data: any = await res.json();
        setProjects(data.projects || []);
      }
    } catch {}
  };

  useEffect(() => { fetchProjects(); }, []);

  const generate = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/projects/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, mode, channelId }),
      });
      const data: any = await res.json();
      if (res.ok) {
        setResult({
          title: data.title || query,
          description: data.description || '',
          thumbnailPrompt: data.thumbnailPrompt || `Thumbnail for: ${query}`,
          tags: data.tags || [],
          playlists: data.playlists || [],
          keywords: data.keywords || [],
          source: data.source || mode,
        });
      } else {
        toast({ title: 'Generation failed', description: data?.error || 'Try again', variant: 'destructive' });
      }
    } catch (e) {
      toast({ title: 'Generation failed', description: 'Network error', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const copyAll = () => {
    if (!result) return;
    const text = `Title: ${result.title}\n\nDescription:\n${result.description}\n\nThumbnail Prompt:\n${result.thumbnailPrompt}\n\nTags: ${result.tags.join(', ')}\nPlaylists: ${result.playlists.join(', ')}\nKeywords: ${result.keywords.join(', ')}`;
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied', description: 'All fields copied to clipboard' });
  };

  const exportJson = () => {
    if (!result) return;
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `yt-project-${Date.now()}.json`; a.click();
    URL.revokeObjectURL(url);
  };

  const saveProject = async () => {
    if (!result) return;
    const body = {
      title: result.title,
      content: JSON.stringify(result),
      contentType: 'video',
    };
    const res = await fetch('/api/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (res.ok) { toast({ title: 'Saved', description: 'Project saved' }); fetchProjects(); }
    else { toast({ title: 'Save failed', description: 'Try again', variant: 'destructive' }); }
  };

  return (
    <div className="space-y-6">
      <Tabs value={tab} onValueChange={(v) => setTab(v as any)}>
        <TabsList>
          <TabsTrigger value="list">Projects</TabsTrigger>
          <TabsTrigger value="create">Create</TabsTrigger>
        </TabsList>

        {/* LIST TAB — YouTube Studio style */}
        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Channel content</CardTitle>
              <CardDescription>Projects generated or saved from YT Copilot</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Search across your projects" className="pl-9" />
                </div>
                <Button variant="outline" onClick={fetchProjects}>Refresh</Button>
                <Button onClick={() => setTab('create')}><Sparkles className="h-4 w-4 mr-2" />New</Button>
              </div>

              {projects.length === 0 ? (
                <div className="text-sm text-muted-foreground py-12 text-center">
                  <FolderOpen className="h-7 w-7 mx-auto mb-2" />No projects yet
                </div>
              ) : (
                <div className="overflow-auto rounded-md border">
                  <table className="w-full text-sm">
                    <thead className="text-muted-foreground">
                      <tr className="bg-muted/50">
                        <th className="w-10 p-3 text-left"><input type="checkbox" aria-label="select-all" /></th>
                        <th className="p-3 text-left">Project</th>
                        <th className="p-3 text-left">Visibility</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-left">Date</th>
                        <th className="w-10 p-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects
                        .filter((p) => !filter || p.title.toLowerCase().includes(filter.toLowerCase()))
                        .map((p) => {
                          let meta: any = {};
                          try { meta = JSON.parse(p.content || '{}'); } catch {}
                          const desc = meta.description || '';
                          return (
                            <tr key={p.id} className="border-t hover:bg-accent/40 cursor-pointer" onClick={() => router.push(`/dashboard/projects/${p.id}`)}>
                              <td className="p-3 align-top"><input type="checkbox" aria-label="select-row" /></td>
                              <td className="p-3">
                                <div className="flex gap-3">
                                  <div className="h-12 w-20 rounded bg-gradient-to-br from-primary/20 to-primary/5 border flex items-center justify-center text-xs text-muted-foreground">
                                    {meta.thumbnailPrompt ? 'IMG' : '—'}
                                  </div>
                                  <div className="min-w-0">
                                    <div className="font-medium leading-tight truncate">{p.title}</div>
                                    <div className="text-muted-foreground line-clamp-2 text-xs">{desc}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="p-3 align-top">Private</td>
                              <td className="p-3 align-top capitalize">{p.status || 'draft'}</td>
                              <td className="p-3 align-top">{new Date(p.createdAt).toLocaleDateString()}</td>
                              <td className="p-3 align-top">
                                <div className="flex items-center gap-1">
                                  <Button variant="ghost" size="icon" onClick={async () => {
                                    const ok = confirm('Delete this project?');
                                    if (!ok) return;
                                    const res = await fetch(`/api/projects?id=${p.id}`, { method: 'DELETE' });
                                    if (res.ok) { fetchProjects(); }
                                  }}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* CREATE TAB — generator */}
        <TabsContent value="create" className="space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>New Project</CardTitle>
            <CardDescription>Turn an idea into a complete YouTube package</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Idea or topic (e.g., How to learn Python in 7 days)" value={query} onChange={(e) => setQuery(e.target.value)} />
            <Tabs value={mode} onValueChange={(v) => setMode(v as 'ai' | 'scraped')}>
              <TabsList>
                <TabsTrigger value="ai">AI Generated</TabsTrigger>
                <TabsTrigger value="scraped">Scraped (SEO)</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex gap-2">
              <Button onClick={generate} disabled={loading}>
                <Sparkles className={`h-4 w-4 mr-2 ${loading ? 'animate-pulse' : ''}`} />
                {loading ? 'Generating...' : 'Generate'}
              </Button>
              {result && (
                <>
                  <Button variant="outline" onClick={copyAll}><Copy className="h-4 w-4 mr-2" />Copy all</Button>
                  <Button variant="outline" onClick={exportJson}><Download className="h-4 w-4 mr-2" />Export JSON</Button>
                  <Button onClick={saveProject}><Save className="h-4 w-4 mr-2" />Save project</Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {result && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm">Title</CardTitle></CardHeader>
              <CardContent><Textarea className="min-h-20" defaultValue={result.title} readOnly /></CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm">Thumbnail Prompt</CardTitle></CardHeader>
              <CardContent><Textarea className="min-h-20" defaultValue={result.thumbnailPrompt} readOnly /></CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardHeader className="pb-2"><CardTitle className="text-sm">Description</CardTitle></CardHeader>
              <CardContent><Textarea className="min-h-40" defaultValue={result.description} readOnly /></CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm">Tags</CardTitle></CardHeader>
              <CardContent><Textarea className="min-h-24" defaultValue={result.tags.join(', ')} readOnly /></CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm">Playlists</CardTitle></CardHeader>
              <CardContent><Textarea className="min-h-24" defaultValue={result.playlists.join(', ')} readOnly /></CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardHeader className="pb-2"><CardTitle className="text-sm">Keywords</CardTitle></CardHeader>
              <CardContent><Textarea className="min-h-24" defaultValue={result.keywords.join(', ')} readOnly /></CardContent>
            </Card>
          </div>
        )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
