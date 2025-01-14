"use client";

import { Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePostcode } from "@/hooks/use-postcode";

export function MapButton() {
  const { postcodeData } = usePostcode();
  if (!postcodeData) return null;

  return (
    <Link href="/map">
      <Button variant="secondary" className="gap-2">
        <Map className="h-4 w-4" />
        {postcodeData ? postcodeData.postcode : "Map"}
      </Button>
    </Link>
  );
}
