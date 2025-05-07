"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Calendar, Award, UserCircle } from "lucide-react";
import { Database } from "@/types/database.types";
import { getPartyColor } from "@/lib/parties";

type Councillor = Database["public"]["Views"]["current_councillors"]["Row"];

interface CouncillorCardProps {
  councillor: Councillor;
  hideWard?: boolean;
}

export function CouncillorCard({
  councillor,
  hideWard = false,
}: CouncillorCardProps) {
  const partyColor = getPartyColor(councillor.party_name);

  return (
    <Card variant="secondary" className="p-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCircle className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">{councillor.councillor_name}</span>
          </div>
          <Badge variant="secondary" className={partyColor}>
            {councillor.party_name}
          </Badge>
        </div>

        <div className="space-y-2">
          {!hideWard && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Award className="h-4 w-4 " />
              <span className="text-sm">
                Ward:{" "}
                <span className="font-medium">{councillor.ward_name}</span>
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">
              Next election:{" "}
              <span className="font-medium">
                {councillor.next_election
                  ? new Date(councillor.next_election).toLocaleDateString()
                  : "Unknown"}
              </span>
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
