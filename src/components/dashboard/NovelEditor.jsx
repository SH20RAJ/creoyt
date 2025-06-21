"use client"

import { useState } from "react";
import { TiptapEditor } from "@/components/ui/tiptap-editor";

export default function NovelEditor() {
  const [data, setData] = useState("<h1>Project Title here</h1><hr><h2>Chapter 1</h2><p>This is a novel editor. You can write your novel here.</p>");

  return (
    <div className="min-h-screen bg-background">
      <TiptapEditor
        content={data}
        onChange={setData}
        className="min-h-screen w-full"
        placeholder="Start writing your novel..."
      />
    </div>
  );
}
