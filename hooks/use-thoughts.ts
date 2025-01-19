import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { Thought } from "@/types/thoughts";
import {
  addThought,
  deleteThought,
  updateThought,
} from "@/lib/actions/thoughts";
import { useEffect } from "react";

const thoughtsKey = "thoughts";

export function useThoughts() {
  const queryClient = useQueryClient();
  const supabase = createClient();

  // Query for thoughts
  const {
    data: thoughts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: [thoughtsKey],
    queryFn: async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("thoughts")
        .select("*")
        .or(`user_id.eq.${session.session.user.id},is_public.eq.true`)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Thought[];
    },
  });

  // Subscribe to real-time changes
  useEffect(() => {
    const channel = supabase
      .channel("thoughts_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "thoughts",
        },
        (payload) => {
          // Invalidate and refetch
          queryClient.invalidateQueries({ queryKey: [thoughtsKey] });
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [queryClient, supabase]);

  // Mutations
  const addThoughtMutation = useMutation({
    mutationFn: ({
      title,
      content,
      isPublic,
      images,
      isStoryMode,
    }: {
      title: string;
      content: string;
      isPublic: boolean;
      images?: string[];
      isStoryMode?: boolean;
    }) => addThought(title, content, isPublic, images, isStoryMode),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [thoughtsKey] });
    },
  });

  const deleteThoughtMutation = useMutation({
    mutationFn: deleteThought,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [thoughtsKey] });
    },
  });

  const updateThoughtMutation = useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<Thought> }) =>
      updateThought(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [thoughtsKey] });
    },
  });

  const getThought = async (id: number) => {
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from("thoughts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data as Thought;
  };

  return {
    thoughts,
    isLoading,
    error,
    addThought: addThoughtMutation.mutate,
    deleteThought: deleteThoughtMutation.mutate,
    updateThought: updateThoughtMutation.mutate,
    getThought,
    isAddingThought: addThoughtMutation.isPending,
    isDeletingThought: deleteThoughtMutation.isPending,
    isUpdatingThought: updateThoughtMutation.isPending,
  };
}
