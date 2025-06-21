"use client"

import { TiptapEditor } from '@/components/ui/tiptap-editor'
import { useState } from 'react'

export default function EditorTestPage() {
  const [content, setContent] = useState('<h1>Test Editor</h1><p>This is a test of the TipTap editor with the Coursue design system.</p>')

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-foreground">TipTap Editor Test</h1>
      <div className="bg-background border border-border rounded-lg p-4">
        <TiptapEditor
          content={content}
          onChange={setContent}
          placeholder="Start typing to test the editor..."
          className="min-h-[300px]"
        />
      </div>
      
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-3 text-foreground">Editor Content (HTML):</h2>
        <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto max-h-40 text-muted-foreground">
          {content}
        </pre>
      </div>
    </div>
  )
}
