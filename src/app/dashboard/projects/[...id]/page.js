export const runtime = 'edge';

import PEditor from "@/components/dashboard/projects/PEditor";
import PSideBar from "@/components/dashboard/projects/PSideBar";
import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import ChatBot from "../../scout/page";

export default  async function New({ params }) {
  const { id } = await params;

  const projectId = id[0];
  const pageId = id[1] || 1;


  return (
    <div className="flex m-0 p-0">
      <PSideBar projectId={projectId} pageId={pageId} />
      <main className="flex-1 p-0">
        <PEditor projectId={projectId} pageId={pageId} />
      </main>

      <Drawer>
        <DrawerTrigger asChild>
          <Button 
            variant="outline" 
            className="fixed bottom-4 right-4 shadow-lg hover:shadow-xl transition-all duration-300 rounded-full"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Chat with AI
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-w-[400px] h-[80vh] right-0 absolute rounded-l-xl">
          <DrawerHeader className="border-b">
            <DrawerTitle className="text-xl font-semibold">Project Assistant</DrawerTitle>
            <DrawerDescription>Get help with your project</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 overflow-y-auto h-full">
            <ChatBot projectId={projectId} />
          </div>
          <DrawerFooter className="border-t">
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
