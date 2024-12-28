'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Card, 
  CardHeader,
  CardTitle, 
  CardDescription,
  CardContent,
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Lightbulb, Save, X, Wand2, Brain } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function IdeasPage() {
  const [topic, setTopic] = useState('');
  const [generatedIdeas, setGeneratedIdeas] = useState([]);
  const [savedIdeas, setSavedIdeas] = useState([]);
  const [dailyIdeas, setDailyIdeas] = useState([
    { id: 1, text: "10 Hidden Features in Latest iPhone Update", completed: false },
    { id: 2, text: "How to Start a Successful YouTube Channel in 2024", completed: false },
    { id: 3, text: "Best Budget Gaming Setup Under $500", completed: false }
  ]);

  const handleGenerateIdeas = () => {
    // Mock generated ideas - Replace with actual API call
    const mockIdeas = [
      "5 Advanced Tips for " + topic,
      "Beginner's Guide to " + topic,
      "What Nobody Tells You About " + topic,
      "How to Master " + topic + " in 30 Days",
      topic + " Tips & Tricks 2024"
    ];
    setGeneratedIdeas(mockIdeas);
  };

  const handleSaveIdea = (idea) => {
    setSavedIdeas([...savedIdeas, idea]);
  };

  const handleRemoveIdea = (ideaToRemove) => {
    setSavedIdeas(savedIdeas.filter(idea => idea !== ideaToRemove));
  };

  return (
    <div className="min-h-screen p-6 space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <Tabs defaultValue="generate" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 mx-auto">
            <TabsTrigger value="ideas"> Ideas</TabsTrigger>
            <TabsTrigger value="saved">Saved Ideas</TabsTrigger>
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
                    <Card key={index} className="p-4 mb-2 hover:bg-accent transition-colors">
                      <div className="flex items-center justify-between">
                        <p>{idea}</p>
                        <Button variant="ghost" size="sm" onClick={() => handleSaveIdea(idea)}>
                          <Save className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>  
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  Ideas for Today
                </CardTitle>
                <CardDescription>
                  Check off ideas you want to create or save for later
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  {dailyIdeas.map((idea) => (
                    <div key={idea.id} className="flex items-center space-x-4 mb-2">
                      <Checkbox 
                        id={`idea-${idea.id}`}
                        checked={idea.completed}
                        onCheckedChange={(checked) => {
                          setDailyIdeas(dailyIdeas.map(i => 
                            i.id === idea.id ? { ...i, completed: checked } : i
                          ));
                        }}
                      />
                      <label htmlFor={`idea-${idea.id}`} className="flex-1 text-sm">
                        {idea.text}
                      </label>
                      <Button variant="ghost" size="sm" onClick={() => handleSaveIdea(idea.text)}>
                        <Save className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>


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
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleRemoveIdea(idea)}
                        >
                          <X className="w-4 h-4 text-red-500" />
                        </Button>
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
