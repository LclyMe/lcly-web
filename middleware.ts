import { NextResponse, NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const url = request.nextUrl;

  // Run both async operations in parallel for performance
  // { countryCode }
  const [] = await Promise.all([
    // fetch(`${url.origin}/api/geo`).then((res) => res.json()),
    updateSession(request),
  ]);

  // res.headers.set("x-country-code", countryCode);
  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
