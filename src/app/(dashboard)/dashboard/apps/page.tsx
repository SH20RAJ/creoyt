"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Grid2x2, Hash, FileText, MessageSquare, Type, Wand2, Image as ImageIcon } from "lucide-react";

type MiniResult = {
  loading: boolean;
  output: string;
};

async function generate(prompt: string, type: "social" | "marketing" | "blog" | "email") {
  const res = await fetch("/api/ai/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, type }),
  });
  if (!res.ok) throw new Error("Failed to generate");
  const data = await res.json();
  // Fix: assert type of data before accessing content
  if (typeof data === "object" && data !== null && "content" in data) {
    return (data as { content?: string }).content || "";
  }
  return "";
}

export default function AppsPage() {
  const [topic, setTopic] = useState("");
  const [descInput, setDescInput] = useState("");
  const [titleInput, setTitleInput] = useState("");

  const [tags, setTags] = useState<MiniResult>({ loading: false, output: "" });
  const [script, setScript] = useState<MiniResult>({ loading: false, output: "" });
  const [social, setSocial] = useState<MiniResult>({ loading: false, output: "" });
  const [desc, setDesc] = useState<MiniResult>({ loading: false, output: "" });
  const [titles, setTitles] = useState<MiniResult>({ loading: false, output: "" });
  const [thumb, setThumb] = useState<MiniResult>({ loading: false, output: "" });

  const run = async (
    setter: (v: MiniResult) => void,
    prompt: string,
    type: "social" | "marketing" | "blog" | "email",
  ) => {
    try {
      setter({ loading: true, output: "" });
      const out = await generate(prompt, type);
      setter({ loading: false, output: out });
    } catch (e) {
      setter({ loading: false, output: "Failed to generate. Try again." });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg"><Grid2x2 className="h-6 w-6 text-primary" /></div>
        <div>
          <h1 className="text-3xl font-bold">Apps</h1>
          <p className="text-muted-foreground">Quick mini‑apps for creators</p>
        </div>
      </div>

      <Tabs defaultValue="generators">
        <TabsList>
          <TabsTrigger value="generators">Generators</TabsTrigger>
          <TabsTrigger value="helpers">Helpers</TabsTrigger>
        </TabsList>

        <TabsContent value="generators" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Tag Generator */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Hash className="h-4 w-4" />Tag Generator</CardTitle>
                <CardDescription>SEO‑friendly keywords/hashtags for your video</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input placeholder="Video topic or title" value={topic} onChange={(e) => setTopic(e.target.value)} />
                <Button
                  disabled={!topic || tags.loading}
                  onClick={() =>
                    run(
                      setTags,
                      `Generate a comma-separated list of 20 YouTube tags and 10 hashtags for: "${topic}". Return plain text.`,
                      "marketing",
                    )
                  }
                >{tags.loading ? "Generating..." : "Generate"}</Button>
                <Textarea className="min-h-28" value={tags.output} readOnly placeholder="Results will appear here" />
              </CardContent>
            </Card>

            {/* Script Generator */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><FileText className="h-4 w-4" />Script Generator</CardTitle>
                <CardDescription>Structured outline + talking points</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input placeholder="Topic" value={topic} onChange={(e) => setTopic(e.target.value)} />
                <Button
                  disabled={!topic || script.loading}
                  onClick={() =>
                    run(
                      setScript,
                      `Write a concise YouTube script outline for "${topic}" with hook, sections, bullet points, CTA.`,
                      "blog",
                    )
                  }
                >{script.loading ? "Generating..." : "Generate"}</Button>
                <Textarea className="min-h-28" value={script.output} readOnly />
              </CardContent>
            </Card>

            {/* Social Media Post */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><MessageSquare className="h-4 w-4" />Social Media Post</CardTitle>
                <CardDescription>Multi‑platform post for your upload</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input placeholder="Key idea or announcement" value={topic} onChange={(e) => setTopic(e.target.value)} />
                <Button
                  disabled={!topic || social.loading}
                  onClick={() =>
                    run(
                      setSocial,
                      `Create an engaging social post for "${topic}". Include emojis and 3-5 hashtags.`,
                      "social",
                    )
                  }
                >{social.loading ? "Generating..." : "Generate"}</Button>
                <Textarea className="min-h-28" value={social.output} readOnly />
              </CardContent>
            </Card>

            {/* Description Generator */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><FileText className="h-4 w-4" />Description</CardTitle>
                <CardDescription>Compelling YouTube video description</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input placeholder="Video title or topic" value={descInput} onChange={(e) => setDescInput(e.target.value)} />
                <Button
                  disabled={!descInput || desc.loading}
                  onClick={() =>
                    run(
                      setDesc,
                      `Write a high-conversion YouTube description for: "${descInput}" with key points, timestamps (guess), and call-to-action.`,
                      "marketing",
                    )
                  }
                >{desc.loading ? "Generating..." : "Generate"}</Button>
                <Textarea className="min-h-28" value={desc.output} readOnly />
              </CardContent>
            </Card>

            {/* Title Generator/Validator */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Type className="h-4 w-4" />Title Lab</CardTitle>
                <CardDescription>Generate, validate, rephrase titles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input placeholder="Topic or rough title" value={titleInput} onChange={(e) => setTitleInput(e.target.value)} />
                <Button
                  disabled={!titleInput || titles.loading}
                  onClick={() =>
                    run(
                      setTitles,
                      `Provide 10 clickable YouTube titles for: "${titleInput}" with a brief score (1-100) and reasons. Then give 5 rephrases of the best one.`,
                      "marketing",
                    )
                  }
                >{titles.loading ? "Generating..." : "Generate"}</Button>
                <Textarea className="min-h-28" value={titles.output} readOnly />
              </CardContent>
            </Card>

            {/* Thumbnail Brief Generator */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Wand2 className="h-4 w-4" />Thumbnail Brief</CardTitle>
                <CardDescription>Concepts + text for thumbnails</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input placeholder="Video topic" value={topic} onChange={(e) => setTopic(e.target.value)} />
                <Button
                  disabled={!topic || thumb.loading}
                  onClick={() =>
                    run(
                      setThumb,
                      `Create 5 thumbnail concepts for YouTube video: "${topic}". Include short text overlays, color/emotion cues, shot suggestions.`,
                      "marketing",
                    )
                  }
                >{thumb.loading ? "Generating..." : "Generate"}</Button>
                <Textarea className="min-h-28" value={thumb.output} readOnly />
                <p className="text-xs text-muted-foreground">Tip: Use these briefs in your preferred design tool or image generator.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="helpers">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ImageIcon className="h-4 w-4" />More apps coming</CardTitle>
              <CardDescription>We’ll add templates like hook ideas, outline graders, and more.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Tell us what you’d like to see next.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
