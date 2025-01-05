"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { PlusIcon, FileTextIcon, FolderIcon, Plus } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSidebar } from "@/components/ui/sidebar";
import { useEffect } from "react";

export default function PSideBar({ projectId, pageId }) {
  const { isMobile, state, toggleSidebar } = useSidebar();
  useEffect(() => {
    if (state === "expanded") toggleSidebar();
  }, []);

  let projects = [
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
  ];

  let documents = [
    {
      id: 1,
      name: "Design Brief",
    },
    {
      id: 2,
      name: "Project Plan",
    },
    {
      id: 3,
      name: "Video Metadata",
    },
    {
      id: 4,
      name: "Outlines",
    },
    {
      id: 5,
      name: "Scripts",
    },
    {
      id: 6,
      name: "Storyboard",
    },
    {
      id: 7,
      name: "Content Calendar",
    },
    {
      id: 8,
      name: "Budget Sheet",
    },
  ];

  // ... existing data and handlers remain the same ...

  let handleProjectSwitch = (id) => {
    console.log("Switching to project with id:", id);
  };

  let handleDocumentClick = (id) => {
    console.log("Opening document with id:", id);
  };

  let handleCreateDocument = () => {
    console.log("Creating new document");
  };
  return (
    <aside className="h-screen w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full flex-col gap-4">
        <div className="flex h-[60px] items-center border-b px-6">
          <h2 className="text-lg font-semibold">Workspace</h2>
        </div>

        <div className="flex-1 px-4">
          <ScrollArea className="h-[calc(100vh-180px)]">
            <div className="space-y-4">
              {/* Documents Section */}
              <div>
                <div className="flex items-center justify-between py-2">
                  <h2 className="text-sm font-medium text-muted-foreground">
                    Documents
                  </h2>
                  <Button
                    className=" mr-2 p-2 h-6 w-6 rounded-full"
                    onClick={handleCreateDocument}
                  >
                    <PlusIcon className="h-4 w-4  " />
                  </Button>
                </div>
                <div className="space-y-1">
                  {documents.map((doc) => (
                    <Link
                      key={doc.id}
                      href={`/dashboard/projects/${projectId}/${doc.id}`}
                      className={cn(
                        "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                        pageId === doc.id ? "bg-accent" : "transparent"
                      )}
                    >
                      <FileTextIcon className="mr-2 h-4 w-4" />
                      <span>{doc.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Projects Section */}
              <div>
                <div className="flex items-center justify-between py-2">
                  <h2 className="text-sm font-medium text-muted-foreground">
                    Projects
                  </h2>
                </div>
                <div className="space-y-1">
                  {projects.map((project) => (
                    <Tooltip key={project.id}>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => handleProjectSwitch(project.id)}
                          className={cn(
                            "group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                            projectId === project.id
                              ? "bg-accent"
                              : "transparent"
                          )}
                        >
                          <FolderIcon className="mr-2 h-4 w-4" />
                          <span className="truncate">{project.name}</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{project.description}</p>
                        <p className="text-xs text-muted-foreground">
                          Status: {project.status}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>

        <div className="mt-auto p-4">
          <Button
            onClick={handleCreateDocument}
            className="w-full"
            size="sm"
            variant="default"
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            New Document
          </Button>
        </div>
      </div>
    </aside>
  );
}
