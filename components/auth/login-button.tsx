import { useAuth } from "@/hooks/use-auth";
import { LockIcon } from "lucide-react";
import Link from "next/link";
import { UserAvatar } from "@/components/user-avatar";

export function LoginButton() {
  const { user } = useAuth();

  if (user) {
    return (
      <Link href="/profile">
        <button className="flex items-center gap-2 rounded-full bg-gray-800 px-3 py-1 h-10 text-sm text-white hover:bg-gray-700">
          <UserAvatar className="h-7 w-7" />
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
