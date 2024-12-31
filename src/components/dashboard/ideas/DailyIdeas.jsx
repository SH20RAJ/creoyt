import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Copy, Lightbulb, Save } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DailyIdeas( {
    dailyIdeas,
    toggleDailyIdeaComplete,
    copyDailyIdea,
    saveDailyIdea,
    copiedStates,
}) {
  return (
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
                  toggleDailyIdeaComplete(idea.id);
                }}
              />
              <label htmlFor={`idea-${idea.id}`} className="flex-1 text-sm">
                {idea.text}
              </label>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyDailyIdea(idea.text, `daily-${idea.id}`)}
                >
                  {copiedStates[`daily-${idea.id}`] ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => saveDailyIdea(idea.text)}
                >
                  <Save className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
