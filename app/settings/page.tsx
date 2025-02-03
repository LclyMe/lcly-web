"use client";

import {
  Settings,
  Moon,
  Globe,
  Bell,
  Shield,
  User,
  LogOut,
} from "lucide-react";
import { motion } from "framer-motion";
import { PageHeaderWithIcon } from "@/components/ui/page-header-with-icon";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function SettingsPage() {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  const settingsSections = [
    {
      icon: User,
      title: "Account",
      description: "Manage your account settings",
      href: "/settings/account",
    },
    {
      icon: Globe,
      title: "Language",
      description: "Set your preferred language",
      href: "/settings/language",
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Configure how you receive notifications",
      href: "/settings/notifications",
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Control your privacy and security settings",
      href: "/settings/privacy",
    },
    {
      icon: Moon,
      title: "Appearance",
      description: "Customize the look and feel of Lcly",
      href: "/settings/appearance",
    },
    {
      icon: LogOut,
      title: "Logout",
      description: "Logout of your account",
      onClick: handleLogout,
    },
  ];

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <PageHeaderWithIcon icon={Settings} title="Settings" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid gap-3 md:grid-cols-2"
      >
        {settingsSections.map((section) => (
          <div
            key={section.title}
            onClick={section.onClick}
            className={cn(
              "cursor-pointer p-6 rounded-3xl bg-white/90 dark:bg-black/90 border border-border/50",
              "backdrop-blur-sm shadow-sm hover:bg-white/95 dark:hover:bg-black/95 transition-colors"
            )}
          >
            {section.href ? (
              <Link href={section.href}>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-foreground/5 p-3">
                    <section.icon className="h-5 w-5 text-foreground/80" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{section.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {section.description}
                    </p>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-foreground/5 p-3">
                  <section.icon className="h-5 w-5 text-foreground/80" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">{section.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {section.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
