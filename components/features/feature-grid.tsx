import {
  Building2,
  Users2,
  Vote,
  Shield,
  Heart,
  Code2,
  School,
  Loader2,
  Flag,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useLocation } from "@/hooks/use-location";

function FeatureGrid() {
  const { locationData, loading, error } = useLocation();

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex gap-4 flex-col items-start">
            <div>
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary hover:bg-primary/20"
              >
                Community
              </Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl md:text-4xl tracking-tighter max-w-xl font-regular text-left">
                Explore Communities
              </h2>
              <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
                Connect with your neighbors, stay informed, and make a
                difference in your local area.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/communities" className="group">
              <div className="hover:bg-muted bg-primary/5 rounded-2xl sm:aspect-square p-8 flex justify-between flex-col transition-all duration-300">
                <div className="flex justify-between items-start">
                  <Flag className="w-8 h-8 stroke-1.5 text-primary mb-6" />
                </div>
                <div className="flex flex-col mt-auto">
                  <div className="flex -space-x-3 mb-6">
                    {[
                      { src: "https://flagcdn.com/gb-eng.svg", alt: "England" },
                      {
                        src: "https://flagcdn.com/gb-sct.svg",
                        alt: "Scotland",
                      },
                      { src: "https://flagcdn.com/gb-wls.svg", alt: "Wales" },
                      {
                        src: "https://flagcdn.com/gb-nir.svg",
                        alt: "Northern Ireland",
                      },
                    ].map((flag) => (
                      <div
                        key={flag.src}
                        className="inline-block h-10 w-10 rounded-full ring-2 dark:ring-gray-900 ring-gray-100"
                      >
                        <img
                          src={flag.src}
                          alt={flag.alt}
                          className="h-full w-full rounded-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <h3 className="text-xl tracking-tight font-semibold">
                    Explore All Communities
                  </h3>
                  <p className="text-muted-foreground max-w-xs text-base mt-2">
                    Discover vibrant local communities across the United
                    Kingdom.
                  </p>
                </div>
              </div>
            </Link>
            <Link
              href={`/c/${locationData?.community.slug}`}
              className="hover:bg-muted bg-primary/5 rounded-2xl sm:aspect-square p-8 flex justify-between flex-col transition-all duration-300"
            >
              <Users2 className="w-8 h-8 stroke-1.5 text-primary mb-6" />
              <div className="flex flex-col mt-auto">
                <h3 className="text-xl tracking-tight font-semibold">
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <span>Finding your city</span>
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  ) : locationData ? (
                    <>Connect in {locationData.community.name}</>
                  ) : (
                    "Connect Locally"
                  )}
                </h3>
                <p className="text-muted-foreground max-w-xs text-base mt-2">
                  {loading ? (
                    "Discovering local connections in your area..."
                  ) : locationData ? (
                    <>
                      Join the {locationData.community.name} community and
                      connect with your neighbors.
                    </>
                  ) : (
                    "Build meaningful connections with people in your area and create lasting relationships."
                  )}
                </p>
              </div>
            </Link>

            <Link
              href="https://github.com/LclyMe/lcly-web"
              target="_blank"
              className="relative lg:row-span-2"
            >
              <div className="relative hover:bg-muted bg-primary/5 rounded-2xl h-full p-8 flex justify-between flex-col transition-all duration-300 overflow-hidden">
                <Code2 className="w-8 h-8 stroke-1.5 text-primary mb-6" />
                <div className="flex flex-col mt-auto">
                  <h3 className="text-xl tracking-tight font-semibold">
                    Developers
                  </h3>
                  <p className="text-muted-foreground max-w-xs text-base mt-2">
                    Join us in building digital infrastructure for local
                    communities. Deploy your own app or contribute to the
                    platform.
                  </p>
                </div>
              </div>
            </Link>

            <div className="hover:bg-muted bg-primary/5 rounded-2xl h-full lg:col-span-2 p-8 flex justify-between flex-col transition-all duration-300 relative md:overflow-hidden">
              <div className="relative z-10">
                <School className="w-8 h-8 stroke-1.5 text-primary mb-6" />
                <div className="flex flex-col mt-auto">
                  <h3 className="text-xl tracking-tight font-semibold">
                    Universities
                  </h3>
                  <p className="text-muted-foreground max-w-xs text-base mt-2">
                    Find your class, clubs, or accommodation and connect with
                    your peers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { FeatureGrid };
