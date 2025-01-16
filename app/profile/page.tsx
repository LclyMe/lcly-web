"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  MapPin,
  Settings,
  Bell,
  Shield,
  Key,
  Building2,
  ArrowLeftIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const profileSections = [
  {
    title: "Security Settings",
    description: "Manage your account security and privacy preferences",
    icon: Shield,
    blurred: true,
  },
  {
    title: "Notifications",
    description: "Control how you receive updates from your community",
    icon: Bell,
    blurred: true,
  },
  {
    title: "Connected Accounts",
    description: "Manage your linked social and community accounts",
    icon: Key,
    blurred: true,
  },
  {
    title: "Local Communities",
    description: "View and manage your community memberships",
    icon: Building2,
    blurred: true,
  },
];

export default function ProfilePage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (loading) {
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
              className="rounded-full absolute top-0 left-0"
            >
              <ArrowLeftIcon className="h-4 w-4" />
            </Button>
          </Link>

          <motion.div {...fadeIn} className="text-center mt-16">
            <Avatar className="h-24 w-24 mx-auto mb-6">
              {user.user_metadata.avatar_url ? (
                <AvatarImage src={user.user_metadata.avatar_url} />
              ) : (
                <AvatarFallback>
                  {user.user_metadata.full_name?.[0] || user.email?.[0]}
                </AvatarFallback>
              )}
            </Avatar>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 transition-all duration-200">
              {user.user_metadata.full_name || "User"}
            </h1>
            <p className="text-lg text-muted-foreground hover:blur-none blur-sm transition-all duration-200">
              {user.email}
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
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24"
        >
          {profileSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-primary/10 p-2.5">
                      <section.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div
                      className={
                        section.blurred ? "transition-all duration-200" : ""
                      }
                    >
                      <CardTitle className="text-xl mb-2">
                        {section.title}
                      </CardTitle>
                      <CardDescription>{section.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
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
