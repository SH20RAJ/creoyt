"use client";
import { Download, Upload, UploadCloud } from "lucide-react";
import { Editor } from "novel-lightweight";
import { useState } from "react";

export default function PEditor({ projectId, pageId }) {
  let defaultData =
    "\n# Project   \n---\n\n## Chapter d1\n\nThis is a novel editor.  " +
    projectId +
    " " +
    pageId +
    "\n\n\n\n\n";
  const [data, setData] = useState(defaultData);

  const handleUpdate = (editor) => {
    setData(editor?.storage.markdown.getMarkdown());
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data.url || "https://via.placeholder.com/150";
  };

  return (
    <div className="min-h-screen dark:bg-black m-0 p-0  ">
       <Menu/>
      <Editor
        className="dark backdrop-blur-lg min-h-screen w-full"
        defaultValue={data}
        // value={"dataed"}
        disableLocalStorage={1}
        onUpdate={handleUpdate}
        handleImageUpload={handleImageUpload}
      />
    </div>
  );
}


export const Menu = () => {
  return (
    <menu className="flex items-center gap-4 p-4 bg-gray-900/50 backdrop-blur-sm border-b border-gray-800">
      {/* Save Button */}
      <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white bg-gray-800 rounded-md transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
        </svg>
        Save
      </button>

    {/* Auto Save Checkbox */}
    <label className="flex items-center gap-2 text-sm text-gray-300">
        <input
            type="checkbox"
            className="form-checkbox h-4 w-4 text-blue-600 bg-gray-800 border-gray-600 rounded"
        />
        Auto Save
    </label>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Action Buttons */}
      <button className="p-2 text-gray-300 hover:text-white rounded-full transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <button className="p-2 text-gray-300 hover:text-white rounded-full transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
        </svg>
      </button>
      <button className="p-2 text-gray-300 hover:text-white rounded-full transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0v3H7V4h6zm-5 7a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <button className="p-2 text-gray-300 hover:text-white rounded-full transition-colors">
        <Upload />
      </button>

      <button className="p-2 text-gray-300 hover:text-white rounded-full transition-colors">
        <Download />
      </button>
    </menu>
  );
};
