"use client";

import { useMPQuery } from "@/hooks/use-mp";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { User, Calendar, Briefcase, ExternalLink, Award } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MPOffice, MPRecord } from "@/lib/server/mp";
import { cn } from "@/lib/utils";

interface MPCardProps {
  constituency?: string;
  mp?: MPRecord;
  showTitle?: boolean;
}

// Function to get party color based on party name
const getPartyColor = (party: string): string => {
  const partyLower = party.toLowerCase();

  if (partyLower.includes("labour")) {
    return "bg-[#E4003B] text-white"; // Labour red
  } else if (partyLower.includes("conservative")) {
    return "bg-[#0087DC] text-white"; // Conservative blue
  } else if (partyLower.includes("liberal democrat")) {
    return "bg-[#FAA61A] text-black"; // Lib Dem orange/yellow
  } else if (partyLower.includes("green")) {
    return "bg-[#6AB023] text-white"; // Green Party green
  } else if (partyLower.includes("scottish national")) {
    return "bg-[#FFF95D] text-black"; // SNP yellow
  } else if (partyLower.includes("plaid cymru")) {
    return "bg-[#005B54] text-white"; // Plaid Cymru green
  } else if (partyLower.includes("democratic unionist")) {
    return "bg-[#D61921] text-white"; // DUP red
  } else if (
    partyLower.includes("sinn féin") ||
    partyLower.includes("sinn fein")
  ) {
    return "bg-[#326760] text-white"; // Sinn Féin green
  } else if (partyLower.includes("reform")) {
    return "bg-[#12B6CF] text-white"; // Reform UK teal
  } else {
    return "bg-gray-700 text-white"; // Default for other parties
  }
};

export function MPCard({
  constituency,
  mp: propMp,
  showTitle = true,
}: MPCardProps) {
  const {
    data: fetchedMp,
    isLoading,
    error: fetchError,
  } = useMPQuery(constituency);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Use provided MP data if available, otherwise use fetched data
  const mp = propMp || fetchedMp;
  const isLoadingData = !propMp && isLoading;
  const error = !propMp && fetchError;

  if (isLoadingData) {
    return (
      <Card className="p-4 space-y-4">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>
      </Card>
    );
  }

  if (error || !mp) {
    return (
      <Card className="p-4 text-center text-muted-foreground">
        <p>Could not load MP information</p>
      </Card>
    );
  }

  const mpImageUrl = mp.person_id
    ? `https://www.theyworkforyou.com/people-images/mpsL/${mp.person_id}.jpg`
    : null;

  const partyColor = getPartyColor(mp.party);

  return (
    <>
      {showTitle && (
        <h4 className="text-lg font-medium mb-4">MP for {mp.constituency}</h4>
      )}

      <div className="bg-gray-100 dark:bg-white/5 text-foreground rounded-xl overflow-hidden">
        <div className="p-4">
          <div className="flex items-center gap-4">
            {mpImageUrl && (
              <div className="relative h-20 w-20 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                <img
                  src={mpImageUrl}
                  alt={mp.full_name}
                  className="object-cover"
                />
              </div>
            )}

            <div>
              <h3 className="text-xl font-semibold">{mp.full_name}</h3>
              <Badge variant="secondary" className={cn("mt-1", partyColor)}>
                {mp.party}
              </Badge>
            </div>
          </div>

          {/* MP Details */}
          <div className="mt-6 space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">MP since</div>
              <div className="font-medium">
                {mp.entered_house
                  ? new Date(mp.entered_house).getFullYear()
                  : "Unknown"}
              </div>
            </div>

            {mp.office && Array.isArray(mp.office) && mp.office.length > 0 && (
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Current Role
                </div>
                <div className="font-medium">
                  {(mp.office[0] as MPOffice).position}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              <span>MP Details</span>
            </DialogTitle>
            <DialogDescription>
              Information about your Member of Parliament
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center gap-4 py-4">
            {mpImageUrl && (
              <div className="relative h-32 w-32 rounded-full overflow-hidden bg-secondary">
                <Image
                  src={mpImageUrl}
                  alt={mp.full_name}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="text-center">
              <h3 className="text-xl font-semibold">{mp.full_name}</h3>
              <Badge variant="secondary" className={cn("mt-1", partyColor)}>
                {mp.party}
              </Badge>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  MP for <span className="font-medium">{mp.constituency}</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  MP since{" "}
                  <span className="font-medium">
                    {mp.entered_house
                      ? new Date(mp.entered_house).getFullYear()
                      : "Unknown"}
                  </span>
                </span>
              </div>

              {mp.office &&
                Array.isArray(mp.office) &&
                mp.office.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Current role:{" "}
                      <span className="font-medium">
                        {(mp.office[0] as MPOffice).position}
                      </span>
                    </span>
                  </div>
                )}
            </div>

            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              asChild
            >
              <a
                href={`https://www.theyworkforyou.com/mp/${mp.person_id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on TheyWorkForYou
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
