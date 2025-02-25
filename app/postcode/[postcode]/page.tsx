import { getPostcodeLocation } from "@/lib/server/postcode";
import { getWeather } from "@/lib/utils/weather";
import { BackButton } from "@/components/ui/back-button";
import { PostcodeDetails } from "@/components/postcode-details";

interface PostcodePageProps {
  params: Promise<{
    postcode: string;
  }>;
}

export default async function PostcodePage({ params }: PostcodePageProps) {
  const { postcode } = await params;
  const decodedPostcode = decodeURIComponent(postcode);
  const location = await getPostcodeLocation(decodedPostcode);
  const weather = await getWeather(location.latitude, location.longitude, true);

  return (
    <div className="relative container mx-auto px-6 h-full min-h-[80vh] flex flex-col items-center justify-center pb-6">
      {/* Back Button */}
      <div className="absolute left-4 top-8 z-10">
        <BackButton />
      </div>

      <PostcodeDetails
        location={location}
        weather={weather}
        mpData={location.mp_data}
      />
    </div>
  );
}
