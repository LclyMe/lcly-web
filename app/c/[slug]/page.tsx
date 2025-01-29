import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CommunityHeader } from "@/components/communities/community-header";
import { CommunityContent } from "@/components/communities/community-content";

interface CommunityPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getCommunityBySlug(slug: string) {
  const supabase = await createClient();
  const { data: community, error } = await supabase
    .from("communities")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !community) {
    return null;
  }

  return community;
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
      (community.wikipedia_data as any)?.extract ||
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
      {/* <div className="border-t">
        <div className="container mx-auto px-4">
          <CommunityContent community={community} />
        </div>
      </div> */}
    </main>
  );
}
