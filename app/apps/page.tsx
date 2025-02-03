"use client";

import { PageHeaderWithIcon } from "@/components/ui/page-header-with-icon";
import { motion } from "framer-motion";
import {
  Settings,
  Users,
  Newspaper,
  Notebook,
  Bell,
  LayoutGrid,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const apps = [
  {
    title: "Thoughts",
    description: "Write and share",
    icon: Notebook,
    href: "/thoughts",
  },
  {
    title: "Friends",
    description: "Your contact book",
    icon: Users,
    href: "/friends",
  },
  {
    title: "Notifications",
    description: "See your notifications",
    icon: Bell,
    href: "/notifications",
  },
  {
    title: "Newspaper",
    description: "Your daily dose of news",
    icon: Newspaper,
    href: "/news",
  },
  {
    title: "Settings",
    description: "Manage your settings",
    icon: Settings,
    href: "/settings",
  },
];

export default function AppsPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <PageHeaderWithIcon icon={LayoutGrid} title="Services" hideBackButton />

      <div className="grid gap-4 grid-cols-3">
        {apps.map((app) => {
          const Icon = app.icon;
          return (
            <motion.div key={app.title} {...fadeIn}>
              <Link href={app.href}>
                <div
                  className={cn(
                    "h-full aspect-square md:aspect-auto",
                    "p-4 rounded-3xl bg-white/90 dark:bg-black/90 border border-border/50",
                    "backdrop-blur-sm shadow-sm hover:bg-white/95 dark:hover:bg-black/95 transition-colors"
                  )}
                >
                  <div className="flex flex-col items-center md:items-start justify-center h-full">
                    <Icon className="h-8 w-8 md:h-6 md:w-6 text-muted-foreground mb-2" />
                    <h3 className="text-base font-medium text-center md:text-left">
                      {app.title}
                    </h3>
                    <p className="text-sm text-muted-foreground hidden md:block">
                      {app.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
