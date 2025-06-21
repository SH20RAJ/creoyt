"use client";
export const runtime = 'edge';


import useSWR from "swr";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnterTopic } from "@/components/dashboard/EnterTopic";

// Fetch function for SWR
const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

function TopicPageContent() {
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic");
  const [copiedStates, setCopiedStates] = useState({});

  // Replace useState and useEffect with useSWR
  const { data, error, isLoading } = useSWR(
    topic ? `/api/ai?title=${encodeURIComponent(topic)}` : null,
    fetcher,
    {
      revalidateOnFocus: false, // Don't revalidate on window focus
      revalidateOnReconnect: false, // Don't revalidate on reconnect
    }
  );

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedStates({ ...copiedStates, [id]: true });
    setTimeout(() => {
      setCopiedStates({ ...copiedStates, [id]: false });
    }, 2000);
  };

  const handleCopyAllTags = () => {
    if (data?.tags) {
      const allTags = data.tags.join(", ");
      navigator.clipboard.writeText(allTags);
      setCopiedStates({ ...copiedStates, allTags: true });
      setTimeout(() => {
        setCopiedStates({ ...copiedStates, allTags: false });
      }, 2000);
    }
  };

  if (!topic) {
    return (
      <div className="min-h-screen bg-background">
        <EnterTopic />
      </div>
    );
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="mx-auto max-w-5xl space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4 capitalize">
            {topic}
          </h1>
          <p className="text-muted-foreground">
            AI-Generated Content Suggestions
          </p>
        </motion.div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-[400px] mx-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="titles">Titles</TabsTrigger>
            <TabsTrigger value="tags">Tags</TabsTrigger>
            <TabsTrigger value="thumbnails">Thumbnails</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Description</CardTitle>
                  <CardDescription>
                    AI-generated content description
                  </CardDescription>
                </div>
                <button
                  onClick={() => handleCopy(data?.description, "description")}
                  className="inline-flex items-center justify-center rounded-md h-8 w-8 hover:bg-accent transition-colors"
                >
                  {copiedStates["description"] ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {data?.description}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="titles">
            <Card>
              <CardHeader>
                <CardTitle>Suggested Titles</CardTitle>
                <CardDescription>Click any title to copy</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {data?.title.map((title, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between rounded-lg p-3 hover:bg-accent group transition-colors"
                    >
                      <span className="text-foreground">{title}</span>
                      <button
                        onClick={() => handleCopy(title, `title-${index}`)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {copiedStates[`title-${index}`] ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4 text-muted-foreground" />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tags">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Recommended Tags</CardTitle>
                  <CardDescription>Click any tag to copy</CardDescription>
                </div>
                <button
                  onClick={handleCopyAllTags}
                  className="inline-flex items-center justify-center gap-2 rounded-md px-3 py-1 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  {copiedStates.allTags ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Copied All</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Copy All Tags</span>
                    </>
                  )}
                </button>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {data?.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer hover:bg-accent group transition-colors px-3 py-1"
                      onClick={() => handleCopy(tag, `tag-${index}`)}
                    >
                      <span>{tag}</span>
                      <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity inline-flex">
                        {copiedStates[`tag-${index}`] ? (
                          <Check className="h-3 w-3 text-green-500" />
                        ) : (
                          <Copy className="h-3 w-3 text-muted-foreground" />
                        )}
                      </span>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="thumbnails">
            <Card>
              <CardHeader>
                <CardTitle>Thumbnail Preview</CardTitle>
                <CardDescription>Generated thumbnail for your content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <img
                      src={`https://cdn.statically.io/og/theme=dark/${encodeURIComponent(topic)}.jpg`}
                      alt={`Thumbnail for ${topic}`}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleCopy(`https://cdn.statically.io/og/theme=dark/${encodeURIComponent(topic)}.jpg`, "thumbnail-url")}
                      className="inline-flex items-center justify-center gap-2 rounded-md px-3 py-1 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      {copiedStates["thumbnail-url"] ? (
                        <>
                          <Check className="h-4 w-4" />
                          <span>Copied URL</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          <span>Copy URL</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Modify the main component to use Suspense
export default function TopicPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <TopicPageContent />
    </Suspense>
  );
}

const LoadingSkeleton = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-4 w-full max-w-3xl p-8">
        <div className="h-8 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded-md animate-pulse w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded-md animate-pulse w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded-md animate-pulse w-5/6"></div>
        </div>
      </div>
    </div>
  );
};
