'use client';
import NovelEditor from "@/components/dashboard/NovelEditor";
import React, { useState } from "react";

export default function HomePage() {
  const [content, setContent] = useState("");

  return (
    <div>
      <NovelEditor
        content={content}
        setContent={setContent}
        title="Your Editor Title"
      />
    </div>
  );
}
