"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPin, Bell, User } from "lucide-react";

export default function HomePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-md mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Welcome to Lcly</h1>
          <p className="text-muted-foreground">
            Your local community, all in one place
          </p>
        </div>

        {/* Main Actions */}
        <div className="grid gap-4">
          <Link href="/profile" className="w-full">
            <Button
              variant="outline"
              size="lg"
              className="w-full justify-start space-x-2"
            >
              <User className="h-5 w-5" />
              <span>Your Profile</span>
            </Button>
          </Link>

          <Link href="/notifications" className="w-full">
            <Button
              variant="outline"
              size="lg"
              className="w-full justify-start space-x-2"
            >
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </Button>
          </Link>

          <Link href="/" className="w-full">
            <Button
              variant="outline"
              size="lg"
              className="w-full justify-start space-x-2"
            >
              <MapPin className="h-5 w-5" />
              <span>Explore Area</span>
            </Button>
          </Link>
        </div>

        {/* Quick Info */}
        <div className="rounded-lg border bg-card p-6 space-y-2">
          <h2 className="font-semibold">Getting Started</h2>
          <p className="text-sm text-muted-foreground">
            Set up your profile and enable notifications to stay connected with
            your local community.
          </p>
        </div>
      </div>
    </div>
  );
}
