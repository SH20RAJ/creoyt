export const runtime = 'edge';

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Clock, AlertCircle, CheckCircle2, Plus } from "lucide-react";

const tasks = [
  {
    id: 1,
    title: "Complete UI/UX Design Assignment",
    description: "Create a mobile app interface design following the design principles",
    dueDate: "Tomorrow",
    priority: "high",
    status: "pending",
    course: "UI/UX Design"
  },
  {
    id: 2,
    title: "Submit Brand Strategy Research",
    description: "Research and analyze 3 successful brand strategies",
    dueDate: "3 days",
    priority: "medium",
    status: "in-progress",
    course: "Branding"
  },
  {
    id: 3,
    title: "Frontend Code Review",
    description: "Review and provide feedback on peer's React project",
    dueDate: "1 week",
    priority: "low",
    status: "completed",
    course: "Frontend Development"
  }
];

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high': return 'text-red-500 bg-red-50';
    case 'medium': return 'text-yellow-500 bg-yellow-50';
    case 'low': return 'text-green-500 bg-green-50';
    default: return 'text-gray-500 bg-gray-50';
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'completed': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    case 'in-progress': return <Clock className="w-4 h-4 text-yellow-500" />;
    case 'pending': return <AlertCircle className="w-4 h-4 text-red-500" />;
    default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
  }
};

export default function TaskPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Tasks</h1>
          <p className="text-muted-foreground">Track your assignments and deadlines</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Task Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 text-center">
          <h3 className="text-2xl font-bold text-foreground">5</h3>
          <p className="text-sm text-muted-foreground">Total Tasks</p>
        </Card>
        <Card className="p-4 text-center">
          <h3 className="text-2xl font-bold text-yellow-500">2</h3>
          <p className="text-sm text-muted-foreground">In Progress</p>
        </Card>
        <Card className="p-4 text-center">
          <h3 className="text-2xl font-bold text-green-500">1</h3>
          <p className="text-sm text-muted-foreground">Completed</p>
        </Card>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <Card key={task.id} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <Checkbox 
                checked={task.status === 'completed'}
                className="mt-1"
              />
              
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-semibold ${task.status === 'completed' ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {task.title}
                      </h3>
                      {getStatusIcon(task.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                    <Badge variant="outline" className="text-xs">
                      {task.course}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </Badge>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {task.dueDate}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
