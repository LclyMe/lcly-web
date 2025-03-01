import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddAddressPromptProps {
  onAddAddress: () => void;
}

export function AddAddressPrompt({ onAddAddress }: AddAddressPromptProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-6 px-1">
      <div className="flex md:items-center gap-3 flex-1 min-w-0">
        <Trash2 className="h-7 w-7 text-primary flex-shrink-0 mt-1 md:mt-0" />
        <div className="min-w-0">
          <h3 className="text-md font-semibold truncate">
            View Your Bin Schedule
          </h3>
          <p className="text-sm text-muted-foreground">
            Add your address to see your upcoming bin collections
          </p>
        </div>
      </div>
      <Button
        onClick={onAddAddress}
        size="sm"
        className="flex-shrink-0 text-sm md:text-xs"
      >
        Add Address
      </Button>
    </div>
  );
}
