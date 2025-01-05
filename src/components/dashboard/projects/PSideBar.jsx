"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function PSideBar( { projectId, pageId }) {
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
      name: "Content Calendar",
    },
    {
      id: 4,
      name: "Outlines",
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
    <div className="h-[80vh] w-64  border-r  ">
      <div className="p-6 flex flex-col h-full">
        <ScrollArea className="flex-grow overflow-y-auto">
          <h2 className="text-sm font-medium  uppercase tracking-wider mb-4">
            Documents
          </h2>
          <div className="space-y-1">
            {documents.map((doc) => (
              <Link
                key={doc.id}
                href={`/dashboard/projects/${projectId}/${doc.id}`}
                onClick={() => handleDocumentClick(doc.id)}
                className="px-3 py-2 block rounded-lg transition-all duration-200 hover:bg-stone-500   cursor-pointer  "
              >
                {doc.name}
              </Link>
            ))}
          </div>
        </ScrollArea>

        <button
          onClick={handleCreateDocument}
          className="w-full p-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg 
          transition-all duration-200 hover:from-blue-600 hover:to-blue-700 
          flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
        >
          <PlusIcon className="h-4 w-4" />
          <span className="text-sm font-medium">New Document</span>
        </button>

        <div className="mt-6 pt-6 border-t border-gray-100/10">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
            Projects
          </h3>
          <div className="space-y-1">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleProjectSwitch(project.id)}
                className="px-3 py-2 rounded-lg transition-all duration-200  
                cursor-pointer   group"
              >
                <div className="flex items-center">
                  <div
                    className="h-2 w-2 rounded-full bg-blue-500 mr-2 opacity-0 group-hover:opacity-100 
                  transition-opacity duration-200"
                  ></div>
                  {project.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
