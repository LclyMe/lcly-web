import { createClient } from "@/lib/supabase/server";
import { Database } from "@/types/database.types";

export type Community =
  Database["public"]["Functions"]["get_community"]["Returns"][0] & {
    weather?: {
      temperature_2m: number;
      weather_code: number;
      time: string;
    };
  };

interface GetCommunitiesOptions {
  search?: string;
  type?: string;
}

export async function getCommunities({
  search,
  type,
}: GetCommunitiesOptions = {}) {
  const supabase = await createClient();

  let query = supabase
    .from("communities")
    .select("*")
    .or("avatar.neq.null,wikipedia_data->thumbnail->>source.neq.null")
    .neq("type", "country")
    .neq("type", "continent")
    .neq("type", "union")
    .neq("type", "local");

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  if (type && type !== "all") {
    query = query.eq("type", type);
  }

  const { data, error } = await query.order("name", { ascending: true });

  if (error) {
    console.error("Error fetching communities:", error);
    throw error;
  }

  return data;
}
