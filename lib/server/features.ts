import { Database } from "@/types/database.types";
import { createClient } from "../supabase/server";

type FeatureVote = {
  feature_id: string;
};

export type FeatureWithVotes =
  Database["public"]["Functions"]["get_feature_ideas_with_votes"]["Returns"][number];

export async function getFeatures(): Promise<FeatureWithVotes[]> {
  const supabase = await createClient();

  // Get features with vote counts using the database function
  const { data: features, error } = await supabase.rpc(
    "get_feature_ideas_with_votes"
  );

  if (error) {
    console.error("Error fetching features:", error);
    return [];
  }

  // Get user's votes if logged in
  const {
    data: { session },
  } = await supabase.auth.getSession();
  let userVotes: string[] = [];

  if (session?.user) {
    const { data: votes } = await supabase
      .from("feature_votes")
      .select("feature_id")
      .eq("user_id", session.user.id);

    userVotes = ((votes as FeatureVote[]) || []).map((v) => v.feature_id);
  }

  // Transform the data to include user's vote status
  return (features || []).map((feature) => ({
    id: feature.id,
    created_at: feature.created_at,
    title: feature.title,
    description: feature.description,
    image: feature.image,
    status: feature.status,
    votes_count: Number(feature.votes_count),
    has_voted: userVotes.includes(feature.id),
  }));
}
