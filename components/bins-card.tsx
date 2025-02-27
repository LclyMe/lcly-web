"use client";

import { useState, useEffect } from "react";
import {
  Trash2,
  CalendarDays,
  AlertCircle,
  Loader2,
  Search,
  ChevronDown,
  ChevronUp,
  Info,
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMediaQuery } from "@/hooks/use-media-query";
import { format, parseISO, isBefore, addDays } from "date-fns";

// Types for the API responses
interface PremiseAddress {
  PremiseID: number;
  Address1: string;
  Address2: string;
  Street: string;
  Locality: string;
  LocalAuthority: string;
  Town: string;
  Postcode: string;
}

interface BinCollection {
  PremiseID: number;
  BinType: string;
  LocalAuthority: string;
  CollectionDate: string;
}

interface BinMessage {
  RequestPostcode: string;
  LocalAuthority: string;
  MessageLink: string;
  MessageContentHTML: string;
  MessageBackgroundColour: string;
  MessageTextColour: string;
}

interface BinsCardProps {
  postcode: string;
  className?: string;
  compact?: boolean;
}

export function BinsCard({
  postcode,
  className,
  compact = false,
}: BinsCardProps) {
  const [addresses, setAddresses] = useState<PremiseAddress[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<PremiseAddress | null>(
    null
  );
  const [collections, setCollections] = useState<BinCollection[]>([]);
  const [message, setMessage] = useState<BinMessage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAddressSheet, setShowAddressSheet] = useState(false);
  const [addressFilter, setAddressFilter] = useState("");
  const [showUpcoming, setShowUpcoming] = useState(false);
  const [showMessageDialog, setShowMessageDialog] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Format postcode by removing spaces
  const formattedPostcode = postcode.replace(/\s+/g, "");

  // Load saved address from localStorage on component mount
  useEffect(() => {
    const savedAddress = localStorage.getItem(
      `bins_address_${formattedPostcode}`
    );
    if (savedAddress) {
      try {
        const parsedAddress = JSON.parse(savedAddress);
        setSelectedAddress(parsedAddress);
        fetchCollections(parsedAddress.PremiseID, parsedAddress.LocalAuthority);
      } catch (e) {
        console.error("Failed to parse saved address", e);
      }
    } else {
      // If no saved address, fetch addresses for this postcode
      fetchAddresses();
    }

    // Always fetch messages
    fetchMessages();
  }, [formattedPostcode]);

  const fetchAddresses = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://bins.azurewebsites.net/api/getaddress?postcode=${encodeURIComponent(
          formattedPostcode
        )}`,
        {
          headers: {
            accept: "*/*",
            origin: window.location.origin,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch addresses: ${response.status}`);
      }

      const data = await response.json();
      setAddresses(data);

      // If there's only one address, select it automatically
      if (data.length === 1) {
        setSelectedAddress(data[0]);
        fetchCollections(data[0].PremiseID, data[0].LocalAuthority);
        saveAddressToLocalStorage(data[0]);
      } else if (data.length > 1) {
        setShowAddressSheet(true);
      }
    } catch (err) {
      console.error("Error fetching addresses:", err);
      setError("Failed to load addresses. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCollections = async (
    premiseId: number,
    localAuthority: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://bins.azurewebsites.net/api/getcollections?premisesid=${premiseId}&localauthority=${encodeURIComponent(
          localAuthority
        )}`,
        {
          headers: {
            accept: "*/*",
            origin: window.location.origin,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch collections: ${response.status}`);
      }

      const data = await response.json();
      setCollections(data);
    } catch (err) {
      console.error("Error fetching collections:", err);
      setError("Failed to load bin collection data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `https://bins.azurewebsites.net/api/checkformessages?postcode=${encodeURIComponent(
          formattedPostcode
        )}`,
        {
          headers: {
            accept: "*/*",
            origin: window.location.origin,
          },
        }
      );

      if (!response.ok) {
        return; // Silently fail for messages
      }

      const data = await response.json();
      if (data && data.MessageContentHTML) {
        setMessage(data);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
      // Don't set error state for messages
    }
  };

  const saveAddressToLocalStorage = (address: PremiseAddress) => {
    try {
      localStorage.setItem(
        `bins_address_${formattedPostcode}`,
        JSON.stringify(address)
      );
    } catch (e) {
      console.error("Failed to save address to localStorage", e);
    }
  };

  const handleAddressSelect = (address: PremiseAddress) => {
    setSelectedAddress(address);
    setShowAddressSheet(false);
    fetchCollections(address.PremiseID, address.LocalAuthority);
    saveAddressToLocalStorage(address);
  };

  const formatAddress = (address: PremiseAddress) => {
    const parts = [
      address.Address1,
      address.Address2 !== "\u0000" ? address.Address2 : null,
      address.Street,
      address.Locality,
      address.Town,
      address.Postcode,
    ].filter(Boolean);

    return parts.join(", ");
  };

  const getBinColor = (binType: string) => {
    switch (binType.toUpperCase()) {
      case "GREEN":
        return "bg-green-600";
      case "BLACK":
        return "bg-gray-800";
      case "BROWN":
        return "bg-amber-800";
      case "BLUE":
        return "bg-blue-600";
      case "GREY":
        return "bg-gray-500";
      case "PINK":
        return "bg-pink-500";
      case "PURPLE":
        return "bg-purple-600";
      case "RED":
        return "bg-red-600";
      case "ORANGE":
        return "bg-orange-500";
      case "YELLOW":
        return "bg-yellow-500";
      // Add any additional bin types here
      default:
        // If the bin type is not recognized, try to match it to a color
        if (binType.toUpperCase().includes("GREEN")) return "bg-green-600";
        if (binType.toUpperCase().includes("BLACK")) return "bg-gray-800";
        if (binType.toUpperCase().includes("BROWN")) return "bg-amber-800";
        if (binType.toUpperCase().includes("BLUE")) return "bg-blue-600";
        if (binType.toUpperCase().includes("GREY")) return "bg-gray-500";
        if (binType.toUpperCase().includes("GRAY")) return "bg-gray-500";
        if (binType.toUpperCase().includes("PINK")) return "bg-pink-500";
        if (binType.toUpperCase().includes("PURPLE")) return "bg-purple-600";
        if (binType.toUpperCase().includes("RED")) return "bg-red-600";
        if (binType.toUpperCase().includes("ORANGE")) return "bg-orange-500";
        if (binType.toUpperCase().includes("YELLOW")) return "bg-yellow-500";
        // Default fallback
        return "bg-primary";
    }
  };

  const getNextCollection = () => {
    if (!collections.length) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Sort collections by date
    const sortedCollections = [...collections].sort(
      (a, b) =>
        new Date(a.CollectionDate).getTime() -
        new Date(b.CollectionDate).getTime()
    );

    // Find the next collection (today or future)
    return (
      sortedCollections.find((collection) => {
        const collectionDate = parseISO(collection.CollectionDate);
        return (
          !isBefore(collectionDate, today) ||
          collectionDate.getTime() === today.getTime()
        );
      }) || sortedCollections[0]
    ); // Fallback to first if none found
  };

  const getUpcomingCollections = () => {
    if (!collections.length) return [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get collections for the next 6 weeks
    const sixWeeksLater = addDays(today, 42);

    return collections
      .filter((collection) => {
        const collectionDate = parseISO(collection.CollectionDate);
        return (
          !isBefore(collectionDate, today) &&
          isBefore(collectionDate, sixWeeksLater)
        );
      })
      .sort(
        (a, b) =>
          new Date(a.CollectionDate).getTime() -
          new Date(b.CollectionDate).getTime()
      );
  };

  const groupCollectionsByDate = (collections: BinCollection[]) => {
    const grouped: Record<string, BinCollection[]> = {};

    collections.forEach((collection) => {
      if (!grouped[collection.CollectionDate]) {
        grouped[collection.CollectionDate] = [];
      }
      grouped[collection.CollectionDate].push(collection);
    });

    return Object.entries(grouped).map(([date, collections]) => ({
      date,
      collections,
    }));
  };

  const renderAddressSelector = () => {
    const filteredAddresses = addresses.filter((address) =>
      formatAddress(address).toLowerCase().includes(addressFilter.toLowerCase())
    );

    const content = (
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

    if (isDesktop) {
      return (
        <Dialog
          open={showAddressSheet}
          onOpenChange={(open) => {
            if (!open) setAddressFilter("");
            setShowAddressSheet(open);
          }}
        >
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Trash2 className="h-5 w-5" />
                <span>Select Your Address</span>
              </DialogTitle>
            </DialogHeader>
            {content}
          </DialogContent>
        </Dialog>
      );
    }

    return (
      <Drawer
        open={showAddressSheet}
        onOpenChange={(open) => {
          if (!open) setAddressFilter("");
          setShowAddressSheet(open);
        }}
      >
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader className="text-left">
            <DrawerTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5" />
              <span>Select Your Address</span>
            </DrawerTitle>
          </DrawerHeader>
          {content}
        </DrawerContent>
      </Drawer>
    );
  };

  const handleShowAddressSheet = () => {
    setAddressFilter("");
    setShowAddressSheet(true);
  };

  // Message dialog
  const renderMessageDialog = () => {
    if (!message) return null;

    if (isDesktop) {
      return (
        <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                <span>Collection Information</span>
              </DialogTitle>
            </DialogHeader>
            <div
              className="p-4 rounded-lg text-sm"
              style={{
                backgroundColor: message.MessageBackgroundColour || "#f3f4f6",
                color: message.MessageTextColour || "#000000",
              }}
            >
              <div
                dangerouslySetInnerHTML={{ __html: message.MessageContentHTML }}
              />
              {message.MessageLink && (
                <a
                  href={message.MessageLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs underline mt-3 block opacity-80 hover:opacity-100"
                >
                  More information
                </a>
              )}
            </div>
          </DialogContent>
        </Dialog>
      );
    }

    return (
      <Drawer open={showMessageDialog} onOpenChange={setShowMessageDialog}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader className="text-left">
            <DrawerTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              <span>Collection Information</span>
            </DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-6">
            <div
              className="p-4 rounded-lg text-sm"
              style={{
                backgroundColor: message.MessageBackgroundColour || "#f3f4f6",
                color: message.MessageTextColour || "#000000",
              }}
            >
              <div
                dangerouslySetInnerHTML={{ __html: message.MessageContentHTML }}
              />
              {message.MessageLink && (
                <a
                  href={message.MessageLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs underline mt-3 block opacity-80 hover:opacity-100"
                >
                  More information
                </a>
              )}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  };

  // Loading state
  if (loading && !selectedAddress) {
    return (
      <div
        className={cn(
          "p-6 rounded-3xl bg-white/90 dark:bg-black/90 border border-border/50 backdrop-blur-sm shadow-sm",
          className
        )}
      >
        <div className="flex flex-col items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">
            Loading bin collection information...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !selectedAddress) {
    return (
      <div
        className={cn(
          "p-6 rounded-3xl bg-white/90 dark:bg-black/90 border border-border/50 backdrop-blur-sm shadow-sm",
          className
        )}
      >
        <div className="flex flex-col items-center justify-center py-8">
          <AlertCircle className="h-8 w-8 text-destructive mb-4" />
          <p className="text-muted-foreground text-center">{error}</p>
          <button
            className="mt-4 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            onClick={fetchAddresses}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No address selected yet
  if (!selectedAddress) {
    return (
      <div
        className={cn(
          "p-6 rounded-3xl bg-white/90 dark:bg-black/90 border border-border/50 backdrop-blur-sm shadow-sm",
          className
        )}
      >
        <div className="flex flex-col items-center justify-center py-8">
          <Trash2 className="h-8 w-8 text-primary mb-4" />
          <p className="text-muted-foreground">
            Select your address to see bin collection information
          </p>
          <button
            className="mt-4 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            onClick={handleShowAddressSheet}
          >
            Select Address
          </button>
        </div>
        {renderAddressSelector()}
      </div>
    );
  }

  const nextCollection = getNextCollection();
  const upcomingCollections = getUpcomingCollections();
  const groupedCollections = groupCollectionsByDate(upcomingCollections);

  // No collections found
  if (collections.length === 0 && !loading) {
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
            <p className="text-sm text-muted-foreground mt-1">
              {formatAddress(selectedAddress)}
            </p>
          </div>
          <button
            className="text-xs text-primary hover:underline"
            onClick={handleShowAddressSheet}
          >
            Change
          </button>
        </div>

        <div className="flex flex-col items-center justify-center py-6">
          <AlertCircle className="h-6 w-6 text-amber-500 mb-3" />
          <p className="text-sm text-muted-foreground text-center">
            No bin collection data available
          </p>
          <button
            className="mt-3 px-3 py-1.5 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            onClick={() =>
              fetchCollections(
                selectedAddress.PremiseID,
                selectedAddress.LocalAuthority
              )
            }
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Compact view
  if (compact && nextCollection) {
    return (
      <>
        <div
          className={cn(
            "p-4 rounded-3xl bg-white/90 dark:bg-black/90 border border-border/50 backdrop-blur-sm shadow-sm",
            className
          )}
        >
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Trash2 className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium">Bin Collections</h3>
              {message && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => setShowMessageDialog(true)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Info className="h-4 w-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">View collection information</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <button
              className="text-xs text-primary hover:underline"
              onClick={handleShowAddressSheet}
            >
              Change
            </button>
          </div>

          {/* Next collection */}
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
                <p className="font-medium text-sm">
                  {nextCollection.BinType.charAt(0).toUpperCase() +
                    nextCollection.BinType.slice(1).toLowerCase()}{" "}
                  Bin
                </p>
                <p className="text-xs text-muted-foreground">
                  {format(
                    parseISO(nextCollection.CollectionDate),
                    "EEEE, do MMMM"
                  )}
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
                    <p className="text-xs font-medium">
                      {format(parseISO(date), "EEE, d MMM")}
                    </p>
                    <div className="flex gap-1.5">
                      {collections.map((collection) => (
                        <div
                          key={`${collection.BinType}-${collection.CollectionDate}`}
                          className={cn(
                            "px-2 py-0.5 rounded text-xs text-white flex items-center gap-1",
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

        {renderAddressSelector()}
        {renderMessageDialog()}
      </>
    );
  }

  // Full view (original)
  return (
    <>
      <div
        className={cn(
          "p-6 rounded-3xl bg-white/90 dark:bg-black/90 border border-border/50 backdrop-blur-sm shadow-sm",
          className
        )}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Trash2 className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium">Bin Collections</h3>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {formatAddress(selectedAddress)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {message && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setShowMessageDialog(true)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Info className="h-4 w-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">View collection information</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <button
              className="text-xs text-primary hover:underline"
              onClick={handleShowAddressSheet}
            >
              Change
            </button>
          </div>
        </div>

        {/* Next collection */}
        {nextCollection && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Next Collection
            </h3>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-white/80 dark:bg-white/10">
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center text-white",
                  getBinColor(nextCollection.BinType)
                )}
              >
                <Trash2 className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium">
                  {nextCollection.BinType.charAt(0).toUpperCase() +
                    nextCollection.BinType.slice(1).toLowerCase()}{" "}
                  Bin
                </p>
                <p className="text-sm text-muted-foreground">
                  {format(
                    parseISO(nextCollection.CollectionDate),
                    "EEEE, do MMMM"
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Upcoming collections */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Upcoming Collections
            </h3>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="space-y-3">
            {groupedCollections.map(({ date, collections }) => (
              <div
                key={date}
                className="p-3 rounded-lg bg-white/80 dark:bg-white/10"
              >
                <p className="text-sm font-medium mb-2">
                  {format(parseISO(date), "EEEE, do MMMM")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {collections.map((collection) => (
                    <div
                      key={`${collection.BinType}-${collection.CollectionDate}`}
                      className={cn(
                        "px-2 py-1 rounded text-xs text-white flex items-center gap-1",
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

            {groupedCollections.length === 0 && (
              <div className="p-4 rounded-lg bg-white/80 dark:bg-white/10 text-center">
                <p className="text-muted-foreground">
                  No upcoming collections found
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {renderAddressSelector()}
      {renderMessageDialog()}
    </>
  );
}
