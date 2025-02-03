"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useProfile } from "@/hooks/use-profile";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src?: string;
  name?: string;
  className?: string;
  fallback?: string;
}

export function UserAvatar({
  src,
  name,
  className,
  fallback,
}: UserAvatarProps) {
  const fallbackText = fallback || name?.[0] || "U";

  return (
    <Avatar className={cn("", className)}>
      {src ? (
        <AvatarImage src={src} className="object-cover" />
      ) : (
        <AvatarFallback>{fallbackText}</AvatarFallback>
      )}
    </Avatar>
  );
}
