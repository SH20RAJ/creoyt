"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import TextStyle from '@tiptap/extension-text-style'
import FontFamily from '@tiptap/extension-font-family'
import { createLowlight } from 'lowlight'

const lowlight = createLowlight()
import { Button } from '@/components/ui/button'
import { Toggle } from '@/components/ui/toggle'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Quote,
  List,
  ListOrdered,
  Undo,
  Redo,
  Link as LinkIcon,
  Image as ImageIcon,
  Table as TableIcon,
  Type,
  Heading1,
  Heading2,
  Heading3,
} from 'lucide-react'

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null
  }

  const addImage = () => {
    const url = window.prompt('Enter image URL')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('Enter URL', previousUrl)
    
    if (url === null) {
      return
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  const insertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
  }

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b border-border bg-background/50 backdrop-blur-sm">
      <Toggle
        size="sm"
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        className="h-8 w-8"
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      
      <Toggle
        size="sm"
        pressed={editor.isActive('italic')}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        className="h-8 w-8"
      >
        <Italic className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive('strike')}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        className="h-8 w-8"
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive('code')}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
        className="h-8 w-8"
      >
        <Code className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="h-6" />

      <Toggle
        size="sm"
        pressed={editor.isActive('heading', { level: 1 })}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className="h-8 w-8"
      >
        <Heading1 className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive('heading', { level: 2 })}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className="h-8 w-8"
      >
        <Heading2 className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive('heading', { level: 3 })}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className="h-8 w-8"
      >
        <Heading3 className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="h-6" />

      <Toggle
        size="sm"
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        className="h-8 w-8"
      >
        <List className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive('orderedList')}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        className="h-8 w-8"
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive('blockquote')}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
        className="h-8 w-8"
      >
        <Quote className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="h-6" />

      <Button
        variant="ghost"
        size="sm"
        onClick={setLink}
        className={cn(
          "h-8 w-8 p-0",
          editor.isActive('link') && "bg-accent"
        )}
      >
        <LinkIcon className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={addImage}
        className="h-8 w-8 p-0"
      >
        <ImageIcon className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={insertTable}
        className="h-8 w-8 p-0"
      >
        <TableIcon className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-6" />

      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="h-8 w-8 p-0"
      >
        <Undo className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="h-8 w-8 p-0"
      >
        <Redo className="h-4 w-4" />
      </Button>
    </div>
  )
}

export function TiptapEditor({ 
  content = '', 
  onChange, 
  className,
  placeholder = 'Start writing...',
  editable = true,
  showMenuBar = true 
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Image,
      Link.configure({
        openOnClick: false,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      TextStyle,
      FontFamily,
    ],
    content,
    editable,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: cn(
          'prose prose-slate dark:prose-invert max-w-none focus:outline-none',
          'min-h-[200px] p-4',
          className
        ),
      },
    },
  })

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-background">
      {showMenuBar && <MenuBar editor={editor} />}
      <EditorContent 
        editor={editor} 
        className={cn(
          "min-h-[200px]",
          !showMenuBar && "p-4"
        )}
        placeholder={placeholder}
      />
    </div>
  )
}

export default TiptapEditor
