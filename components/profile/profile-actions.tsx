"use client";

import { useProfile } from "@/hooks/use-profile";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

interface ProfileActionsProps {
  username: string;
  showEditButton?: boolean;
}

export function ProfileActions({ username }: ProfileActionsProps) {
  const { profile } = useProfile();
  const isOwnProfile = profile?.username === username;

  return (
    <div className="flex items-center gap-2">
      {isOwnProfile && (
        <Link href="/profile">
          <Button variant="default" size="sm" className="gap-2">
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
        </Link>
      )}
    </div>
  );
}
