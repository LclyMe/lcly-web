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
} from "lucide-react";

export default function RoadmapPage() {
  return (
    <div className="container mx-auto py-8 sm:py-12 px-4">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <div className="relative">
          <Link href="/">
            <Button variant="secondary" size="icon" className="">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="flex gap-4 flex-col items-start">
          <div className="flex gap-2 flex-col">
            <h1 className="text-3xl md:text-4xl tracking-tighter max-w-xl font-regular text-left">
              Our Roadmap
            </h1>
            <p className="text-lg max-w-xl lg:max-w-2xl leading-relaxed tracking-tight text-muted-foreground text-left">
              Our roadmap outlines the planned project timeline for Lcly. This
              is a living document that will be updated based on community
              feedback and priorities.
            </p>
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {/* Phase 1 */}
          <Card className="border-l-4 border-l-sky-300">
            <CardHeader className="pb-4 sm:pb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Rocket className="h-6 w-6 sm:h-8 sm:w-8 text-sky-500 shrink-0" />
                  <CardTitle className="text-xl sm:text-2xl">
                    Step 1: Your Postcode Online
                  </CardTitle>
                </div>
                <Badge className="hidden bg-sky-50 text-sky-500 hover:bg-sky-100 w-fit">
                  0-2 months
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-2">
                    Goal
                  </h3>
                  <ul className="list-disc pl-4 sm:pl-6 space-y-1 text-sm sm:text-base">
                    <li>
                      Create an enjoyable experience for people to find their
                      postcode and explore Lcly with other people across the UK.
                    </li>
                  </ul>
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
                    Step 2: Introduce Maps
                  </CardTitle>
                </div>
                <Badge className="hidden bg-emerald-50 text-emerald-500 hover:bg-emerald-100 w-fit">
                  2-4 months
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-2">
                    Goal
                  </h3>
                  <ul className="list-disc pl-4 sm:pl-6 space-y-1 text-sm sm:text-base">
                    <li>
                      Introduce an interactive local map with useful services
                      like community monitor and local noticeboards.
                    </li>
                  </ul>
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
                    Step 3: Communities and Friends
                  </CardTitle>
                </div>
                <Badge className="hidden bg-violet-50 text-violet-500 hover:bg-violet-100 w-fit">
                  4-7 months
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-2">
                    Goal
                  </h3>
                  <ul className="list-disc pl-4 sm:pl-6 space-y-1 text-sm sm:text-base">
                    <li>
                      Introduce online communities for your town, city or
                      county.
                    </li>
                    <li>
                      Introduce a friends list to connect with people in your
                      area.
                    </li>
                  </ul>
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
                    Step 4: Local Government & Business
                  </CardTitle>
                </div>
                <Badge className="hidden bg-amber-50 text-amber-500 hover:bg-amber-100 w-fit">
                  7-10 months
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-2">
                    Goal
                  </h3>
                  <ul className="list-disc pl-4 sm:pl-6 space-y-1 text-sm sm:text-base">
                    <li>
                      Connect directly to local government, councils and
                      businesses that serve your community.
                    </li>
                  </ul>
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
                    Step 5: Open to Developers
                  </CardTitle>
                </div>
                <Badge className="hidden bg-rose-50 text-rose-500 hover:bg-rose-100 w-fit">
                  10-12+ months
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-2">
                    Goal
                  </h3>
                  <ul className="list-disc pl-4 sm:pl-6 space-y-1 text-sm sm:text-base">
                    <li>
                      Open up Lcly as a infrastructure platform for businesses
                      and developers to deploy their own local services in an
                      easy and trusted way.
                    </li>
                  </ul>
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
                    <li>Local community leaders</li>
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
