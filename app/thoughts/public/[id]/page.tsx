import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { PublicThoughtView } from "@/components/thoughts/public-view";
import { Thought } from "@/types/thoughts";

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = await createClient();
  const { data: thought } = await supabase
    .from("thoughts")
    .select("*")
    .eq("id", Number(params.id))
    .eq("is_public", true)
    .single();

  if (!thought) return {};

  const title = thought.title || "Untitled Thought";

  return {
    title,
    description: thought.content,
  };
}

export default async function PublicThoughtPage({ params }: Props) {
  const supabase = await createClient();
  const { data: thought } = await supabase
    .from("thoughts")
    .select("*")
    .eq("id", Number(params.id))
    .eq("is_public", true)
    .single();

  if (!thought) notFound();

  return <PublicThoughtView thought={thought as Thought} />;
}
