import { Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePostcode } from "@/hooks/use-postcode";
import { useProfile } from "@/hooks/use-profile";

export function MapButton() {
  const { profile } = useProfile();

  const postcode = profile?.postcode;

  if (!postcode) return null;

  return (
    <Link href="/map">
      <Button variant="secondary" className="gap-2 h-10">
        <Map className="h-4 w-4" />
        {postcode || "Map"}
      </Button>
    </Link>
  );
}
