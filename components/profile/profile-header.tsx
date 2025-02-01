"use client";

import { Profile } from "@/lib/server/profile";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";
import { ArrowLeft, Bell } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface ProfileHeaderProps {
  profile: Profile;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="relative">
      <div className="absolute left-0 top-2 md:top-4 px-3 md:px-0 w-full flex justify-between items-center">
        <Link href="/">
          <Button variant="secondary" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <Link href="/notifications">
          <Button variant="secondary" size="icon" className="h-8 w-8">
            <Bell className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="flex flex-col items-center px-4 py-10 md:pt-24">
        <UserAvatar className="h-20 w-20 md:h-28 md:w-28 mb-4 md:mb-6" />
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight md:mb-2">
          {profile.display_name || "User"}
        </h1>
        <div className="flex items-center gap-2 text-muted-foreground text-base md:text-xl">
          {profile.username && <span>@{profile.username}</span>}
          {profile.postcode && (
            <>
              <span className="text-muted-foreground/40">•</span>
              <span>{profile.postcode}</span>
            </>
          )}
        </div>
        <Button
          variant="outline"
          className="mt-4 md:mt-6"
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}
