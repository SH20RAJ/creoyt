"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Save, Copy, RefreshCw, Image as ImageIcon, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const limits = {
  title: 100,
  description: 5000,
  tags: 500,
  keywords: 5000,
};

type Mode = "ai" | "scraped";

export default function ProjectDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [mode, setMode] = useState<Mode>("ai");
  const [rephraseLoading, setRephraseLoading] = useState<string | null>(null);
  const [thumbnailLoading, setThumbnailLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailPrompt, setThumbnailPrompt] = useState("");
  const [tags, setTags] = useState("");
  const [playlists, setPlaylists] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`);
        const data: any = await res.json();
        if (res.ok) {
          const p = data.project;
          let c: any = {};
          try { c = JSON.parse(p.content || '{}'); } catch {}
          setTitle((c.title as string) || p.title || "");
          setDescription((c.description as string) || "");
          setThumbnailPrompt((c.thumbnailPrompt as string) || "");
          setTags((Array.isArray(c.tags) ? c.tags.join(', ') : (c.tags || '')) as string);
          setPlaylists((Array.isArray(c.playlists) ? c.playlists.join(', ') : (c.playlists || '')) as string);
          const kw = Array.isArray(c.keywords)
            ? c.keywords
            : typeof c.keywords === 'string'
              ? c.keywords.split(',').map((s: string) => s.trim()).filter(Boolean)
              : [];
          setKeywords(kw);
          if (c.thumbnailUrl) setThumbnailUrl(c.thumbnailUrl as string);
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const counters = {
    title: `${title.length}/${limits.title}`,
    description: `${description.length}/${limits.description}`,
    tags: `${tags.length}/${limits.tags}`,
    keywords: `${keywords.join(', ').length}/${limits.keywords}`,
  };

  const copy = (value: string) => {
    navigator.clipboard.writeText(value);
    toast({ title: "Copied", description: "Copied to clipboard" });
  };

  const rephrase = async (field: string, current: string) => {
    if (!current.trim()) return;
    const prompt = window.prompt("Extra guidance (optional)", "");
    setRephraseLoading(field);
    try {
      const res = await fetch('/api/projects/rephrase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ field, text: current, prompt }),
      });
      const data: any = await res.json();
      if (res.ok) {
        const result = (data.result as string) || current;
        switch (field) {
          case 'title': setTitle(result.slice(0, limits.title)); break;
          case 'description': setDescription(result.slice(0, limits.description)); break;
          case 'tags': setTags(result.slice(0, limits.tags)); break;
          case 'playlists': setPlaylists(result); break;
          case 'keywords': setKeywords(result.split(',').map((s: string) => s.trim()).filter(Boolean)); break;
          case 'thumbnailPrompt': setThumbnailPrompt(result); break;
        }
      } else {
        toast({ title: 'Rephrase failed', variant: 'destructive' });
      }
    } finally {
      setRephraseLoading(null);
    }
  };

  const generate = async (genMode: Mode) => {
    const query = title || keywords.join(', ') || description.slice(0, 120);
    if (!query) {
      toast({ title: 'Add content', description: 'Provide a title or keywords first', variant: 'destructive' });
      return;
    }
    const res = await fetch('/api/projects/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, mode: genMode }),
    });
    const data: any = await res.json();
    if (res.ok) {
      if (data.title) setTitle(data.title.slice(0, limits.title));
      if (data.description) setDescription(data.description.slice(0, limits.description));
      if (data.thumbnailPrompt) setThumbnailPrompt(data.thumbnailPrompt);
      if (data.tags) setTags((data.tags as string[]).join(', '));
      if (data.playlists) setPlaylists((data.playlists as string[]).join(', '));
      if (data.keywords) setKeywords(data.keywords as string[]);
    } else {
      toast({ title: 'Generation failed', variant: 'destructive' });
    }
  };

  const save = async () => {
    try {
      setSaving(true);
      const body = {
        title,
        description,
        thumbnailPrompt,
        tags: tags.split(',').map(s => s.trim()).filter(Boolean),
        playlists: playlists.split(',').map(s => s.trim()).filter(Boolean),
        keywords,
        thumbnailUrl,
      };
      const res = await fetch(`/api/projects/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (res.ok) toast({ title: 'Saved', description: 'Project updated' });
      else toast({ title: 'Save failed', variant: 'destructive' });
    } finally { setSaving(false); }
  };

  const addKeyword = () => {
    const value = keywordInput.trim();
    if (!value) return;
    setKeywords(prev => Array.from(new Set([...prev, value])));
    setKeywordInput('');
  };

  const removeKeyword = (kw: string) => setKeywords(prev => prev.filter(item => item !== kw));

  const generateThumbnail = async () => {
    if (!thumbnailPrompt.trim()) {
      toast({ title: 'Prompt needed', description: 'Add a thumbnail prompt first', variant: 'destructive' });
      return;
    }
    setThumbnailLoading(true);
    try {
      const res = await fetch('/api/projects/thumbnail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: thumbnailPrompt }),
      });
      const data: any = await res.json();
      if (res.ok && data.image) {
        setThumbnailUrl(data.image as string);
      } else {
        toast({ title: 'Thumbnail generation failed', variant: 'destructive' });
      }
    } finally {
      setThumbnailLoading(false);
    }
  };

  if (loading) {
    return <div className="text-sm text-muted-foreground">Loading…</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Video details</h1>
          <p className="text-muted-foreground">Fine-tune your metadata before export</p>
        </div>
        <div className="flex items-center gap-2">
          <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)}>
            <TabsList>
              <TabsTrigger value="ai">AI</TabsTrigger>
              <TabsTrigger value="scraped">Scraped</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" onClick={() => generate(mode)}>
            <Sparkles className="h-4 w-4 mr-2" />Generate
          </Button>
          <Button onClick={save} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />Save
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Title (required)</span>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{counters.title}</span>
              <Button size="icon" variant="ghost" onClick={() => copy(title)}><Copy className="h-4 w-4" /></Button>
              <Button size="icon" variant="ghost" onClick={() => rephrase('title', title)} disabled={rephraseLoading === 'title'}>
                {rephraseLoading === 'title' ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input value={title} onChange={(e) => setTitle(e.target.value.slice(0, limits.title))} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Description</span>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{counters.description}</span>
              <Button size="icon" variant="ghost" onClick={() => copy(description)}><Copy className="h-4 w-4" /></Button>
              <Button size="icon" variant="ghost" onClick={() => rephrase('description', description)} disabled={rephraseLoading === 'description'}>
                {rephraseLoading === 'description' ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              </Button>
            </div>
          </CardTitle>
          <CardDescription>Keep it SEO-friendly with hooks, CTAs, and key sections.</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value.slice(0, limits.description))} className="min-h-40" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Tags</span>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{counters.tags}</span>
                <Button size="icon" variant="ghost" onClick={() => copy(tags)}><Copy className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => rephrase('tags', tags)} disabled={rephraseLoading === 'tags'}>
                  {rephraseLoading === 'tags' ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                </Button>
              </div>
            </CardTitle>
            <CardDescription>Comma separated, up to 500 characters total</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea value={tags} onChange={(e) => setTags(e.target.value.slice(0, limits.tags))} className="min-h-24" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Playlists</span>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Button size="icon" variant="ghost" onClick={() => copy(playlists)}><Copy className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => rephrase('playlists', playlists)} disabled={rephraseLoading === 'playlists'}>
                  {rephraseLoading === 'playlists' ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                </Button>
              </div>
            </CardTitle>
            <CardDescription>Comma separated list</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea value={playlists} onChange={(e) => setPlaylists(e.target.value)} className="min-h-24" />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Keywords</span>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{counters.keywords}</span>
                <Button size="icon" variant="ghost" onClick={() => copy(keywords.join(', '))}><Copy className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => rephrase('keywords', keywords.join(', '))} disabled={rephraseLoading === 'keywords'}>
                  {rephraseLoading === 'keywords' ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                </Button>
              </div>
            </CardTitle>
            <CardDescription>Keywords shown as chips. Press Enter to add more.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-3">
              {keywords.map((kw) => (
                <span key={kw} className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs">
                  {kw}
                  <button onClick={() => removeKeyword(kw)} className="text-muted-foreground hover:text-foreground">×</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add keyword"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') { e.preventDefault(); addKeyword(); }
                }}
              />
              <Button type="button" onClick={addKeyword}>Add</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Thumbnail Prompt</span>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Button size="icon" variant="ghost" onClick={() => copy(thumbnailPrompt)}><Copy className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => rephrase('thumbnailPrompt', thumbnailPrompt)} disabled={rephraseLoading === 'thumbnailPrompt'}>
                  {rephraseLoading === 'thumbnailPrompt' ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea value={thumbnailPrompt} onChange={(e) => setThumbnailPrompt(e.target.value)} className="min-h-24" />
            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={generateThumbnail} disabled={thumbnailLoading}>
                {thumbnailLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <ImageIcon className="h-4 w-4 mr-2" />}
                Generate Thumbnail
              </Button>
              {thumbnailUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a href={thumbnailUrl} download={`thumbnail-${Date.now()}.png`}>Download</a>
                </Button>
              )}
            </div>
            {thumbnailUrl && (
              <img src={thumbnailUrl} alt="Generated thumbnail" className="w-full max-w-md rounded-md border" />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

