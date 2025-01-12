import { NextResponse, NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const url = request.nextUrl;

  // Get geolocation data
  const geoRes = await fetch(`${url.origin}/api/geo`);
  const geo = await geoRes.json();

  // Add geolocation data to request headers
  res.headers.set("x-country-code", JSON.stringify(geo));

  // Update Supabase session
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!api/|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
