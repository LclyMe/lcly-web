"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export function useJoinCommunity(
  communityId: string,
  initialMemberState: boolean
) {
  const [isLoading, setIsLoading] = useState(false);
  const [isMember, setIsMember] = useState(initialMemberState);
  const { toast } = useToast();
  const router = useRouter();
  const supabase = createClient();

  const joinCommunity = async () => {
    try {
      setIsLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      // Join the community
      const { error } = await supabase.from("community_members").insert({
        communityid: communityId,
        user_id: user.id,
      });

      if (error) throw error;

      setIsMember(true);
      toast({
        description: "Successfully joined the community!",
      });

      router.refresh();
    } catch (error) {
      console.error("Error joining community:", error);
      toast({
        variant: "destructive",
        description: "Failed to join community. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const leaveCommunity = async () => {
    try {
      setIsLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { error } = await supabase
        .from("community_members")
        .delete()
        .eq("communityid", communityId)
        .eq("user_id", user.id);

      if (error) throw error;

      setIsMember(false);
      toast({
        description: "Successfully left the community",
      });

      router.refresh();
    } catch (error) {
      console.error("Error leaving community:", error);
      toast({
        variant: "destructive",
        description: "Failed to leave community. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    joinCommunity,
    leaveCommunity,
    isLoading,
    isMember,
  };
}
