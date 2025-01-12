import { createClient } from "@/lib/supabase/server";

export type AppSettings = {
  theme: {
    primaryColor: string;
    accentColor: string;
  };
  loyalty: {
    defaultStampsRequired: number;
    expiryDays: number;
  };
  notifications: {
    emailEnabled: boolean;
    smsEnabled: boolean;
  };
};

export async function getSettings(): Promise<Partial<AppSettings>> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("app_settings")
    .select("key, value")
    .single();

  if (error) {
    console.error("Error fetching settings:", error);
    return {};
  }

  return data?.value || {};
}

export async function updateSettings(
  settings: Partial<AppSettings>
): Promise<boolean> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("app_settings")
    .upsert({ key: "app_settings", value: settings });

  if (error) {
    console.error("Error updating settings:", error);
    return false;
  }

  return true;
}
