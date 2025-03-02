"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { formatAddress } from "@/lib/bins/utils";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Search, Loader2, Trash2 } from "lucide-react";
import type { PremiseAddress } from "@/lib/bins/types";

// Define a type for the cleaned address to avoid using 'any'
type CleanedPremiseAddress = {
  PremiseID: number;
  Address1: string;
  Address2: string;
  Street: string;
  Locality: string;
  LocalAuthority: string;
  Town: string;
  Postcode: string;
  Latitude?: number;
  Longitude?: number;
  [key: string]: string | number | undefined;
};

interface AddressSelectorProps {
  addresses: PremiseAddress[];
  postcode: string;
  userId?: string;
  trigger: React.ReactNode;
}

export function AddressSelector({
  addresses,
  postcode,
  userId,
  trigger,
}: AddressSelectorProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addressFilter, setAddressFilter] = useState("");
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const router = useRouter();

  const handleAddressSelect = async (address: PremiseAddress) => {
    setLoading(true);

    try {
      // Save user preference if logged in
      if (userId) {
        const supabase = createClient();
        const cleanedAddress = Object.fromEntries(
          Object.entries(address).filter(([_, value]) => value !== "\u0000")
        ) as CleanedPremiseAddress;

        await supabase
          .from("user_bin_preferences")
          .upsert({
            user_id: userId,
            postcode: postcode.replace(/\s+/g, ""),
            premise_id: cleanedAddress.PremiseID,
            local_authority: cleanedAddress.LocalAuthority,
            address_json: cleanedAddress,
            updated_at: new Date().toISOString(),
          })
          .select();
      }

      // Close the modal
      setOpen(false);
      setAddressFilter("");

      // Refresh the page to show the new selection
      router.refresh();
    } catch (error) {
      console.error("Error selecting address:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAddresses = addresses.filter((address) => {
    const formattedAddress = formatAddress(address).toLowerCase();
    return formattedAddress.includes(addressFilter.toLowerCase());
  });

  const renderContent = () => (
    <div className="space-y-4 px-4 pb-6">
      <p className="text-sm text-muted-foreground">
        {addresses.length === 1
          ? "1 address found for this postcode:"
          : `${addresses.length} addresses found for this postcode:`}
      </p>

      {addresses.length > 5 && (
        <div className="relative">
          <input
            type="text"
            placeholder="Filter addresses..."
            value={addressFilter}
            onChange={(e) => setAddressFilter(e.target.value)}
            className="w-full p-2 pl-9 rounded-lg border border-border bg-background text-sm"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          {addressFilter && (
            <button
              onClick={() => setAddressFilter("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground"
              aria-label="Clear filter"
            >
              ×
            </button>
          )}
        </div>
      )}

      <div className="max-h-[300px] overflow-y-auto pr-2 space-y-2">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">
              Loading addresses...
            </p>
          </div>
        ) : filteredAddresses.length > 0 ? (
          filteredAddresses.map((address) => (
            <button
              key={address.PremiseID}
              className="w-full text-left p-3 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
              onClick={() => handleAddressSelect(address)}
              disabled={loading}
            >
              <p className="font-medium">{formatAddress(address)}</p>
            </button>
          ))
        ) : (
          <p className="text-center py-4 text-muted-foreground">
            No addresses match your filter
          </p>
        )}
      </div>

      {filteredAddresses.length > 10 && (
        <p className="text-xs text-muted-foreground text-center italic">
          Scroll to see more addresses
        </p>
      )}
    </div>
  );

  return (
    <>
      <div onClick={() => setOpen(true)}>{trigger}</div>

      {isDesktop ? (
        <Dialog
          open={open}
          onOpenChange={(open) => {
            if (!open) setAddressFilter("");
            setOpen(open);
          }}
        >
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Trash2 className="h-5 w-5" />
                <span>Select Your Address</span>
              </DialogTitle>
            </DialogHeader>
            {renderContent()}
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer
          open={open}
          onOpenChange={(open) => {
            if (!open) setAddressFilter("");
            setOpen(open);
          }}
        >
          <DrawerContent className="max-h-[85vh]">
            <DrawerHeader className="text-left">
              <DrawerTitle className="flex items-center gap-2">
                <Trash2 className="h-5 w-5" />
                <span>Select Your Address</span>
              </DrawerTitle>
            </DrawerHeader>
            {renderContent()}
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}
