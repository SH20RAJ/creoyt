"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/ai?title=${encodeURIComponent(topic)}`
        );
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
        {/* Topic Header */}
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

        {loading ? (
          <LoadingSkeleton />
        ) : (
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px] mx-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="titles">Titles</TabsTrigger>
              <TabsTrigger value="tags">Tags</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                  <CardDescription>
                    AI-generated content description
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {data?.description}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="titles" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Suggested Titles</CardTitle>
                  <CardDescription>Click to copy</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {data?.title.map((title, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <button
                          onClick={() => navigator.clipboard.writeText(title)}
                          className="w-full text-left p-3 rounded-lg hover:bg-accent transition-colors text-foreground hover:text-accent-foreground"
                        >
                          {title}
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tags" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Tags</CardTitle>
                  <CardDescription>
                    Click to copy individual tags
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {data?.tags.map((tag, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Badge
                          variant="secondary"
                          className="cursor-pointer hover:bg-accent"
                          onClick={() => navigator.clipboard.writeText(tag)}
                        >
                          {tag}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
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
