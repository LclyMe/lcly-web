import { useAuth } from "@/hooks/use-auth";
import { LockIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function LoginButton() {
  const { user } = useAuth();

  if (user) {
    return (
      <Link href="/profile">
        <button className="flex items-center gap-2 rounded-full bg-gray-800 px-4 py-2 text-sm text-white hover:bg-gray-700">
          {user.user_metadata.avatar_url && (
            <Image
              src={user.user_metadata.avatar_url}
              alt={user.user_metadata.full_name}
              className="h-6 w-6 rounded-full"
              width={24}
              height={24}
            />
          )}
          My Profile
        </button>
      </Link>
    );
  }

  return (
    <Link href="/login">
      <button className="flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm text-white hover:bg-gray-900">
        <LockIcon className="h-4 w-4" />
        Sign in
      </button>
    </Link>
  );
}
