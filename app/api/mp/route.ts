import { NextRequest, NextResponse } from "next/server";
import { getMP } from "@/lib/server/mp";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const constituency = searchParams.get("constituency");

  if (!constituency) {
    return NextResponse.json(
      { error: "Constituency parameter is required" },
      { status: 400 }
    );
  }

  try {
    const mpData = await getMP(constituency);
    return NextResponse.json(mpData);
  } catch (error) {
    console.error("Error fetching MP data:", error);
    return NextResponse.json(
      { error: "Failed to fetch MP data" },
      { status: 500 }
    );
  }
}
