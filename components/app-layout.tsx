"use client";

import { usePathname } from "next/navigation";
import { AppFooter } from "./ui/app-footer";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const [isStandalone, setIsStandalone] = useState(false);

  const showAppFooter = isStandalone && !pathname.includes("/auth");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
    }
  }, []);

  return (
    <div className="bg-background flex flex-col min-h-[100vh]">
      <main
        className={cn(
          "flex-grow",
          showAppFooter &&
            "pb-[calc(env(safe-area-inset-bottom)+32px+70px)] flex-grow flex flex-col min-h-[100vh]"
        )}
      >
        {children}
      </main>
      {showAppFooter && <AppFooter />}
    </div>
  );
}
