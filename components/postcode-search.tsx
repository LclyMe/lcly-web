"use client";

import { useState } from "react";
import { usePostcode } from "@/hooks/use-postcode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export function PostcodeSearch() {
  const [postcode, setPostcode] = useState("");
  const { getPostcodeInfo, isLoading } = usePostcode();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!postcode.trim()) {
      toast({
        title: "Please enter a postcode",
        variant: "destructive",
      });
      return;
    }

    try {
      const data = await getPostcodeInfo(postcode.trim());
      router.push(`/map?lat=${data.latitude}&lng=${data.longitude}`);
    } catch (error) {
      toast({
        title: "Invalid postcode",
        description: "Please enter a valid UK postcode",
        variant: "destructive",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm gap-2 items-center"
    >
      <Input
        type="text"
        placeholder="Enter your postcode"
        value={postcode}
        onChange={(e) => setPostcode(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          </>
        ) : (
          "Search"
        )}
      </Button>
    </form>
  );
}
