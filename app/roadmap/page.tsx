import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  Rocket,
  Map,
  Users,
  Smartphone,
  Building2,
  Shield,
  Leaf,
  Heart,
  Target,
  CheckCircle2,
  MapPin,
  Newspaper,
  AppWindow,
  Database,
  Vote,
} from "lucide-react";

export default function RoadmapPage() {
  return (
    <div className="container mx-auto py-8 sm:py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative mb-8">
          <Link href="/">
            <Button variant="secondary" size="icon" className="">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-8">
          Development Roadmap
        </h1>
        <p className="text-muted-foreground mb-8 sm:mb-12 text-sm sm:text-base">
          Our development roadmap outlines the planned features and improvements
          for Lcly. This is a living document that will be updated based on
          community feedback and priorities.
        </p>

        <div className="space-y-6 sm:space-y-12">
          {/* Phase 1 */}
          <Card className="border-l-4 border-l-sky-300">
            <CardHeader className="pb-4 sm:pb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Rocket className="h-6 w-6 sm:h-8 sm:w-8 text-sky-500 shrink-0" />
                  <CardTitle className="text-xl sm:text-2xl">
                    Phase 1: Strengthen the Core Platform
                  </CardTitle>
                </div>
                <Badge className="bg-sky-50 text-sky-500 hover:bg-sky-100 w-fit">
                  0-2 months
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-2">
                    Goals
                  </h3>
                  <ul className="list-disc pl-4 sm:pl-6 space-y-1 text-sm sm:text-base">
                    <li>Finalize the foundational user experience</li>
                    <li>
                      Ensure essential data structures and APIs are in place
                    </li>
                    <li>Decide on a brand identity and design system</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-2">
                    Key Tasks
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <h4 className="font-medium text-sm sm:text-base mb-1">
                        Refine MVP Features
                      </h4>
                      <ul className="list-disc pl-4 sm:pl-6 space-y-1 text-sm sm:text-base text-muted-foreground">
                        <li>
                          Review existing auth, profiles, and posts features
                        </li>
                        <li>
                          Enhance or fix critical bugs in core functionality
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm sm:text-base mb-1">
                        Set Up Basic Local Data Feeds
                      </h4>
                      <ul className="list-disc pl-4 sm:pl-6 space-y-1 text-sm sm:text-base text-muted-foreground">
                        <li>Integrate open-data source for local boundaries</li>
                        <li>Establish minimal reference data set</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm sm:text-base mb-1">
                        Establish Data Ingestion Strategy
                      </h4>
                      <ul className="list-disc pl-4 sm:pl-6 space-y-1 text-sm sm:text-base text-muted-foreground">
                        <li>Structure and store data in Supabase</li>
                        <li>Ensure compliance with open-data licensing</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Phase 2 */}
          <Card className="border-l-4 border-l-emerald-300">
            <CardHeader className="pb-4 sm:pb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Map className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-500 shrink-0" />
                  <CardTitle className="text-xl sm:text-2xl">
                    Phase 2: Expand Local Information & Mapping
                  </CardTitle>
                </div>
                <Badge className="bg-emerald-50 text-emerald-500 hover:bg-emerald-100 w-fit">
                  2-4 months
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-2">
                    Goals
                  </h3>
                  <ul className="list-disc pl-4 sm:pl-6 space-y-1 text-sm sm:text-base">
                    <li>
                      Introduce interactive local map and boundary overlays
                    </li>
                    <li>
                      Populate local services data in targeted pilot areas
                    </li>
                    <li>Create foundation for local newsfeed</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-2">
                    Key Tasks
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <h4 className="font-medium text-sm sm:text-base mb-1">
                        Local Map & Boundary Integration
                      </h4>
                      <ul className="list-disc pl-4 sm:pl-6 space-y-1 text-sm sm:text-base text-muted-foreground">
                        <li>Implement map component in Next.js</li>
                        <li>Overlay boundary lines from open data sets</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm sm:text-base mb-1">
                        Local Services Layer
                      </h4>
                      <ul className="list-disc pl-4 sm:pl-6 space-y-1 text-sm sm:text-base text-muted-foreground">
                        <li>Add official local service points to the map</li>
                        <li>Implement caching for performance</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Phase 3 */}
          <Card className="border-l-4 border-l-violet-300">
            <CardHeader className="pb-4 sm:pb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 text-violet-500 shrink-0" />
                  <CardTitle className="text-xl sm:text-2xl">
                    Phase 3: Community Features & Scaling
                  </CardTitle>
                </div>
                <Badge className="bg-violet-50 text-violet-500 hover:bg-violet-100 w-fit">
                  4-7 months
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-2">
                    Goals
                  </h3>
                  <ul className="list-disc pl-4 sm:pl-6 space-y-1 text-sm sm:text-base">
                    <li>Launch initial pilot in selected areas</li>
                    <li>Add advanced local community features</li>
                    <li>Strengthen user interaction flows</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-2">
                    Key Tasks
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <h4 className="font-medium text-sm sm:text-base mb-1">
                        Local Communities & Groups
                      </h4>
                      <ul className="list-disc pl-4 sm:pl-6 space-y-1 text-sm sm:text-base text-muted-foreground">
                        <li>City/town group functionality</li>
                        <li>Bin collection schedules and local events</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm sm:text-base mb-1">
                        Guides & Noticeboard
                      </h4>
                      <ul className="list-disc pl-4 sm:pl-6 space-y-1 text-sm sm:text-base text-muted-foreground">
                        <li>Wiki-like system for local tips</li>
                        <li>Digital noticeboard for community postings</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Phase 4 */}
          <Card className="border-l-4 border-l-amber-300">
            <CardHeader className="pb-4 sm:pb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-6 w-6 sm:h-8 sm:w-8 text-amber-500 shrink-0" />
                  <CardTitle className="text-xl sm:text-2xl">
                    Phase 4: Mobile App & Broader Coverage
                  </CardTitle>
                </div>
                <Badge className="bg-amber-50 text-amber-500 hover:bg-amber-100 w-fit">
                  7-10 months
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-2">
                    Goals
                  </h3>
                  <ul className="list-disc pl-4 sm:pl-6 space-y-1 text-sm sm:text-base">
                    <li>Develop dedicated mobile app for iOS/Android</li>
                    <li>Broaden coverage to additional UK regions</li>
                    <li>Refine local data ingestion processes</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-2">
                    Key Tasks
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <h4 className="font-medium text-sm sm:text-base mb-1">
                        Mobile App Development
                      </h4>
                      <ul className="list-disc pl-4 sm:pl-6 space-y-1 text-sm sm:text-base text-muted-foreground">
                        <li>React Native or Expo implementation</li>
                        <li>Push notifications for community updates</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm sm:text-base mb-1">
                        Automated Data Sync
                      </h4>
                      <ul className="list-disc pl-4 sm:pl-6 space-y-1 text-sm sm:text-base text-muted-foreground">
                        <li>Scale up data ingestion pipeline</li>
                        <li>Schedule periodic data refreshes</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Phase 5 */}
          <Card className="border-l-4 border-l-rose-300">
            <CardHeader className="pb-4 sm:pb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Building2 className="h-6 w-6 sm:h-8 sm:w-8 text-rose-500 shrink-0" />
                  <CardTitle className="text-xl sm:text-2xl">
                    Phase 5: Advanced Engagement & Partnerships
                  </CardTitle>
                </div>
                <Badge className="bg-rose-50 text-rose-500 hover:bg-rose-100 w-fit">
                  10-12+ months
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-2">
                    Goals
                  </h3>
                  <ul className="list-disc pl-4 sm:pl-6 space-y-1 text-sm sm:text-base">
                    <li>Integrate local democracy features</li>
                    <li>Partner with local authorities and institutions</li>
                    <li>Standardize updates across UK communities</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-2">
                    Key Tasks
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <h4 className="font-medium text-sm sm:text-base mb-1">
                        Local Democracy Tools
                      </h4>
                      <ul className="list-disc pl-4 sm:pl-6 space-y-1 text-sm sm:text-base text-muted-foreground">
                        <li>Community polling and petition features</li>
                        <li>Government portal integrations</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm sm:text-base mb-1">
                        Full UK Rollout
                      </h4>
                      <ul className="list-disc pl-4 sm:pl-6 space-y-1 text-sm sm:text-base text-muted-foreground">
                        <li>Coverage of all counties and wards</li>
                        <li>Local volunteer data curation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ongoing Considerations */}
          <Card className="border-l-4 border-l-slate-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Target className="h-6 w-6 sm:h-8 sm:w-8 text-slate-500 shrink-0" />
                <CardTitle className="text-xl sm:text-2xl">
                  Ongoing Considerations
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-slate-500 shrink-0" />
                    <h3 className="font-semibold text-base sm:text-lg">
                      Security & Privacy
                    </h3>
                  </div>
                  <ul className="list-disc pl-4 sm:pl-6 space-y-1 text-sm sm:text-base text-muted-foreground">
                    <li>GDPR compliance</li>
                    <li>Data source verification</li>
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Leaf className="h-5 w-5 text-slate-500 shrink-0" />
                    <h3 className="font-semibold text-base sm:text-lg">
                      Sustainability
                    </h3>
                  </div>
                  <ul className="list-disc pl-4 sm:pl-6 space-y-1 text-sm sm:text-base text-muted-foreground">
                    <li>Revenue model exploration</li>
                    <li>Open-source development</li>
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="h-5 w-5 text-slate-500 shrink-0" />
                    <h3 className="font-semibold text-base sm:text-lg">
                      Community
                    </h3>
                  </div>
                  <ul className="list-disc pl-4 sm:pl-6 space-y-1 text-sm sm:text-base text-muted-foreground">
                    <li>Content moderation</li>
                    <li>Local moderator roles</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
