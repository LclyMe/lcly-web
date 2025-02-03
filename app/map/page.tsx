import InteractiveMap from "@/components/map/interactive-map";
import { getCurrentProfile } from "@/lib/server/profile";
import { PostcodeData } from "@/types/location";
import { getPostcodeLocation } from "@/lib/server/postcode";
import { NoLocation } from "@/components/map/no-location";
import { NoLocationAuth } from "@/components/map/no-location-auth";

interface SearchParams {
  lat?: string;
  lng?: string;
  postcode?: string;
}

export default async function MapPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { postcode, lat, lng } = await searchParams;
  const profile = await getCurrentProfile();
  const location = profile?.postcode_location;

  let tempLocation: PostcodeData | null = null;

  if (postcode) {
    try {
      tempLocation = await getPostcodeLocation(postcode);
    } catch (error) {
      console.error("Error fetching postcode:", error);
    }
  } else if (lat && lng) {
    tempLocation = {
      latitude: parseFloat(lat),
      longitude: parseFloat(lng),
      postcode: "Temporary Location",
      admin_district: "Temporary District",
      admin_ward: "Temporary Ward",
      region: "Temporary Region",
      country: "United Kingdom",
      parliamentary_constituency: "Temporary Constituency",
      id: "temp",
      created_at: new Date().toISOString(),
    } as PostcodeData;
  }

  const isSearching = !!postcode || (!!lat && !!lng);
  const isTemporary = !!tempLocation;
  const displayLocation = tempLocation || location;

  if (isSearching && !tempLocation) {
    return <NoLocation />;
  }

  if (!displayLocation) {
    return <NoLocationAuth />;
  }

  return (
    <div className="w-full bg-black flex-grow md:h-screen flex flex-col">
      <InteractiveMap
        savedLocation={displayLocation}
        isTemporary={isTemporary}
        profileLocation={location}
      />
    </div>
  );
}
