import { createClient } from "@/lib/supabase/server";
import { Database } from "@/types/database.types";
import { ThoughtCard } from "@/components/thoughts/thought-card";

type Thought = Database["public"]["Tables"]["thoughts"]["Row"];
type PublicUser = Database["public"]["Views"]["public_users"]["Row"];

interface ThoughtWithAuthor extends Thought {
  author: PublicUser;
}

async function getPublicThoughts() {
  const supabase = await createClient();

  const { data: thoughts } = await supabase
    .from("public_thoughts")
    .select()
    .order("created_at", { ascending: false });

  return (thoughts as ThoughtWithAuthor[]) || [];
}

export default async function LocalPage() {
  const thoughts = await getPublicThoughts();

  return (
    <div className="container mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold px-3 py-3">Your Local Feed</h1>

      <div className="divide-y divide-border/50 mb-16">
        {thoughts.map((thought) => (
          <ThoughtCard
            key={thought.id}
            thought={thought}
            author={thought.author}
            showAuthor={true}
          />
        ))}
        {thoughts.length === 0 && (
          <p className="text-muted-foreground text-center py-8">
            No thoughts yet
          </p>
        )}
      </div>
    </div>
  );
}
