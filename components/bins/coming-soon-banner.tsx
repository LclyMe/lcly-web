import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComingSoonBannerProps {
  className?: string;
}

export function ComingSoonBanner({ className }: ComingSoonBannerProps) {
  return (
    <div
      className={cn(
        "p-6 rounded-3xl bg-white/90 dark:bg-black/90 border border-border/50 backdrop-blur-sm shadow-sm",
        className
      )}
    >
      <div className="flex items-center gap-5">
        <Trash2 className="h-8 w-8 text-primary flex-shrink-0" />
        <div>
          <p className="text-base font-medium">Bin Collections Coming Soon</p>
          <p className="text-sm text-muted-foreground">
            We're working on adding bin collection data for your local council.
          </p>
        </div>
      </div>
    </div>
  );
}
