"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MPCard } from "@/components/mp-card";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "./ui/drawer";
import { Building, Navigation, Globe, Award } from "lucide-react";
import { MPRecord } from "@/lib/server/mp";

interface LocationInfoSheetProps {
  title: string;
  description: string;
  value: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mpData?: MPRecord | null;
  isConstituency?: boolean;
}

// Function to get the appropriate icon based on the title
const getIconForTitle = (title: string) => {
  switch (title) {
    case "Electoral Ward":
      return <Building className="h-5 w-5" />;
    case "Administrative District":
      return <Navigation className="h-5 w-5" />;
    case "Parliamentary Constituency":
      return <Award className="h-5 w-5" />;
    case "Region":
      return <Globe className="h-5 w-5" />;
    default:
      return null;
  }
};

export function LocationInfoSheet({
  title,
  description,
  value,
  open,
  onOpenChange,
  mpData,
  isConstituency = false,
}: LocationInfoSheetProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const icon = getIconForTitle(title);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {icon}
              <span>{title}</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">{description}</p>

            {isConstituency && mpData ? (
              <p className="text-base font-medium">MP for {value}</p>
            ) : (
              <p className="text-sm">
                <span className="font-medium">Your {title.toLowerCase()}:</span>{" "}
                {value}
              </p>
            )}

            {isConstituency && mpData && (
              <div className="mt-6">
                <MPCard mp={mpData} showTitle={false} />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="flex items-center gap-2">
            {icon}
            <span>{title}</span>
          </DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-8 space-y-4">
          <p className="text-muted-foreground text-sm">{description}</p>

          {isConstituency && mpData ? (
            <p className="text-base font-medium">MP for {value}</p>
          ) : (
            <p className="text-sm">
              <span className="font-medium">Your {title.toLowerCase()}:</span>{" "}
              {value}
            </p>
          )}

          {isConstituency && mpData && (
            <div className="mt-6">
              <MPCard mp={mpData} showTitle={false} />
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
