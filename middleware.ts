import { NextResponse, NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/middleware";
import { geolocation } from "@vercel/functions";

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const geo = geolocation(request);
  console.log("Geo:", geo);
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
