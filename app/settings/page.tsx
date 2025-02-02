"use client";

import { Settings, Moon, Globe, Bell, Shield, User } from "lucide-react";
import { motion } from "framer-motion";
import { PageHeaderWithIcon } from "@/components/ui/page-header-with-icon";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function SettingsPage() {
  const settingsSections = [
    {
      icon: User,
      title: "Account",
      description: "Manage your account settings and preferences",
    },
    {
      icon: Globe,
      title: "Language & Region",
      description: "Set your preferred language and regional settings",
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Configure how you receive notifications",
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Control your privacy and security settings",
    },
    {
      icon: Moon,
      title: "Appearance",
      description: "Customize the look and feel of the application",
    },
  ];

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <PageHeaderWithIcon icon={Settings} title="Settings" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid gap-4 md:grid-cols-2"
      >
        {settingsSections.map((section) => (
          <div
            key={section.title}
            className="cursor-pointer rounded-lg border p-4 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-foreground/10 p-2">
                <section.icon className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">{section.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {section.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
