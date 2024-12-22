"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";  
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

export default function TopicPage() {
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiedStates, setCopiedStates] = useState({});

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedStates({ ...copiedStates, [id]: true });
    setTimeout(() => {
      setCopiedStates({ ...copiedStates, [id]: false });
    }, 2000);
  };

  // Add new function to handle copying all tags
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/ai?title=${encodeURIComponent(topic)}`);
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    if (topic) {
      fetchData();
    }
  }, [topic]);

  if (!topic) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-2xl text-muted-foreground">No topic specified</h1>
      </div>
    );
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
          <p className="text-muted-foreground">AI-Generated Content Suggestions</p>
        </motion.div>

        {loading ? (
          <LoadingSkeleton />
        ) : (
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px] mx-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="titles">Titles</TabsTrigger>
              <TabsTrigger value="tags">Tags</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle>Description</CardTitle>
                      <CardDescription>AI-generated content description</CardDescription>
                    </div>
                    <button
                      onClick={() => handleCopy(data?.description, 'description')}
                      className="inline-flex items-center justify-center rounded-md h-8 w-8 hover:bg-accent transition-colors"
                    >
                      {copiedStates['description'] ? (
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
              </motion.div>
            </TabsContent>

            <TabsContent value="titles">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Suggested Titles</CardTitle>
                    <CardDescription>Click to copy any title</CardDescription>
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
              </motion.div>
            </TabsContent>

            <TabsContent value="tags">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
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
              </motion.div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-12 w-[300px] mx-auto" />
      <Skeleton className="h-[200px] w-full" />
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
      </div>
    </div>
  );
}
