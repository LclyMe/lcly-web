"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  MapPin,
  Bell,
  Home,
  Building2,
  ArrowLeftIcon,
  Settings,
  Users,
  Notebook,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useProfile } from "@/hooks/use-profile";
import { UserAvatar } from "@/components/user-avatar";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const profileSections = [
  {
    title: "Local Area",
    description: "See what's going on in your local area.",
    icon: MapPin,
    href: "/map",
    comingSoon: false,
  },
  {
    title: "My Home",
    description: "Your home and family.",
    icon: Home,
    comingSoon: true,
  },
  {
    title: "Weekly Newspaper",
    description:
      "Your personalised local newspaper covering things local to you.",
    icon: Building2,
    comingSoon: true,
  },
  {
    title: "Friends",
    description: "Your friends and local connections.",
    icon: Users,
    comingSoon: true,
  },
  {
    title: "My Thoughts",
    description: "Write down your thoughts and ideas. Share them if you want.",
    icon: Notebook,
    href: "/thoughts",
    comingSoon: false,
  },
  {
    title: "Notifications",
    description: "Control how you receive updates from your community",
    icon: Bell,
    href: "/notifications",
  },
  {
    title: "Settings",
    description: "Manage your account security and privacy preferences",
    icon: Settings,
    href: "/settings",
  },
];

export default function ProfilePage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const { profile, isLoading } = useProfile();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (loading || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8 max-w-6xl"
      >
        {/* Header */}
        <div className="relative mb-16">
          <Link href="/">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full absolute -top-14 left-0"
            >
              <ArrowLeftIcon className="h-4 w-4" />
            </Button>
          </Link>

          <motion.div {...fadeIn} className="text-center mt-16">
            <UserAvatar className="h-24 w-24 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 transition-all duration-200">
              {profile?.display_name || user.user_metadata.full_name || "User"}
            </h1>

            <p className="text-lg text-muted-foreground mt-2">
              {profile?.username && `@${profile.username}`} |{" "}
              {profile?.postcode && profile.postcode}
            </p>
            <Button variant="outline" onClick={handleSignOut} className="mt-6">
              Sign Out
            </Button>
          </motion.div>
        </div>

        {/* Profile Sections Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 mb-24"
        >
          {profileSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <Link
                href={section.href || "#"}
                className={section.comingSoon ? "cursor-not-allowed" : ""}
              >
                <Card
                  className={cn(
                    "hover:shadow-lg transition-shadow duration-200",
                    section.comingSoon && "opacity-50"
                  )}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="rounded-lg bg-primary/10 p-2.5">
                        <section.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-xl mb-2">
                            {section.title}
                          </CardTitle>
                          {section.comingSoon && (
                            <Badge variant="secondary" className="ml-2">
                              Coming Soon
                            </Badge>
                          )}
                        </div>
                        <CardDescription>{section.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center text-muted-foreground text-sm"
        >
          <p>Member since {new Date(user.created_at).toLocaleDateString()}</p>
        </motion.footer>
      </motion.div>
    </div>
  );
}
