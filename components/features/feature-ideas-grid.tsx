"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowBigUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";
import { toast } from "@/hooks/use-toast";
import { FeatureWithVotes } from "@/lib/server/features";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface FeatureIdeasGridProps {
  initialFeatures: FeatureWithVotes[];
}

export function FeatureIdeasGrid({ initialFeatures }: FeatureIdeasGridProps) {
  const supabase = createClient();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Set up React Query
  const { data: features } = useQuery({
    queryKey: ["features"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc(
        "get_feature_ideas_with_votes"
      );
      if (error) throw error;
      return data.map((feature: any) => ({
        ...feature,
        has_voted: false,
        votes_count: feature.feature_votes.length,
      }));
    },
    initialData: initialFeatures,
  });

  // Handle voting mutation
  const voteMutation = useMutation({
    mutationFn: async ({
      featureId,
      hasVoted,
    }: {
      featureId: string;
      hasVoted: boolean;
    }) => {
      if (hasVoted) {
        return supabase
          .from("feature_votes")
          .delete()
          .eq("feature_id", featureId)
          .eq("user_id", user!.id);
      } else {
        return supabase
          .from("feature_votes")
          .insert([{ feature_id: featureId, user_id: user!.id }]);
      }
    },
    onMutate: async ({ featureId, hasVoted }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["features"] });

      // Snapshot the previous value
      const previousFeatures = queryClient.getQueryData(["features"]);

      // Optimistically update
      queryClient.setQueryData(["features"], (old: FeatureWithVotes[]) =>
        old.map((feature) =>
          feature.id === featureId
            ? {
                ...feature,
                votes_count: hasVoted
                  ? feature.votes_count - 1
                  : feature.votes_count + 1,
                has_voted: !hasVoted,
              }
            : feature
        )
      );

      return { previousFeatures };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["features"], context?.previousFeatures);
      toast({
        title: "Failed to register vote",
        description: "Please try again later",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["features"] });
    },
  });

  const handleVote = async (featureId: string, hasVoted: boolean) => {
    if (!user) {
      toast({
        title: "Please log in to vote",
      });
      return;
    }

    voteMutation.mutate({ featureId, hasVoted });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features?.map((feature) => (
        <Card
          key={feature.id}
          className="overflow-hidden group hover:shadow-lg transition-shadow duration-300"
        >
          <div className="aspect-[5/2] md:aspect-[16/9] relative overflow-hidden">
            <Image
              src={feature.image}
              alt={feature.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <CardHeader>
            <CardTitle className="text-xl tracking-tight">
              {feature.title}
            </CardTitle>
            <CardDescription>{feature.description}</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between items-center">
            <Button
              variant="secondary"
              size="sm"
              className={cn(
                "gap-2 hover:bg-primary/10",
                feature.has_voted && "text-primary"
              )}
              onClick={() => handleVote(feature.id, feature.has_voted)}
            >
              <ArrowBigUp className="h-5 w-5" />
              <span>{feature.votes_count}</span>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
