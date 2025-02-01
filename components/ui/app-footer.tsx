"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Bell, MapPin, User, Newspaper } from "lucide-react";

interface AppFooterProps {
  className?: string;
  children?: React.ReactNode;
}

const defaultNavItems = [
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
    href: "/profile",
    icon: User,
  },
];

export function AppFooter({ className, children }: AppFooterProps) {
  const pathname = usePathname();

  // If children are provided, render those instead of default nav
  //   if (children) {
  //     return (
  //       <footer
  //         className={cn(
  //           "fixed bottom-0 left-0 right-0",
  //           "bg-background/80 backdrop-blur-md",
  //           "border-t border-border",
  //           "flex items-center justify-between",
  //           "px-4 pt-2",
  //           "pb-[env(safe-area-inset-bottom)]", // iOS safe area support
  //           className
  //         )}
  //       >
  //         {children}
  //       </footer>
  //     );
  //   }

  // Default navigation footer
  return (
    <footer
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[1001]",
        "bg-background/80 backdrop-blur-md",
        "border-t border-border",
        "pt-2",
        "pb-[calc(env(safe-area-inset-bottom)+32px)]",
        className
      )}
    >
      <nav className="flex items-center justify-around">
        {defaultNavItems.map((item) => {
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
