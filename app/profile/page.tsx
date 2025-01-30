import { getCurrentProfile, getUserFirstCommunity } from "@/lib/server/profile";
import { redirect } from "next/navigation";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileMenu } from "@/components/profile/profile-menu";

export default async function ProfilePage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");

  const firstCommunity = await getUserFirstCommunity(profile.id);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <ProfileHeader profile={profile} />
      <ProfileMenu firstCommunity={firstCommunity} />
    </div>
  );
}
