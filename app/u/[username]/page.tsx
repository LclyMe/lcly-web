import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PublicProfileHeader } from "@/components/profile/public-profile-header";
import { Database } from "@/types/database.types";
import { ThoughtCard } from "@/components/thoughts/thought-card";
import { BackButton } from "@/components/ui/back-button";

interface PageProps {
  params: Promise<{
    username: string;
  }>;
}

type PublicUser = Database["public"]["Views"]["public_users"]["Row"];
type Thought = Database["public"]["Tables"]["thoughts"]["Row"];

async function getProfileByUsername(
  username: string
): Promise<PublicUser | null> {
  const supabase = await createClient();
  const { data: profile } = await supabase
    .rpc("get_public_profile", { username_param: username })
    .single();

  return profile;
}

async function getProfileThoughts(profileId: string | null) {
  if (!profileId) return [];

  const supabase = await createClient();

  const { data: thoughts } = await supabase
    .from("thoughts")
    .select()
    .eq("user_id", profileId)
    .eq("is_public", true)
    .order("created_at", { ascending: false });

  return (thoughts as Thought[]) || [];
}

export default async function PublicProfilePage({ params }: PageProps) {
  const { username } = await params;
  const profile = await getProfileByUsername(username);
  if (!profile) {
    notFound();
  }

  const thoughts = await getProfileThoughts(profile.id);

  return (
    <div className="container max-w-2xl mx-auto pt-8">
      <div className="flex items-center gap-4 mb-4">
        <BackButton />
        <div className="flex flex-col gap-[2px]">
          <span className="text-lg capitalize">@{profile.username}</span>
          <span className="text-xs text-muted-foreground">Ravenfield</span>
        </div>
      </div>
      <PublicProfileHeader profile={profile} />

      <div className="mt-6">
        <div className="divide-y divide-border/50">
          {thoughts.map((thought) => (
            <ThoughtCard
              key={thought.id}
              thought={thought}
              author={profile}
              showAuthor={false}
            />
          ))}
          {thoughts.length === 0 && (
            <p className="text-muted-foreground text-center py-8">
              No thoughts yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
