"use client";

import "./editor.css";

import { Button } from "@/components/ui/button";
import {
  ArrowLeftIcon,
  Globe,
  Lock,
  Loader2,
  Eye,
  Edit,
  ImagePlus,
  X,
  MoreVertical,
  ExternalLink,
  Book,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ThoughtEditorProps {
  title: string;
  content: string;
  isPublic: boolean;
  isLoading: boolean;
  hasChanges?: boolean;
  images?: string[];
  isStoryMode?: boolean;
  thoughtId?: number;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onPublicChange: (value: boolean) => void;
  onImagesChange: (images: string[]) => void;
  onStoryModeChange?: (value: boolean) => void;
  onSave: (localImages: File[]) => void;
}

export function ThoughtEditor({
  title,
  content,
  isPublic,
  isLoading,
  hasChanges = true,
  images = [],
  isStoryMode = false,
  thoughtId,
  onTitleChange,
  onContentChange,
  onPublicChange,
  onImagesChange,
  onStoryModeChange,
  onSave,
}: ThoughtEditorProps) {
  const [isPreview, setIsPreview] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [localImages, setLocalImages] = useState<
    { file: File; preview: string }[]
  >([]);

  // Cleanup local image URLs on unmount
  useEffect(() => {
    return () => {
      localImages.forEach((img) => URL.revokeObjectURL(img.preview));
    };
  }, [localImages]);

  const handleImageUpload = async (files: FileList | null) => {
    if (!files) return;

    try {
      setIsUploading(true);
      const newLocalImages = Array.from(files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setLocalImages((prev) => [...prev, ...newLocalImages]);
      onImagesChange([...images, ...newLocalImages.map((img) => img.preview)]);
    } catch (error) {
      console.error("Failed to create image previews:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleImageUpload(e.dataTransfer.files);
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    const removedImage = newImages.splice(index, 1)[0];
    onImagesChange(newImages);

    // If it's a local image, clean up the object URL
    const localImageIndex = localImages.findIndex(
      (img) => img.preview === removedImage
    );
    if (localImageIndex !== -1) {
      URL.revokeObjectURL(localImages[localImageIndex].preview);
      const newLocalImages = [...localImages];
      newLocalImages.splice(localImageIndex, 1);
      setLocalImages(newLocalImages);
    }
  };

  const handleSave = () => {
    onSave(localImages.map((img) => img.file));
  };

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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => onPublicChange(!isPublic)}
                    className="gap-2"
                  >
                    {isPublic ? (
                      <>
                        <Lock className="h-4 w-4" />
                        Make Private
                      </>
                    ) : (
                      <>
                        <Globe className="h-4 w-4" />
                        Make Public
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem
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
                  </DropdownMenuItem>
                  {isPublic && (
                    <DropdownMenuItem
                      onClick={() => onStoryModeChange?.(!isStoryMode)}
                      className="gap-2"
                    >
                      <Book className="h-4 w-4" />
                      {isStoryMode ? "Disable Story Mode" : "Enable Story Mode"}
                    </DropdownMenuItem>
                  )}
                  {thoughtId && (
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/thoughts/public/${thoughtId}`}
                        className="gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View Public Page
                      </Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                onClick={handleSave}
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
          className="space-y-4 flex flex-col flex-grow"
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="text-4xl outline-none bg-transparent shadow-none font-bold border-none px-0 placeholder:text-muted-foreground/50 focus-visible:ring-0"
          />

          {isPreview ? (
            <div className="prose dark:prose-invert max-w-none">
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
              className="min-h-[calc(100vh-500px)] flex-grow text-lg resize-none border-none px-0 placeholder:text-muted-foreground/50 bg-transparent font-mono outline-none"
            />
          )}

          {/* Image Upload Area */}
          {isStoryMode && (
            <div
              className={`relative border-2 border-dashed rounded-xl transition-colors ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/20 hover:border-primary/50"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                multiple
                onChange={(e) => handleImageUpload(e.target.files)}
              />

              {/* Image Preview Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4">
                {images.map((image, index) => (
                  <div key={image} className="relative aspect-video group">
                    <img
                      src={image}
                      alt=""
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 rounded-full bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}

                {/* Upload Button */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="aspect-video flex items-center justify-center border-2 border-dashed border-muted-foreground/20 rounded-lg hover:border-primary/50 transition-colors group relative"
                >
                  {isUploading ? (
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  ) : (
                    <ImagePlus className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  )}
                </button>
              </div>

              {/* Drag & Drop Overlay */}
              <AnimatePresence>
                {isDragging && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-primary/5 rounded-xl flex items-center justify-center"
                  >
                    <p className="text-lg font-medium text-primary">
                      Drop images here
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
