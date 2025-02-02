"use client";

import { ArrowLeft, MapPin, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/database.types";
import { ProfileAvatar } from "./profile-avatar";
import Image from "next/image";
import { UserAvatar } from "../user-avatar";

type User = Database["public"]["Views"]["public_users"]["Row"];

interface PublicProfileHeaderProps {
  profile: User;
}

export function PublicProfileHeader({ profile }: PublicProfileHeaderProps) {
  const supabase = createClient();

  return (
    <div className="relative max-w-2xl mx-auto px-3">
      {/* Banner Image */}
      <div className="relative h-32 sm:h-48 bg-black dark:bg-white w-full bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl overflow-hidden">
        <Image
          src="/images/london-map-dark.png"
          alt="Profile banner"
          fill
          className="object-cover dark:hidden"
        />
        <Image
          src="/images/london-map-light.png"
          alt="Profile banner"
          fill
          className="object-cover hidden dark:block"
        />
      </div>

      {/* Profile Info */}
      <div className="">
        <div className="relative -mt-16 ml-4">
          <UserAvatar
            src={profile.avatar || undefined}
            name={profile.display_name || undefined}
            className="h-24 w-24 sm:h-32 sm:w-32 border-[5px] border-background rounded-full"
          />
        </div>

        <div className="mt-4">
          <h1 className="text-2xl font-bold">
            {profile.display_name || "User"}
          </h1>

          {profile.bio && (
            <p className="mt-3 text-foreground/90">{profile.bio}</p>
          )}

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <LinkIcon className="h-4 w-4" />
              <Link
                href="/local"
                className="text-muted-foreground hover:underline"
              >
                lcly.uk
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
