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

  return features;
}
