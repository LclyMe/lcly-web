import InteractiveMap from "@/components/map/interactive-map";
import { getCurrentProfile } from "@/lib/server/profile";

export default async function MapPage() {
  const profile = await getCurrentProfile();

  const location = profile?.postcode_location;

  if (!location) {
    return <div>No location found</div>;
  }

  return (
    <div className="h-screen w-full bg-black">
      <InteractiveMap savedLocation={location} />
    </div>
  );
}
