import { createClient } from "@/lib/supabase/server";
import { Database } from "@/types/database.types";

export type Profile = Database["public"]["Tables"]["users"]["Row"] & {
  postcode_location?: Database["public"]["Tables"]["postcode_locations"]["Row"];
};

export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  if (!user.data.user?.id) return null;
  return getProfile(user.data.user?.id);
}

export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = await createClient();

  const { data: user, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (userError) {
    console.error("Error fetching profile:", userError);
    return null;
  }

  if (user?.postcode) {
    const { data: postcodeLocation } = await supabase
      .from("postcode_locations")
      .select("*")
      .eq("postcode", user.postcode)
      .single();

    return {
      ...user,
      postcode_location: postcodeLocation || undefined,
    };
  }

  return user;
}

export async function updateProfile(userId: string, updates: Partial<Profile>) {
  const supabase = await createClient();

  // Extract postcode_location from updates as it's not part of the users table
  const { postcode_location, ...userUpdates } = updates;

  const { data, error } = await supabase
    .from("users")
    .update(userUpdates)
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function uploadAvatar(userId: string, file: File) {
  const supabase = await createClient();

  const filePath = `/${userId}/${file.name}-${Date.now()}`;
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file);

  if (uploadError) {
    throw uploadError;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(filePath);

  return publicUrl;
}
