"use client";

import { Button } from "@/components/ui/button";
import { PenLine, Users, Home } from "lucide-react";
import type { DataType } from "@/hooks/use-map-data";
import { cn } from "@/lib/utils";

interface DataControlsProps {
  enabledTypes: DataType[];
  onToggle: (type: DataType) => void;
}

const dataTypeConfig = {
  thoughts: {
    icon: PenLine,
    label: "Thoughts",
  },
  people: {
    icon: Users,
    label: "People",
  },
  homes: {
    icon: Home,
    label: "Homes",
  },
} as const;

export function DataControls({ enabledTypes, onToggle }: DataControlsProps) {
  return (
    <div className="absolute top-4 right-4 flex flex-col gap-2 bg-background/80 backdrop-blur-sm p-2 rounded-lg shadow-lg">
      {(Object.keys(dataTypeConfig) as DataType[]).map((type) => {
        const { icon: Icon, label } = dataTypeConfig[type];
        const isEnabled = enabledTypes.includes(type);

        return (
          <Button
            key={type}
            size="icon"
            variant={isEnabled ? "default" : "ghost"}
            className={cn(
              "relative group",
              isEnabled && "hover:bg-primary/90",
              !isEnabled && "hover:bg-accent"
            )}
            onClick={() => onToggle(type)}
          >
            <Icon className="h-4 w-4" />
            <span className="sr-only">{label}</span>
            <div className="absolute right-full mr-2 px-2 py-1 rounded bg-background/80 backdrop-blur-sm text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {label}
            </div>
          </Button>
        );
      })}
    </div>
  );
}
