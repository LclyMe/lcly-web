"use server";

import { createClient } from "@/lib/supabase/server";
import type { Thought } from "@/types/thoughts";

export async function getThoughts() {
  const supabase = await createClient();
  const { data: session } = await supabase.auth.getSession();

  if (!session?.session?.user) {
    throw new Error("Not authenticated");
  }

  const { data, error } = await supabase
    .from("thoughts")
    .select("*")
    .or(`user_id.eq.${session.session.user.id},is_public.eq.true`)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Thought[];
}

export async function addThought(
  title: string,
  content: string,
  isPublic: boolean
) {
  const supabase = await createClient();
  const { data: session } = await supabase.auth.getSession();

  if (!session?.session?.user) {
    throw new Error("Not authenticated");
  }

  const { data, error } = await supabase
    .from("thoughts")
    .insert([
      {
        title,
        content,
        user_id: session.session.user.id,
        is_public: isPublic,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data as Thought;
}

export async function deleteThought(id: number) {
  const supabase = await createClient();
  const { error } = await supabase.from("thoughts").delete().match({ id });
  if (error) throw error;
}

export async function updateThought(id: number, updates: Partial<Thought>) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("thoughts")
    .update(updates)
    .match({ id });
  if (error) throw error;
}
