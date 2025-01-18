"use client";

import "./editor.css";

import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, Globe, Lock, Loader2, Eye, Edit } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

interface ThoughtEditorProps {
  title: string;
  content: string;
  isPublic: boolean;
  isLoading: boolean;
  hasChanges?: boolean;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onPublicChange: (value: boolean) => void;
  onSave: () => void;
}

export function ThoughtEditor({
  title,
  content,
  isPublic,
  isLoading,
  hasChanges = true,
  onTitleChange,
  onContentChange,
  onPublicChange,
  onSave,
}: ThoughtEditorProps) {
  const [isPreview, setIsPreview] = useState(false);

  return (
    <div className="min-h-screen bg-background mx-auto max-w-3xl flex flex-col">
      <div className="w-full flex-grow h-full flex flex-col px-4 py-8">
        {/* Header */}
        <div className="z-50 bg-background/80 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-8">
            <Link href="/thoughts">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeftIcon className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="relative flex bg-muted p-1 rounded-full">
                <div
                  className={`absolute inset-y-1 transition-all duration-200 ease-in-out rounded-full bg-background ${
                    isPublic ? "translate-x-full" : "translate-x-0"
                  }`}
                  style={{ width: "calc(50% - 4px)" }}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onPublicChange(false)}
                  className={`relative z-10 gap-2 px-3 bg-transparent hover:bg-transparent ${
                    !isPublic ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <Lock className="h-4 w-4" />
                  Private
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onPublicChange(true)}
                  className={`relative z-10 gap-2 px-3 bg-transparent hover:bg-transparent ${
                    isPublic ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <Globe className="h-4 w-4" />
                  Public
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPreview(!isPreview)}
                className="gap-2"
              >
                {isPreview ? (
                  <>
                    <Edit className="h-4 w-4" />
                    Edit
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4" />
                    Preview
                  </>
                )}
              </Button>
              <Button
                onClick={onSave}
                disabled={isLoading || !content.trim() || !hasChanges}
                size="sm"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {hasChanges ? "Saving..." : "Publishing..."}
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2 flex flex-col flex-grow"
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="text-4xl outline-none bg-transparent shadow-none font-bold border-none px-0 placeholder:text-muted-foreground/50 focus-visible:ring-0"
          />
          {isPreview ? (
            <div className="prose prose-lg dark:prose-invert max-w-none markup-editor">
              <ReactMarkdown
                allowedElements={[
                  "h1",
                  "h2",
                  "h3",
                  "p",
                  "ul",
                  "ol",
                  "li",
                  "blockquote",
                  "code",
                  "em",
                  "strong",
                  "a",
                  "img",
                  "hr",
                  "br",
                ]}
              >
                {content}
              </ReactMarkdown>
            </div>
          ) : (
            <textarea
              placeholder="Write your thought... 
              
Supports markdown:
**bold**
*italic*
- bullet points"
              value={content}
              onChange={(e) => onContentChange(e.target.value)}
              className="min-h-[calc(100vh-300px)] flex-grow text-lg resize-none border-none px-0 focus-visible:ring-0 placeholder:text-muted-foreground/50 bg-transparent font-mono"
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}
