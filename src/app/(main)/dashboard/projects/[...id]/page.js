import PEditor from "@/components/dashboard/projects/PEditor";
import PSideBar from "@/components/dashboard/projects/PSideBar";
import React from "react";

export default function New({ params }) {

  const { id } = params;

  const projectId = id[0];
  const pageId = id[1];

  return (
    <div className="flex">
      <PSideBar projectId={projectId} pageId={pageId} />
      <main className="flex-1 p-4">
        {JSON.stringify(params)}
        <PEditor projectId={projectId} pageId={pageId} />
      </main>
    </div>
  );
}
