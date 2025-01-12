import { NextRequest, NextResponse } from "next/server";
import { geolocation } from "@vercel/functions";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const geo = geolocation(req);
  console.log("Geo:", geo);

  return NextResponse.json({
    countryCode: geo.country || "UN",
    ...geo,
  });
}
