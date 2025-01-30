"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Bell,
  Building2,
  Settings,
  Users,
  Notebook,
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

interface ProfileMenuProps {
  firstCommunity: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

const getProfileSections = (
  firstCommunity: ProfileMenuProps["firstCommunity"]
) => [
  {
    title: "Local Area",
    description: "See what's going on in your local area.",
    icon: MapPin,
    href: "/map",
    comingSoon: false,
  },
  {
    title: firstCommunity ? "My Community" : "Join a Community",
    description: firstCommunity
      ? `View and engage with ${firstCommunity.name}`
      : "Find and join a local community",
    icon: Users,
    href: firstCommunity ? `/c/${firstCommunity.slug}` : "/communities",
    comingSoon: false,
  },
  {
    title: "Weekly Newspaper",
    description:
      "Your personalised local newspaper covering things local to you.",
    icon: Building2,
    href: "#",
    comingSoon: true,
  },
  {
    title: "Friends",
    description: "Your friends and local connections.",
    icon: Users,
    href: "#",
    comingSoon: true,
  },
  {
    title: "My Thoughts",
    description: "Write down your thoughts and ideas. Share them if you want.",
    icon: Notebook,
    href: "/thoughts",
    comingSoon: false,
  },
  //   {
  //     title: "Notifications",
  //     description: "Control how you receive updates from your community",
  //     icon: Bell,
  //     href: "/notifications",
  //   },
  {
    title: "Settings",
    description: "Manage your account security and privacy preferences",
    icon: Settings,
    href: "/settings",
  },
];

export function ProfileMenu({ firstCommunity }: ProfileMenuProps) {
  const profileSections = getProfileSections(firstCommunity);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {profileSections.map((section) => (
        <motion.div key={section.title} {...fadeIn} className="group relative">
          {section.comingSoon ? (
            <Card className="relative h-full overflow-hidden bg-muted/50">
              <CardHeader>
                <section.icon className="h-6 w-6 text-muted-foreground mb-2" />
                <CardTitle className="flex items-center text-muted-foreground gap-2">
                  {section.title}
                  <Badge variant="secondary">Coming Soon</Badge>
                </CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <Link href={section.href}>
              <Card className="overflow-hidden h-full transition-colors hover:bg-muted/50">
                <CardHeader>
                  <section.icon className="h-6 w-6 text-muted-foreground mb-2" />
                  <CardTitle>{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          )}
        </motion.div>
      ))}
    </div>
  );
}
