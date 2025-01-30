import { NextRequest, NextResponse } from "next/server";
import { getCommunities } from "@/lib/server/communities";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search") || undefined;
    const type = searchParams.get("type") || undefined;

    const communities = await getCommunities({ search, type });
    return NextResponse.json(communities);
  } catch (error) {
    console.error("Error in communities API:", error);
    return NextResponse.json(
      { error: "Failed to fetch communities" },
      { status: 500 }
    );
  }
}
