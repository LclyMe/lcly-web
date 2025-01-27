import { NextResponse } from "next/server";
import { getPostcodeLocation } from "@/lib/server/postcode";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postcode = searchParams.get("postcode");

  if (!postcode) {
    return NextResponse.json(
      { error: "Postcode is required" },
      { status: 400 }
    );
  }

  try {
    const location = await getPostcodeLocation(postcode);
    return NextResponse.json(location);
  } catch (error) {
    console.error("Error validating postcode:", error);
    return NextResponse.json({ error: "Invalid postcode" }, { status: 400 });
  }
}
