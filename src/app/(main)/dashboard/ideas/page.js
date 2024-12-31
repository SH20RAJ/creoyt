"use client";
import { useState } from "react";
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
import { Lightbulb, Save, X, Wand2, Brain, Copy, Check } from "lucide-react"; // Add Copy and Check to the imports
import { ScrollArea } from "@/components/ui/scroll-area";
import DailyIdeas from "@/components/dashboard/ideas/DailyIdeas";

export default function IdeasPage() {
  const [topic, setTopic] = useState("");
  const [generatedIdeas, setGeneratedIdeas] = useState([]);
  const [savedIdeas, setSavedIdeas] = useState([]);
  const [dailyIdeas, setDailyIdeas] = useState([
    {
      id: 1,
      text: "10 Hidden Features in Latest iPhone Update",
      completed: false,
    },
    {
      id: 2,
      text: "How to Start a Successful YouTube Channel in 2024",
      completed: false,
    },
    { id: 3, text: "Best Budget Gaming Setup Under $500", completed: false },
  ]);
  const [copiedStates, setCopiedStates] = useState({}); // Add this state

  const handleGenerateIdeas = () => {
    // Mock generated ideas - Replace with actual API call
    const mockIdeas = [
      "5 Advanced Tips for " + topic,
      "Beginner's Guide to " + topic,
      "What Nobody Tells You About " + topic,
      "How to Master " + topic + " in 30 Days",
      topic + " Tips & Tricks 2024",
    ];
    setGeneratedIdeas(mockIdeas);
  };

  const handleSaveIdea = (idea) => {
    setSavedIdeas([...savedIdeas, idea]);
  };

  const handleRemoveIdea = (ideaToRemove) => {
    setSavedIdeas(savedIdeas.filter((idea) => idea !== ideaToRemove));
  };

  // Add this function to handle copying
  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedStates({ ...copiedStates, [id]: true });
    setTimeout(() => {
      setCopiedStates({ ...copiedStates, [id]: false });
    }, 2000);
  };

  // Add function to toggle completion
  const toggleDailyIdeaComplete = (id) => {
    setDailyIdeas(
      dailyIdeas.map((idea) =>
        idea.id === id ? { ...idea, completed: !idea.completed } : idea
      )
    );
  };

  // Add function to save daily idea
  const saveDailyIdea = (text) => {
    setSavedIdeas((prev) => [...prev, text]);
  };

  // Add function to copy idea text
  const copyDailyIdea = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedStates({ ...copiedStates, [id]: true });
    setTimeout(() => {
      setCopiedStates({ ...copiedStates, [id]: false });
    }, 2000);
  };

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
                  <Button onClick={handleGenerateIdeas}>
                    <Brain className="w-4 h-4 mr-2" />
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
                        <p>{idea}</p>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopy(idea, `gen-${index}`)}
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
                            onClick={() => handleSaveIdea(idea)}
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
                <ScrollArea className="h-[200px]">
                  {savedIdeas.map((idea, index) => (
                    <Card key={index} className="p-4 mb-2">
                      <div className="flex items-center justify-between">
                        <p>{idea}</p>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopy(idea, `saved-${index}`)}
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
