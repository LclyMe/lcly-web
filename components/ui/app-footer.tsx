"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Extend Navigator interface to include the standalone property
declare global {
  interface Navigator {
    standalone?: boolean;
  }
}

interface AppFooterProps {
  className?: string;
  navItems: {
    label: string;
    href: string;
    icon: React.ElementType;
  }[];
}

export function AppFooter({ className, navItems }: AppFooterProps) {
  const pathname = usePathname();
  const [isStandaloneIOS, setIsStandaloneIOS] = useState(false);

  useEffect(() => {
    // Check if the app is running in standalone mode on iOS
    const isInStandaloneMode = window.navigator.standalone === true;
    const isIOS = /iphone|ipad|ipod/.test(
      window.navigator.userAgent.toLowerCase()
    );

    setIsStandaloneIOS(isInStandaloneMode && isIOS);
  }, []);

  return (
    <footer
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[1001]",
        "bg-background/80 backdrop-blur-md",
        "border-t border-border",
        "pt-2",
        isStandaloneIOS
          ? "pb-[calc(env(safe-area-inset-bottom)+28px)]"
          : "pb-2",
        className
      )}
    >
      <nav className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center py-2 px-3 min-w-[64px]",
                "text-muted-foreground hover:text-foreground transition-colors",
                isActive && "text-foreground"
              )}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
}
