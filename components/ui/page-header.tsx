"use client";

import { cn } from "@/lib/utils";
import { Bell } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";
import { ReactNode } from "react";

interface PageHeaderProps {
  title: ReactNode;
  showNotifications?: boolean;
  className?: string;
}

export function PageHeader({
  title,
  showNotifications = false,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-between py-4 px-4 mb-6",
        className
      )}
    >
      <div className="flex-1" /> {/* Spacer */}
      <div className="flex items-center gap-2 text-lg">{title}</div>
      <div className="flex-1 flex justify-end">
        {" "}
        {/* Right aligned content */}
        {showNotifications && (
          <Link href="/notifications">
            <Button variant="secondary" size="icon" className="h-9 w-9">
              <Bell className="h-5 w-5" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
