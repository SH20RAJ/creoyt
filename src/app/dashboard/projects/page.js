"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { FolderPlus, Grid, Plus, Share2, User, Clock } from "lucide-react";
import Link from "next/link";

export default function ProjectsPage() {
  const projects = {
    all: [
      {
        id: 1,
        name: "Tech Gadget Review Series",
        description: "Weekly reviews of latest tech products",
        status: "Recording",
        lastUpdated: "1 day ago",
        team: ["Alex", "Emma"],
        priority: "High",
      },
      {
        id: 2,
        name: "Coding Tutorial Marathon",
        description: "10-part web development series",
        status: "Editing",
        lastUpdated: "3 days ago",
        team: ["James", "Sofia"],
        priority: "High",
      },
      {
        id: 3,
        name: "Travel Vlog: Europe Tour",
        description: "5-episode travel documentary",
        status: "Planning",
        lastUpdated: "4 days ago",
        team: ["Maria", "Tom"],
        priority: "Medium",
      },
    ],
    my: [
      {
        id: 1,
        name: "Game Development Series",
        description: "Unity tutorial series for beginners",
        status: "Scripting",
        lastUpdated: "12 hours ago",
      },
      {
        id: 2,
        name: "Productivity Apps Review",
        description: "Top 10 apps for content creators",
        status: "Filming",
        lastUpdated: "2 days ago",
      },
    ],
    shared: [
      {
        id: 1,
        name: "Fitness Challenge Videos",
        description: "30-day workout series collab",
        status: "In Review",
        lastUpdated: "1 day ago",
      },
      {
        id: 2,
        name: "Cooking Masterclass",
        description: "International cuisine series",
        status: "Scheduled",
        lastUpdated: "5 days ago",
      },
    ],
  };

  return (
    <div className="min-h-screen p-6 space-y-8  ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <Button className="shadow-sm">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="w-full bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Grid className="w-4 h-4" />
              All Projects
            </TabsTrigger>
            <TabsTrigger value="my" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              My Projects
            </TabsTrigger>
            <TabsTrigger value="shared" className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Shared with me
            </TabsTrigger>
          </TabsList>

          {Object.entries(projects).map(([key, projectList]) => (
            <TabsContent key={key} value={key}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="border-dashed border-2 bg-background/40">
                    <CardContent className="flex flex-col items-center justify-center h-[190px] cursor-pointer hover:bg-accent/30 transition-all duration-300">
                      <FolderPlus className="w-8 h-8 mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground font-medium">
                        Create New Project
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                {projectList.map((project) => (
                  <motion.div
                    key={project.id}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="bg-background/40 backdrop-blur-sm hover:backdrop-blur-md hover:border  transition-all duration-300">
                      <CardHeader>
                        <Link href={`/dashboard/projects/${project.id}`}>
                          <CardTitle className="text-lg font-semibold">
                            {project.name}
                          </CardTitle>
                          <CardDescription className="line-clamp-2">
                            {project.description}
                          </CardDescription>
                        </Link>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                              {project.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>Updated {project.lastUpdated}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </div>
  );
}
