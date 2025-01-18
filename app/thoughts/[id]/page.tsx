"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ThoughtEditor } from "@/components/thoughts/editor";
import { createClient } from "@/lib/supabase/client";
import type { Thought } from "@/types/thoughts";

export default function ThoughtPage() {
  const { id } = useParams<{ id: string }>();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  // Query for fetching the thought
  const {
    data: thought,
    isLoading: isLoadingThought,
    error,
  } = useQuery({
    queryKey: ["thought", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("thoughts")
        .select("*")
        .eq("id", Number(id))
        .single();

      if (error) throw error;
      return data as Thought;
    },
    enabled: !!id && !!user,
  });

  // Update mutation
  const updateThoughtMutation = useMutation({
    mutationFn: async ({
      title,
      content,
      is_public,
    }: {
      title: string;
      content: string;
      is_public: boolean;
    }) => {
      const { data, error } = await supabase
        .from("thoughts")
        .update({ title, content, is_public })
        .eq("id", Number(id))
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["thoughts"] });
      queryClient.invalidateQueries({ queryKey: ["thought", id] });
      router.push("/thoughts");
    },
  });

  // Set initial values when thought is loaded
  useEffect(() => {
    if (thought) {
      setTitle(thought.title);
      setContent(thought.content);
      setIsPublic(thought.is_public);
    }
  }, [thought]);

  if (authLoading || isLoadingThought) {
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

  if (error) {
    console.error("Failed to load thought:", error);
    router.push("/thoughts");
    return null;
  }

  const hasChanges =
    thought &&
    (title !== thought.title ||
      content !== thought.content ||
      isPublic !== thought.is_public);

  const handleUpdate = async () => {
    if (!content.trim()) return;

    try {
      await updateThoughtMutation.mutateAsync({
        title,
        content,
        is_public: isPublic,
      });
    } catch (error) {
      console.error("Failed to update thought:", error);
    }
  };

  return (
    <ThoughtEditor
      title={title}
      content={content}
      isPublic={isPublic}
      isLoading={updateThoughtMutation.isPending}
      hasChanges={hasChanges ?? false}
      onTitleChange={setTitle}
      onContentChange={setContent}
      onPublicChange={setIsPublic}
      onSave={handleUpdate}
    />
  );
}
