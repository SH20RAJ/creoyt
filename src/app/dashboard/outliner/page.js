"use client";
export const runtime = 'edge';


import { useState } from "react";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  Check,
  Copy,
  Sparkles,
  Save,
  Trash2,
  FileText,
  Loader,
} from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useSWR from "swr";
import { generateOutline } from "@/app/actions/outliner";

export default function OutlinerPage() {
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [generatedOutline, setGeneratedOutline] = useState([]);
  const [savedOutlines, setSavedOutlines] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!topic) return;

    setIsGenerating(true);
    try {
      const result = await generateOutline(topic, content);
      setGeneratedOutline(result.sections);
    } catch (error) {
      toast.error("Failed to generate outline");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    setSavedOutlines([
      ...savedOutlines,
      {
        id: Date.now(),
        topic,
        outline: generatedOutline,
      },
    ]);
    toast.success("Outline saved successfully!");
  };

  const handleDelete = (id) => {
    setSavedOutlines(savedOutlines.filter((outline) => outline.id !== id));
    toast.error("Outline deleted!");
  };

  const copyToClipboard = () => {
    const outlineText = generatedOutline
      .map(
        (section) =>
          `${section.title}\n${section.points
            .map((point) => `  • ${point}`)
            .join("\n")}`
      )
      .join("\n\n");
    navigator.clipboard.writeText(outlineText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-background to-muted">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-8"
      >
        <Tabs defaultValue="generate" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="generate">Generate Outline</TabsTrigger>
            <TabsTrigger value="saved">Saved Outlines</TabsTrigger>
          </TabsList>

          <TabsContent value="generate">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-primary" />
                  AI Video Outline Generator
                </CardTitle>
                <CardDescription>
                  Enter your video topic and content to generate a structured
                  outline
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Input
                    placeholder="Enter your video topic..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Textarea
                    placeholder="Enter additional content or context..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[200px]"
                  />
                </div>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleGenerate}
                  disabled={isGenerating || !topic}
                >
                  {isGenerating ? (
                    <>
                      {" "}
                      <Loader className="w-4 h-4 mr-2 animate-spin" />
                      Generating Outline...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Outline
                    </>
                  )}
                </Button>

                {generatedOutline.length > 0 && (
                  <div className="w-full p-4 rounded-lg bg-muted">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">
                        Generated Outline
                      </h3>
                      <div className="space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              JSON.stringify(generatedOutline, null, 2)
                            );
                            setIsCopied(true);
                            setTimeout(() => setIsCopied(false), 2000);
                          }}
                        >
                          {isCopied ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleSave}
                        >
                          <Save className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <ScrollArea className="h-[400px]">
                      {generatedOutline.map((section, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="mb-4"
                        >
                          <h4 className="font-medium mb-2">{section.title}</h4>
                          <ul className="space-y-1 ml-4">
                            {section.points.map((point, idx) => (
                              <li key={idx} className="text-muted-foreground">
                                • {point}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ))}
                    </ScrollArea>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saved">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Saved Outlines
                </CardTitle>
                <CardDescription>
                  Your collection of saved video outlines
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-2">
                    {savedOutlines.map((saved) => (
                      <motion.div
                        key={saved.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-4 rounded-lg border bg-card"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{saved.topic}</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSavedOutlines(
                                savedOutlines.filter((o) => o.id !== saved.id)
                              );
                              toast.success("Outline deleted successfully!");
                            }}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-2">
                          {saved.outline.map((section, idx) => (
                            <div key={idx}>
                              <div className="font-medium">{section.title}</div>
                              <ul className="ml-4">
                                {section.points.map((point, pidx) => (
                                  <li key={pidx}>• {point}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
