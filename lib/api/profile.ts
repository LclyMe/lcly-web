import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/database.types";

export type Profile = Database["public"]["Tables"]["users"]["Row"];

export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }

  return data;
}

export async function updateProfile(userId: string, updates: Partial<Profile>) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function uploadAvatar(userId: string, file: File) {
  const supabase = createClient();

  const filePath = `/${userId}/${file.name}`;
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
