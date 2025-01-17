"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useThoughts } from "@/hooks/use-thoughts";
import { ThoughtEditor } from "@/components/thoughts/editor";

export default function NewThoughtPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { addThought, isAddingThought } = useThoughts();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  if (authLoading) {
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

  const handleSubmit = async () => {
    if (!content.trim()) return;

    try {
      await addThought({
        title,
        content,
        isPublic,
      });
      router.push("/thoughts");
    } catch (error) {
      console.error("Failed to add thought:", error);
    }
  };

  return (
    <ThoughtEditor
      title={title}
      content={content}
      isPublic={isPublic}
      isLoading={isAddingThought}
      hasChanges={content.trim() !== ""}
      onTitleChange={setTitle}
      onContentChange={setContent}
      onPublicChange={setIsPublic}
      onSave={handleSubmit}
    />
  );
}
