import { Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useProfile } from "@/hooks/use-profile";

export function MapButton() {
  const { profile } = useProfile();

  const postcode = profile?.postcode;

  if (!postcode) return null;

  return (
    <Link href="/map">
      <Button variant="secondary" className="gap-2 h-10 w-10 md:w-auto">
        <Map className="h-4 w-4" />
        <span className="hidden md:block">{postcode || "Map"}</span>
      </Button>
    </Link>
  );
}
