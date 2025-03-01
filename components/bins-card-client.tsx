"use client";

import { useState } from "react";
import { format, parseISO } from "date-fns";
import { Trash2, ChevronDown, ChevronUp, Info } from "lucide-react";
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

interface MessageButtonProps {
  message: BinMessage;
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
export function MessageButton({ message }: MessageButtonProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

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
          <div className="px-4 pb-6">{renderMessageContent()}</div>
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
              "w-10 h-10 rounded-full flex items-center justify-center text-white",
              getBinColor(nextCollection.BinType)
            )}
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
                        "px-2 py-0.5 rounded text-sm text-white flex items-center gap-1",
                        getBinColor(collection.BinType)
                      )}
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
