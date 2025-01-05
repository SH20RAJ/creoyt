"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Save, X, Wand2, Brain, Copy, Check, Loader } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import DailyIdeas from "@/components/dashboard/ideas/DailyIdeas";
import { getIdeas, getMocupIdeas } from "@/app/actions/ideas";
import { useEffect } from "react";
// Custom fetchers
const dailyIdeasFetcher = async () => {
  const ideas = await getIdeas();
  return ideas?.ideas || [];
};

const generatedIdeasFetcher = async (_, topic) => {
  const ideas = await getMocupIdeas({ topic });
  return ideas?.ideas || [];
};

export default function IdeasPage() {
  const [topic, setTopic] = useState("");
  const [copiedStates, setCopiedStates] = useState({});
  const [savedIdeas, setSavedIdeas] = useState([]);
  const [loading, setLoading] = useState(false);

  // SWR hooks for data fetching
  const { data: dailyIdeas = [], mutate: mutateDailyIdeas } = useSWR(
    "daily-ideas",
    dailyIdeasFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 300000, // 5 minutes
    }
  );

  const { data: generatedIdeas = [], mutate: mutateGeneratedIdeas } = useSWR(
    topic ? ["generated-ideas", topic] : null,
    () => generatedIdeasFetcher(null, topic),
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000,
      revalidateIfStale: false,
    }
  );

  const handleGenerateIdeas = async () => {
    if (!topic) return;

    setLoading(true);
    // Trigger revalidation of generated ideas
    await mutateGeneratedIdeas();
    setLoading(false);
  };

  const handleSaveIdea = async (ideaText) => {
    setSavedIdeas((prev) => [...prev, { text: ideaText }]);
    // After saving, revalidate both caches
    await Promise.all([mutateDailyIdeas(), mutateGeneratedIdeas()]);
  };

  const handleRemoveIdea = (ideaToRemove) => {
    setSavedIdeas((prev) =>
      prev.filter((idea) => idea.text !== ideaToRemove.text)
    );
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedStates({ ...copiedStates, [id]: true });
    setTimeout(() => {
      setCopiedStates((prev) => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const toggleDailyIdeaComplete = (id) => {
    mutateDailyIdeas(
      dailyIdeas.map((idea) =>
        idea.id === id ? { ...idea, completed: !idea.completed } : idea
      ),
      false
    );
  };

  const copyDailyIdea = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedStates({ ...copiedStates, [id]: true });
    setTimeout(() => {
      setCopiedStates((prev) => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const saveDailyIdea = (idea) => {
    setSavedIdeas((prev) => [...prev, { text: idea.text }]);
  };

  // Load saved ideas from localStorage on component mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedIdeas")) || [];
    setSavedIdeas(saved);
  }, []);

  // Save ideas to localStorage whenever savedIdeas state changes
  useEffect(() => {
    localStorage.setItem("savedIdeas", JSON.stringify(savedIdeas));
  }, [savedIdeas]);

  return (
    <div className="min-h-screen p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <Tabs defaultValue="ideas" className="space-y-8">
          <TabsList className="w-full">
            <TabsTrigger value="ideas" className="w-full">
              Ideas
            </TabsTrigger>
            <TabsTrigger value="saved" className="w-full">
              Saved Ideas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ideas" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-purple-500" />
                  Generate Video Ideas
                </CardTitle>
                <CardDescription>
                  Enter a topic to get AI-generated video ideas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter your topic..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                  <Button onClick={handleGenerateIdeas} disabled={loading}>
                    {loading ? (
                      <Loader className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Brain className="w-4 h-4 mr-2" />
                    )}
                    Generate
                  </Button>
                </div>
                <ScrollArea className="h-[200px]">
                  {generatedIdeas.map((idea, index) => (
                    <Card
                      key={index}
                      className="p-4 mb-2 hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <p>{idea?.text}</p>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleCopy(idea.text, `gen-${index}`)
                            }
                          >
                            {copiedStates[`gen-${index}`] ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSaveIdea(idea.text)}
                          >
                            <Save className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>

            <DailyIdeas
              dailyIdeas={dailyIdeas}
              toggleDailyIdeaComplete={toggleDailyIdeaComplete}
              copyDailyIdea={copyDailyIdea}
              saveDailyIdea={saveDailyIdea}
              copiedStates={copiedStates}
            />
          </TabsContent>

          <TabsContent value="saved">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Save className="w-5 h-5 text-blue-500" />
                  Saved Ideas
                </CardTitle>
                <CardDescription>
                  Your collection of saved video ideas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="min-h-[400px]">
                  {savedIdeas?.map((idea, index) => (
                    <Card key={index} className="p-4 mb-2">
                      <div className="flex items-center justify-between">
                        <p>{idea?.text}</p>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleCopy(idea.text, `saved-${index}`)
                            }
                          >
                            {copiedStates[`saved-${index}`] ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveIdea(idea)}
                          >
                            <X className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
