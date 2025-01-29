"use client";

import { Community } from "@/lib/server/communities";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import {
  CalendarDays,
  MessageSquare,
  Users,
  Newspaper,
  MapPin,
} from "lucide-react";

interface CommunityContentProps {
  community: Community;
}

export function CommunityContent({ community }: CommunityContentProps) {
  return (
    <div className="container px-4 py-8">
      <Tabs defaultValue="feed" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px] lg:grid-cols-4">
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Latest Updates
          </h2>
          {/* Mock feed items */}
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Local Resident</p>
                      <p className="text-sm text-muted-foreground">
                        2 hours ago
                      </p>
                    </div>
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p>
                    {i === 1
                      ? `The ${community.name} farmers market is back this weekend! Don't miss out on fresh local produce and artisanal goods.`
                      : i === 2
                      ? "New community garden project starting next month. Looking for volunteers!"
                      : "Great turnout at yesterday's community cleanup event. Thanks to everyone who participated!"}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Upcoming Events
          </h2>
          {/* Mock events */}
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6">
              <div className="flex gap-4">
                <div className="flex h-14 w-14 flex-col items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <span className="text-sm font-medium">MAR</span>
                  <span className="text-2xl font-bold">{i + 14}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">
                    {i === 1
                      ? "Community Market Day"
                      : i === 2
                      ? "Local History Talk"
                      : "Spring Festival"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {i === 1
                      ? "Support local businesses and enjoy fresh produce"
                      : i === 2
                      ? "Learn about the rich history of our community"
                      : "Celebrate the arrival of spring with music and food"}
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    <span>10:00 AM - 4:00 PM</span>
                    <MapPin className="ml-2 h-4 w-4" />
                    <span>Town Square</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Community Members
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Mock members */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted" />
                  <div>
                    <p className="font-medium">Community Member {i}</p>
                    <p className="text-sm text-muted-foreground">
                      {i === 1 ? "Admin" : i === 2 ? "Moderator" : "Member"}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="about" className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">
            About {community.name}
          </h2>
          <Card className="p-6">
            <div className="prose dark:prose-invert max-w-none">
              {(community.wikipedia_data as any)?.extract ? (
                <>
                  <p>{(community.wikipedia_data as any).extract}</p>
                  <h3>Quick Facts</h3>
                  <ul>
                    <li>
                      Population:{" "}
                      {community.population?.toLocaleString() ||
                        "Data not available"}
                    </li>
                    <li>Type: {community.type}</li>
                    <li>
                      Member since:{" "}
                      {new Date(community.created_at).toLocaleDateString()}
                    </li>
                  </ul>
                </>
              ) : (
                <p>
                  No additional information available for {community.name} at
                  this time.
                </p>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
