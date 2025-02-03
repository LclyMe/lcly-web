import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);

    // Check if user has completed onboarding
    const { data: user } = await supabase
      .from("users")
      .select("username")
      .single();

    // If no username, redirect to onboarding
    if (!user?.username) {
      return NextResponse.redirect(requestUrl.origin + "/onboarding");
    }

    // If has username, redirect to map
    return NextResponse.redirect(requestUrl.origin + "/home");
  }

  // If no code, redirect to login
  return NextResponse.redirect(requestUrl.origin + "/login");
}
