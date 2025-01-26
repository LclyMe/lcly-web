import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useProfile } from "@/hooks/use-profile";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  className?: string;
  fallback?: string;
}

export function UserAvatar({ className, fallback }: UserAvatarProps) {
  const { user } = useAuth();
  const { profile } = useProfile();

  if (!user)
    return (
      <Avatar className={cn("h-7 w-7", className)}>
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    );

  const avatarUrl = profile?.avatar || user.user_metadata.avatar_url;
  const fallbackText =
    fallback ||
    profile?.display_name?.[0] ||
    user.user_metadata.full_name?.[0] ||
    user.email?.[0] ||
    "U";

  return (
    <Avatar className={cn("", className)}>
      {avatarUrl ? (
        <AvatarImage src={avatarUrl} className="object-cover" />
      ) : (
        <AvatarFallback>{fallbackText}</AvatarFallback>
      )}
    </Avatar>
  );
}
