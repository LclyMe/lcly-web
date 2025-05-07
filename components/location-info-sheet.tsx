"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MPCard } from "@/components/mp-card";
import { CouncillorCard } from "@/components/councillor-card";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "./ui/drawer";
import { Building, Navigation, Globe, Award } from "lucide-react";
import { MPRecord } from "@/lib/server/mp";
import { Database } from "@/types/database.types";

type Councillor = Database["public"]["Views"]["current_councillors"]["Row"];

interface LocationInfoSheetProps {
  title: string;
  description: string;
  value: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mpData?: MPRecord | null;
  councillors?: Councillor[] | null;
  isConstituency?: boolean;
  isWard?: boolean;
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
  councillors,
  isConstituency = false,
  isWard = false,
}: LocationInfoSheetProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const icon = getIconForTitle(title);

  const content = (
    <div className="space-y-4">
      <p className="text-muted-foreground text-sm">{description}</p>

      {isConstituency && mpData ? (
        <p className="text-base font-medium">
          MP for <span className="font-bold">{value}</span>
        </p>
      ) : (
        <p className="text-sm">
          <span className="font-medium">Your {title.toLowerCase()}:</span>{" "}
          <span className="font-bold">{value}</span>
        </p>
      )}

      {isConstituency && mpData && (
        <div className="mt-6">
          <MPCard mp={mpData} showTitle={false} />
        </div>
      )}

      {isWard && councillors && councillors.length > 0 && (
        <div className="mt-6 space-y-4">
          <h3 className="text-base font-medium">Your Local Councillors</h3>
          {councillors.map((councillor) => (
            <CouncillorCard
              key={councillor.councillor_name}
              councillor={councillor}
              hideWard
            />
          ))}
          <span className="block text-xs text-muted-foreground mt-1">
            * This data may be out of date as we update to account for boundary
            changes in some Councils.
          </span>
        </div>
      )}
    </div>
  );

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
          {content}
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
        <div className="px-4 pb-8">{content}</div>
      </DrawerContent>
    </Drawer>
  );
}
