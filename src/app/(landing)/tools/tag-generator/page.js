"use client";

import React, { useState } from "react";
import { Copy, Check, Trash, Loader2, Search, Settings2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function TagGenerator() {
  const [topic, setTopic] = useState("");
  const [tags, setTags] = useState([]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchTags = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/fetchTags`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch tags");
      }

      const data = await response.json();
      setTags(data.tags);
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyAllTags = () => {
    const allTags = tags.join(", ");
    navigator.clipboard.writeText(allTags);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br   flex items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400 animate-pulse">
            Tag Generator
          </h1>
          <p className="text-gray-300 text-lg">
            Create the perfect tags for your YouTube videos with a click.
          </p>
        </div>

        {/* Input Section */}
        <Card className="bg-transparent border border-gray-800/50 shadow-md shadow-blue-500/10">
          <CardContent className="space-y-6 p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-2">
              <Button
                onClick={fetchTags}
                className="bg-gradient-to-r  "
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </>
                ) : (
                  <Settings2 className="h-5 w-5 text-gray-400" />
                )}
              </Button>
              <Input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    fetchTags();
                  }
                }}
                placeholder="Enter YouTube Video Title"
                className="bg-gray-900/50 border-gray-700 focus:ring-2 focus:ring-blue-500"
              />
              <Button
                onClick={fetchTags}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg hover:shadow-blue-500/30"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <Search className="h-5 w-5" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tags Section */}
        {tags.length > 0 && (
          <Card className="bg-transparent border border-gray-800/50 shadow-md shadow-cyan-500/10">
            <CardContent className="space-y-6 p-6 md:p-8">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-white">
                  Generated Tags
                </h2>
                <Button
                  onClick={handleCopyAllTags}
                  className="bg-gradient-to-r from-green-500 to-teal-400 text-white shadow-lg hover:shadow-green-500/30"
                >
                  {copied ? (
                    <>
                      <Check className="h-5 w-5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-5 w-5" />
                      Copy All
                    </>
                  )}
                </Button>
              </div>
              <div className="flex flex-wrap gap-3">
                {tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-sm bg-gray-700/50 border border-gray-600 text-gray-300 hover:bg-blue-600 hover:text-white transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>{tag}</span>
                    <Trash
                      className="h-4 w-4 text-red-400 hover:text-red-500"
                      onClick={() => handleRemoveTag(index)}
                    />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
