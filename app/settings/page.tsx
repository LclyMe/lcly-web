"use client";

import {
  Settings,
  Moon,
  Globe,
  Bell,
  Shield,
  User,
  ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
      <div className="relative">
        <Link href="/profile">
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-0 top-0 rounded-full"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>

        <motion.div {...fadeIn} className="mb-8 flex flex-col items-center">
          <div className="rounded-full bg-foreground/10 p-4">
            <Settings className="h-8 w-8 text-foreground" />
          </div>
          <h1 className="mt-4 text-2xl font-bold">Settings</h1>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid gap-4 md:grid-cols-2"
      >
        {settingsSections.map((section, index) => (
          <div className="cursor-pointer rounded-lg border p-4 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-gray-100 p-2">
                <section.icon className="h-5 w-5 text-gray-600" />
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
