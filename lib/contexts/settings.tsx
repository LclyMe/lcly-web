"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { AppSettings } from "@/lib/settings";

type SettingsContextType = {
  settings: Partial<AppSettings>;
  isLoading: boolean;
};

const SettingsContext = createContext<SettingsContextType>({
  settings: {},
  isLoading: true,
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Partial<AppSettings>>({});
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchSettings() {
      const { data } = await supabase
        .from("app_settings")
        .select("value")
        .single();

      if (data?.value) {
        setSettings(data.value as AppSettings);
      }
      setIsLoading(false);
    }

    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, isLoading }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
