import { createAdminClient } from "@/lib/supabase/server";

export interface Councillor {
  council: string | null;
  councillor_name: string | null;
  next_election: string | null;
  party_name: string | null;
  source_data_year: number | null;
  ward_name: string | null;
}

export async function getCouncillors(
  wardName: string | null
): Promise<Councillor[] | null> {
  if (!wardName) return null;

  const supabase = await createAdminClient();
  const { data: wardCouncillors, error: councillorsError } = await supabase
    .from("current_councillors")
    .select()
    .eq("ward_name", wardName)
    .gte("next_election", new Date().toISOString());

  if (councillorsError) {
    console.error("Error fetching councillors:", councillorsError);
    return null;
  }

  return wardCouncillors;
}
