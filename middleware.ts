import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "./lib/supabase/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = await createClient();
  const session = await supabase.auth.getSession();

  // Add paths that require authentication
  const protectedPaths = ["/profile", "/onboarding"];
  const isProtectedPath = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  // Redirect to home if logged in and on root path
  // if (req.nextUrl.pathname === "/" && session.data.session) {
  //   return NextResponse.redirect(new URL("/home", req.url));
  // }

  // Redirect to login if not authenticated and trying to access protected path
  if (isProtectedPath && !session.data.session) {
    const redirectUrl = new URL("/login", req.url);
    redirectUrl.searchParams.set("redirectTo", req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
