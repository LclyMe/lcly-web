"use client";

import { Bell, CheckCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotificationsPage() {
  const { user } = useAuth();

  const [notifications] = useState([
    {
      id: 1,
      title: "Welcome to Lcly!",
      message: "Thanks for joining! Take a tour of our features.",
      date: "Just now",
      read: true,
    },
  ]);

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

        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-8 flex flex-col items-center"
        >
          <div className="rounded-full bg-foreground/10 p-4">
            <Bell className="h-8 w-8 text-foreground" />
          </div>
          <h1 className="mt-4 text-2xl font-bold">Notifications</h1>
        </motion.div>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={`rounded-lg border p-4 shadow-sm ${
              notification.read ? "bg-white" : "bg-blue-50"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{notification.title}</h3>
                <p className="mt-1 text-gray-600">{notification.message}</p>
                <span className="mt-2 text-sm text-gray-500">
                  {notification.date}
                </span>
              </div>
              {notification.read && (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
