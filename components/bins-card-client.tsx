"use client";

import { useState, useEffect, useCallback } from "react";
import { format, parseISO } from "date-fns";
import {
  Trash2,
  ChevronDown,
  ChevronUp,
  Info,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
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
import { Button } from "@/components/ui/button";
import { AddressSelector } from "@/components/bins/address-selector";
import { AddAddressPrompt } from "@/components/bins/add-address-prompt";
import type {
  PremiseAddress,
  BinMessage,
  BinCollection,
} from "@/lib/bins/types";
import { getBinColor } from "@/lib/bins/utils";

// Define a type for recycling centers
interface RecyclingCenter {
  id: number;
  site_name: string;
  address: string;
  post_code: string;
  location_type: string;
  site_type: string;
  latitude: number;
  longitude: number;
  distance_meters: number;
  accepts_mixed_glass: boolean;
  accepts_paper: boolean;
  accepts_textiles: boolean;
  accepts_small_electrical: boolean;
}

interface MessageButtonProps {
  message: BinMessage;
  latitude?: number;
  longitude?: number;
}

// Address Selector Component
export function BinsAddressSelector({
  addresses,
  postcode,
  userId,
}: {
  addresses: PremiseAddress[];
  postcode: string;
  userId?: string;
}) {
  return (
    <AddressSelector
      addresses={addresses}
      postcode={postcode}
      userId={userId}
      trigger={<AddAddressPrompt onAddAddress={() => {}} />}
    />
  );
}

// Message Button Component
export function MessageButton({
  message,
  latitude,
  longitude,
}: MessageButtonProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [recyclingCenters, setRecyclingCenters] = useState<RecyclingCenter[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecyclingCenters = useCallback(async () => {
    if (!latitude || !longitude) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/nearest-recycling-centers?lat=${latitude}&lng=${longitude}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setRecyclingCenters(data);
    } catch (error) {
      console.error("Error fetching recycling centers:", error);
      setError("Unable to load recycling centers. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    // Fetch nearest recycling centers when modal is opened and coordinates are available
    if (open && latitude && longitude) {
      fetchRecyclingCenters();
    }
  }, [open, latitude, longitude, fetchRecyclingCenters]);

  const renderMessageContent = () => (
    <div
      className="p-4 rounded-lg text-sm"
      style={{
        backgroundColor: message.MessageBackgroundColour || "#f3f4f6",
        color: message.MessageTextColour || "#000000",
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: message.MessageContentHTML }} />
      {message.MessageLink && (
        <a
          href={message.MessageLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs underline mt-1 block opacity-80 hover:opacity-100"
        >
          More information
        </a>
      )}
    </div>
  );

  const renderRecyclingCenters = () => (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Nearest Recycling Centers
        </h3>
        {!isLoading && error && (
          <Button
            variant="ghost"
            size="sm"
            onClick={fetchRecyclingCenters}
            className="text-xs h-7 px-2"
          >
            Retry
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-4">
          <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : error ? (
        <p className="text-sm text-muted-foreground">{error}</p>
      ) : recyclingCenters.length > 0 ? (
        <div className="space-y-3">
          {recyclingCenters.map((center) => (
            <div
              key={center.id}
              className="border border-border/50 rounded-lg p-3"
            >
              <div className="flex justify-between">
                <h4 className="font-medium text-sm">{center.site_name}</h4>
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {(center.distance_meters / 1609.34).toFixed(1)} miles
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {center.address}
              </p>
              <p className="text-xs text-muted-foreground">
                {center.post_code}
              </p>

              <div className="mt-2 flex flex-wrap gap-1">
                {center.accepts_mixed_glass && (
                  <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded-full">
                    Glass
                  </span>
                )}
                {center.accepts_paper && (
                  <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-0.5 rounded-full">
                    Paper
                  </span>
                )}
                {center.accepts_textiles && (
                  <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-0.5 rounded-full">
                    Textiles
                  </span>
                )}
                {center.accepts_small_electrical && (
                  <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full">
                    Electronics
                  </span>
                )}
              </div>

              {center.latitude && center.longitude && (
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${center.latitude},${center.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-xs flex items-center gap-1 text-primary hover:underline"
                >
                  <ExternalLink className="h-3 w-3" />
                  Directions
                </a>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          No recycling centers found nearby.
        </p>
      )}
    </div>
  );

  if (isDesktop) {
    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(true)}
          className="h-8 w-8"
        >
          <Info className="h-4 w-4 text-muted-foreground" />
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                <span>Collection Information</span>
              </DialogTitle>
            </DialogHeader>
            {renderMessageContent()}
            {latitude && longitude && renderRecyclingCenters()}
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        className="h-8 w-8"
      >
        <Info className="h-4 w-4 text-muted-foreground" />
      </Button>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader className="text-left">
            <DrawerTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              <span>Collection Information</span>
            </DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-6">
            {renderMessageContent()}
            {latitude && longitude && renderRecyclingCenters()}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

// Expandable Collections Component
export function ExpandableCollections({
  nextCollection,
  groupedCollections,
}: {
  nextCollection: BinCollection;
  groupedCollections: {
    date: string;
    collections: BinCollection[];
  }[];
}) {
  const [showUpcoming, setShowUpcoming] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center text-white"
            )}
            style={{
              backgroundColor: getBinColor(nextCollection.BinType),
            }}
          >
            <Trash2 className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium text-md capitalize">
              {nextCollection.BinType.toLocaleLowerCase()}
            </p>
            <p className="text-sm text-muted-foreground">
              {format(parseISO(nextCollection.CollectionDate), "EEEE, do MMMM")}
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowUpcoming(!showUpcoming)}
          className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          aria-label={
            showUpcoming
              ? "Hide upcoming collections"
              : "Show upcoming collections"
          }
        >
          <span className="text-xs">{showUpcoming ? "Hide" : "Show"}</span>
          {showUpcoming ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Upcoming collections (expandable) */}
      {showUpcoming && (
        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="space-y-3">
            {groupedCollections.slice(0, 5).map(({ date, collections }) => (
              <div key={date} className="flex justify-between items-center">
                <p className="text-sm font-medium">
                  {format(parseISO(date), "EEE, d MMM")}
                </p>
                <div className="flex gap-1.5">
                  {collections.map((collection) => (
                    <div
                      key={`${collection.BinType}-${collection.CollectionDate}`}
                      className={cn(
                        "px-3 py-0.5 rounded-full text-sm text-white flex items-center gap-1"
                      )}
                      style={{
                        backgroundColor: getBinColor(collection.BinType),
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                      <span className="capitalize">
                        {collection.BinType.split(" ")[0]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
