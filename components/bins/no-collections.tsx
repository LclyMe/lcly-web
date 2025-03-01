import { AlertCircle, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatAddress } from "@/lib/bins/utils";
import type { PremiseAddress } from "@/lib/bins/types";

interface NoCollectionsProps {
  className?: string;
  selectedAddress?: PremiseAddress;
}

export function NoCollections({
  className,
  selectedAddress,
}: NoCollectionsProps) {
  return (
    <div
      className={cn(
        "p-4 rounded-3xl bg-white/90 dark:bg-black/90 border border-border/50 backdrop-blur-sm shadow-sm",
        className
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Trash2 className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">Bin Collections</h3>
          </div>
          {selectedAddress && (
            <p className="text-sm text-muted-foreground mt-1">
              {formatAddress(selectedAddress)}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-6">
        <AlertCircle className="h-6 w-6 text-amber-500 mb-3" />
        <p className="text-sm text-muted-foreground text-center">
          No bin collection data available
        </p>
      </div>
    </div>
  );
}
