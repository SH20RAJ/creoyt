import { Editor } from "novel-lightweight";
import { useState } from "react";

export default function App() {
  const [data, setData] = useState("\n# Project Title \n---\n\n## Chapter 1\n\nThis is a novel editor. You can write your novel here.");

  return (
    <div className="min-h-screen  ">
      <Editor
        className="dark backdrop-blur-lg min-h-screen w-full"
        defaultValue={data}
        disableLocalStorage={0}
        onUpdate={(editor) => {
          setData(editor?.storage.markdown.getMarkdown());
        }}
        handleImageUpload={async (file) => {
          const uploads = await startUpload([file]);
          if (uploads && uploads.length > 0) {
            return uploads[0].url;
          }
          return "www.example.com/failed-upload.png";
        }}
      />
    </div>
  );
}
