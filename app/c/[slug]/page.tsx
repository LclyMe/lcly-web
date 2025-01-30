import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CommunityHeader } from "@/components/communities/community-header";
import { getWeather } from "@/lib/utils/weather";

interface CommunityPageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface WikipediaData {
  extract?: string;
  thumbnail?: {
    source: string;
  };
}

async function getCommunityBySlug(slug: string) {
  const supabase = await createClient();

  // First get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: community, error } = await supabase
    .rpc("get_community", {
      communityid: slug.toLowerCase(),
    })
    .single();

  if (error || !community) {
    return null;
  }

  // Check membership if user is logged in
  let isMember = false;
  if (user) {
    const { data: membership } = await supabase
      .from("community_members")
      .select("*")
      .eq("communityid", community.id)
      .eq("user_id", user.id)
      .single();
    isMember = !!membership;
  }

  // Parse location from the 'loc' field which is in format 'POINT(long lat)'
  const match = community.loc?.match(/POINT\(([-\d.]+) ([-\d.]+)\)/);
  if (match) {
    const [_, longitude, latitude] = match;
    const weatherData = await getWeather(
      parseFloat(latitude),
      parseFloat(longitude)
    );
    return { ...community, weather: weatherData, isMember };
  }

  return { ...community, isMember };
}

export async function generateMetadata({
  params,
}: CommunityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const community = await getCommunityBySlug(slug);

  if (!community) {
    return {
      title: "Community Not Found | Lcly",
    };
  }

  return {
    title: `${community.name} | Lcly`,
    description:
      (community.wikipedia_data as WikipediaData)?.extract ||
      `Join ${community.name} on Lcly to connect with locals and stay updated with what's happening.`,
  };
}

export default async function CommunityPage({ params }: CommunityPageProps) {
  const { slug } = await params;
  const community = await getCommunityBySlug(slug);

  if (!community) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <CommunityHeader community={community} />
    </main>
  );
}
