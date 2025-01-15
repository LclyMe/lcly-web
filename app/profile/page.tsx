"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProfilePage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!user) {
    router.push("/login");
    return null;
  }
  console.log(user);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:items-center">
              {user.user_metadata.avatar_url && (
                <Image
                  src={user.user_metadata.avatar_url}
                  alt={user.user_metadata.full_name || "Profile"}
                  className="h-20 w-20 rounded-full"
                  width={80}
                  height={80}
                />
              )}
              <div className="mt-4 sm:ml-4 sm:mt-0">
                <h1 className="text-xl font-semibold text-gray-900">
                  {user.user_metadata.full_name || "User"}
                </h1>
                <p className="mt-1 text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
            <div className="mt-4 sm:ml-6 sm:mt-0">
              <Button variant="outline" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900">Account Details</h2>
          <div className="mt-4 space-y-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Account ID</dt>
              <dd className="mt-1 text-sm text-gray-900">{user.id}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">
                Email verified
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {user.email_confirmed_at ? (
                  <span className="text-green-600">Yes</span>
                ) : (
                  <span className="text-red-600">No</span>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Provider</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {user.app_metadata.provider || "Email"}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">
                Account created
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {new Date(user.created_at).toLocaleDateString()}
              </dd>
            </div>
          </div>
        </div>
      </div>

      {/* You can add more sections here like:
          - Saved locations
          - Preferences
          - Connected accounts
          - etc. */}
    </div>
  );
}
