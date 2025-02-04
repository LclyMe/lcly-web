import { FeatureIdeasGrid } from "@/components/features/feature-ideas-grid";
import { BackButton } from "@/components/ui/back-button";
import { getFeatures } from "@/lib/server/features";

export const metadata = {
  title: "Feature Ideas | Lcly",
  description: "Vote on and suggest new features for Lcly",
};

export default async function FeaturesPage() {
  const features = await getFeatures();

  return (
    <div className="container mx-auto py-8 px-4 md:pb-24">
      <div className="flex flex-col gap-8">
        <div className="relative">
          <BackButton />
        </div>
        <div className="flex gap-4 flex-col items-start">
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-4xl tracking-tighter max-w-xl font-regular text-left">
              Feature Ideas
            </h2>
            <p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-muted-foreground text-left">
              We've got a lot of ideas for Lcly. Vote on what we should tackle
              next.
            </p>
          </div>
        </div>
        <FeatureIdeasGrid initialFeatures={features} />
      </div>
    </div>
  );
}
