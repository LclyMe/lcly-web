import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import { fetchCollections } from "@/app/actions/bins";
import * as BinsCardClient from "./bins-card-client";
import { formatAddress, formatHouseName } from "@/lib/bins/utils";
import {
  fetchUserPreference,
  fetchAddresses,
  fetchMessages,
} from "@/lib/bins/api";
import {
  getNextCollection,
  getUpcomingCollections,
  groupCollectionsByDate,
} from "@/lib/bins/utils";
import type {
  BinsCardProps,
  PremiseAddress,
  BinCollection,
  BinMessage,
} from "@/lib/bins/types";
import { ComingSoonBanner } from "./bins/coming-soon-banner";
import { NoCollections } from "./bins/no-collections";
import { BinsAddressSelector } from "@/components/bins-card-client";

export async function BinsCard({
  postcode,
  className,
  showComingSoonBanner = false,
}: BinsCardProps) {
  // Format postcode by removing spaces
  const formattedPostcode = postcode.replace(/\s+/g, "");

  // Create Supabase client
  const supabase = await createClient();

  // Get user session
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user?.id;

  // Variables to store our data
  let selectedAddress: PremiseAddress | null = null;
  let collections: BinCollection[] = [];
  let message: BinMessage | null = null;
  let addresses: PremiseAddress[] = [];

  // If user is logged in, try to get their saved preference
  if (userId) {
    const preference = await fetchUserPreference(userId, formattedPostcode);
    if (preference) {
      selectedAddress = preference.address_json as unknown as PremiseAddress;
      collections = await fetchCollections(
        preference.premise_id,
        preference.local_authority
      );
    }
  }

  // If no saved preference, fetch addresses for this postcode
  if (!selectedAddress) {
    addresses = await fetchAddresses(formattedPostcode);

    // If there's only one address, select it automatically
    if (addresses.length === 1) {
      selectedAddress = addresses[0];
      collections = await fetchCollections(
        selectedAddress.PremiseID,
        selectedAddress.LocalAuthority
      );
    }
  }

  // Fetch messages
  message = await fetchMessages(formattedPostcode);

  // If no addresses found and coming soon banner is disabled, return null
  if (addresses.length === 0 && !selectedAddress && !showComingSoonBanner) {
    return null;
  }

  // If no addresses found but coming soon banner is enabled
  if (addresses.length === 0 && !selectedAddress && showComingSoonBanner) {
    return <ComingSoonBanner className={className} />;
  }

  // Process the data for rendering
  const nextCollection = getNextCollection(collections);
  const upcomingCollections = getUpcomingCollections(collections);
  const groupedCollections = groupCollectionsByDate(upcomingCollections);

  // If we have multiple addresses but none selected yet, or if we need client-side interactivity
  if (!selectedAddress || userId) {
    return (
      <div
        className={cn(
          "p-6 rounded-3xl bg-white/90 dark:bg-black/90 border border-border/50 backdrop-blur-sm shadow-sm",
          className
        )}
      >
        {addresses.length > 1 ? (
          <BinsAddressSelector
            addresses={addresses}
            postcode={postcode}
            userId={userId}
          />
        ) : selectedAddress ? (
          <>
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Trash2 className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-md font-semibold">Bin Collections</h3>
                </div>
                <p className="text-sm text-muted-foreground/80 mt-1 capitalize">
                  {formatHouseName(selectedAddress).toLowerCase()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {message && <BinsCardClient.MessageButton message={message} />}
              </div>
            </div>

            {/* Collections with expandable view */}
            {nextCollection && (
              <BinsCardClient.ExpandableCollections
                nextCollection={nextCollection}
                groupedCollections={groupedCollections}
              />
            )}
          </>
        ) : (
          <BinsAddressSelector
            addresses={addresses}
            postcode={postcode}
            userId={userId}
          />
        )}
      </div>
    );
  }

  // No collections found
  if (collections.length === 0) {
    return (
      <NoCollections
        className={className}
        selectedAddress={selectedAddress || undefined}
      />
    );
  }

  // Main view with expandable collections
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
        <div className="flex items-center gap-2">
          {message && <BinsCardClient.MessageButton message={message} />}
        </div>
      </div>

      {/* Collections with expandable view */}
      {nextCollection && (
        <BinsCardClient.ExpandableCollections
          nextCollection={nextCollection}
          groupedCollections={groupedCollections}
        />
      )}
    </div>
  );
}
