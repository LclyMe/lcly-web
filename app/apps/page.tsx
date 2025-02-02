"use client";

import { PageHeaderWithIcon } from "@/components/ui/page-header-with-icon";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
                <Card className="h-full aspect-square md:aspect-auto hover:bg-muted/50 transition-colors">
                  <CardHeader className="flex p-4 flex-col items-center md:items-start justify-center h-full">
                    <Icon className="h-8 w-8 md:h-6 md:w-6 text-muted-foreground mb-2" />
                    <CardTitle className="text-base text-center md:text-left">
                      {app.title}
                    </CardTitle>
                    <CardDescription className="text-sm hidden md:block">
                      {app.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
