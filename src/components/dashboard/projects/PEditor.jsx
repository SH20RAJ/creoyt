"use client";
import { Download, Upload, Save } from "lucide-react";
import { useState } from "react";
import { TiptapEditor } from "@/components/ui/tiptap-editor";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function PEditor({ projectId, pageId }) {
  let defaultData = `<h1>Project ${projectId}</h1><hr><h2>Chapter ${pageId}</h2><p>This is a project editor. Start writing your content here.</p>`;
  const [data, setData] = useState(defaultData);
  const [autoSave, setAutoSave] = useState(false);

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log("Saving project data:", data);
  };

  const handleExport = () => {
    // TODO: Implement export functionality
    const blob = new Blob([data], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `project-${projectId}-page-${pageId}.html`;
    a.click();
  };

  const handleImport = () => {
    // TODO: Implement import functionality
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.html,.txt';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setData(e.target.result);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-background">
      <Menu 
        onSave={handleSave}
        onExport={handleExport}
        onImport={handleImport}
        autoSave={autoSave}
        onAutoSaveChange={setAutoSave}
      />
      <TiptapEditor
        content={data}
        onChange={setData}
        className="min-h-[calc(100vh-80px)] w-full"
        placeholder={`Start writing your project content for ${projectId}...`}
      />
    </div>
  );
}

export const Menu = ({ onSave, onExport, onImport, autoSave, onAutoSaveChange }) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-background/50 backdrop-blur-sm border-b border-border">
      {/* Save Button */}
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onSave}
        className="flex items-center gap-2"
      >
        <Save className="h-4 w-4" />
        Save
      </Button>

      {/* Auto Save Checkbox */}
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="auto-save" 
          checked={autoSave}
          onCheckedChange={onAutoSaveChange}
        />
        <label 
          htmlFor="auto-save" 
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Auto Save
        </label>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Action Buttons */}
      <Button 
        variant="ghost" 
        size="sm"
        onClick={onImport}
        className="flex items-center gap-2"
      >
        <Upload className="h-4 w-4" />
        Import
      </Button>

      <Button 
        variant="ghost" 
        size="sm"
        onClick={onExport}
        className="flex items-center gap-2"
      >
        <Download className="h-4 w-4" />
        Export
      </Button>
    </div>
  );
};
