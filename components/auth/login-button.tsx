import { useAuth } from "@/hooks/use-auth";
import { LockIcon } from "lucide-react";
import Link from "next/link";
import { CurrentUserAvatar } from "../current-user-avatar";

export function LoginButton() {
  const { user } = useAuth();

  if (user) {
    return (
      <Link href="/home">
        <button className="flex items-center gap-2 rounded-full bg-black p-0 md:pl-2 md:pr-3 md:py-1 h-10 w-10 md:w-auto text-sm text-white hover:bg-gray-900">
          <CurrentUserAvatar className="h-10 w-10 md:h-7 md:w-7" />
          <span className="hidden md:block">Home</span>
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
