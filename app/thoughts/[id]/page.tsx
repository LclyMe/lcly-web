"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useThoughts } from "@/hooks/use-thoughts";
import { ThoughtEditor } from "@/components/thoughts/editor";
import type { Thought } from "@/types/thoughts";

export default function ThoughtPage({ params }: { params: { id: string } }) {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { getThought, updateThought, isUpdatingThought } = useThoughts();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [originalThought, setOriginalThought] = useState<Thought | null>(null);

  useEffect(() => {
    const loadThought = async () => {
      try {
        const thought = await getThought(parseInt(params.id));
        if (thought) {
          setTitle(thought.title);
          setContent(thought.content);
          setIsPublic(thought.is_public);
          setOriginalThought(thought);
        }
      } catch (error) {
        console.error("Failed to load thought:", error);
        router.push("/thoughts");
      } finally {
        setIsLoading(false);
      }
    };

    loadThought();
  }, [params.id, router, getThought]);

  if (authLoading || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  const hasChanges =
    originalThought &&
    (title !== originalThought.title ||
      content !== originalThought.content ||
      isPublic !== originalThought.is_public);

  const handleUpdate = async () => {
    if (!content.trim()) return;

    try {
      await updateThought({
        id: parseInt(params.id),
        updates: {
          title,
          content,
          is_public: isPublic,
        },
      });
      router.push("/thoughts");
    } catch (error) {
      console.error("Failed to update thought:", error);
    }
  };

  return (
    <ThoughtEditor
      title={title}
      content={content}
      isPublic={isPublic}
      isLoading={isUpdatingThought}
      hasChanges={hasChanges ?? false}
      onTitleChange={setTitle}
      onContentChange={setContent}
      onPublicChange={setIsPublic}
      onSave={handleUpdate}
    />
  );
}
