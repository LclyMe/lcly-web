"use client";

import { Profile } from "@/lib/server/profile";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";
import { ArrowLeft } from "lucide-react";
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
      <div className="absolute left-4 top-4">
        <Link href="/">
          <Button variant="secondary" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="flex flex-col items-center px-4 py-16">
        <UserAvatar className="h-28 w-28 mb-6" />
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          {profile.display_name || "User"}
        </h1>
        <div className="flex items-center gap-2 text-muted-foreground text-xl">
          {profile.username && <span>@{profile.username}</span>}
          {profile.postcode && (
            <>
              <span className="text-muted-foreground/40">•</span>
              <span>{profile.postcode}</span>
            </>
          )}
        </div>
        <Button variant="outline" className="mt-6" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
    </div>
  );
}
