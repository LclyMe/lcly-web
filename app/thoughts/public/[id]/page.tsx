import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { PublicThoughtView } from "@/components/thoughts/public-view";
import { Thought } from "@/types/thoughts";
import { remark } from "remark";
import strip from "strip-markdown";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

// Helper function to strip markdown and trim text
const processContent = async (content: string): Promise<string> => {
  // Strip markdown
  const processed = await remark().use(strip).process(content);

  // Convert to string and clean up
  const plainText = String(processed).trim().replace(/\s+/g, " "); // Replace multiple spaces/newlines with single space

  // Trim to ~160 characters for meta description, breaking at word boundary
  const trimmed =
    plainText.length > 160
      ? plainText.substring(0, 157).replace(/\s+\S*$/, "...")
      : plainText;

  return trimmed;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data: thought } = await supabase
    .from("thoughts")
    .select("*")
    .eq("id", Number(id))
    .eq("is_public", true)
    .single();

  if (!thought) return {};

  const title = thought.title || "Untitled Thought";
  const description = await processContent(thought.content);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: thought.created_at,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function PublicThoughtPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: thought } = await supabase
    .from("thoughts")
    .select("*")
    .eq("id", Number(id))
    .eq("is_public", true)
    .single();

  if (!thought) notFound();

  return <PublicThoughtView thought={thought as Thought} />;
}
