"use client";

import { useState } from "react";
import { usePostcode } from "@/hooks/use-postcode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PostcodeSearchProps {
  onSelect?: (postcode: string) => void;
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
}

export function PostcodeSearch({
  onSelect,
  placeholder = "Enter your postcode",
  className,
  buttonClassName,
}: PostcodeSearchProps) {
  const [postcode, setPostcode] = useState("");
  const { isLoading } = usePostcode();
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
      if (onSelect) {
        onSelect(postcode.trim());
      } else {
        router.push(`/map?postcode=${encodeURIComponent(postcode.trim())}`);
      }
    } catch (error) {
      console.error(error);
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
      className="flex w-full max-w-md gap-2 items-center"
    >
      <Input
        type="text"
        placeholder={placeholder}
        value={postcode}
        onChange={(e) => {
          const value = e.target.value.toUpperCase();
          // Remove any characters that aren't letters or numbers
          const cleaned = value.replace(/[^A-Z0-9]/g, "");
          // Apply postcode format (e.g., AA9A 9AA)
          let formatted = cleaned;
          if (cleaned.length > 4) {
            formatted = cleaned.slice(0, -3) + " " + cleaned.slice(-3);
          }
          setPostcode(formatted);
        }}
        maxLength={8}
        className={cn("flex-1 h-10", className)}
      />
      <Button
        type="submit"
        className={cn("h-10 text-base font-medium w-24", buttonClassName)}
        disabled={isLoading}
      >
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
