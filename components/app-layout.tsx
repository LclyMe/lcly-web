"use client";

import { usePathname } from "next/navigation";
import { AppFooter } from "./ui/app-footer";
import { Dock, DockIcon, DockItem, DockLabel } from "./ui/dock";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Home,
  Bell,
  MapPin,
  User,
  Newspaper,
  Grid,
  LayoutGrid,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { useProfile } from "@/hooks/use-profile";

interface AppLayoutProps {
  children: React.ReactNode;
}

const getNavItems = (username: string | null | undefined) => [
  {
    label: "Home",
    href: "/home",
    icon: Home,
  },
  {
    label: "Map",
    href: "/map",
    icon: MapPin,
  },
  {
    label: "Local",
    href: "/local",
    icon: Newspaper,
  },
  {
    label: "Profile",
    href: username ? `/u/${username}` : "/profile",
    icon: User,
  },
  {
    label: "Apps",
    href: "/apps",
    icon: LayoutGrid,
  },
];

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  const { profile } = useProfile();
  const navItems = getNavItems(profile?.username);

  const showMobileNav = user && pathname !== "/" && !pathname.includes("/auth");

  return (
    <div className="bg-background flex flex-col min-h-[100vh]">
      <main
        className={cn(
          "flex-grow",
          showMobileNav &&
            "pb-[calc(env(safe-area-inset-bottom)+32px+80px)] md:pb-0 min-h-[100vh]"
        )}
      >
        {children}
      </main>

      {/* Desktop Dock - hidden on mobile, shown on md and up */}
      {showMobileNav && (
        <>
          <div className="hidden md:block fixed bottom-8 left-1/2 -translate-x-1/2 z-[1001]">
            <Dock className="items-end pb-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <DockItem className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800">
                      <DockIcon>
                        <Icon
                          className={cn(
                            "h-8 w-8",
                            isActive
                              ? "text-foreground"
                              : "text-muted-foreground"
                          )}
                        />
                      </DockIcon>
                      <DockLabel>{item.label}</DockLabel>
                    </DockItem>
                  </Link>
                );
              })}
            </Dock>
          </div>

          {/* Mobile Footer - shown on mobile, hidden on md and up */}
          <div className="md:hidden">
            <AppFooter navItems={navItems} />
          </div>
        </>
      )}
    </div>
  );
}
