"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Check, Copy } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

interface ShareButtonProps {
  url?: string;
  title?: string;
  text?: string;
  size?: "default" | "sm" | "lg" | "icon";
}

export function ShareButton({
  url = typeof window !== "undefined" ? window.location.href : "",
  title = "Check this out!",
  text = "I thought you might be interested in this.",
  size = "default",
}: ShareButtonProps) {
  const [showCheck, setShowCheck] = useState(false);
  const { toast } = useToast();

  // Check if Web Share API is supported
  const isWebShareSupported =
    typeof navigator !== "undefined" && navigator.share;

  const handleShare = async () => {
    try {
      if (isWebShareSupported) {
        await navigator.share({
          title,
          text,
          url,
        });
        toast({
          description: "Shared successfully!",
        });
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        toast({
          variant: "destructive",
          description: "Failed to share. Please try copying the link instead.",
        });
      }
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setShowCheck(true);
      toast({
        description: "Link copied to clipboard!",
      });
      setTimeout(() => setShowCheck(false), 2000);
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to copy link. Please try again.",
      });
    }
  };

  if (isWebShareSupported) {
    return (
      <Button
        onClick={handleShare}
        variant="outline"
        size={size}
        className="gap-2"
      >
        <Share2 className="h-4 w-4" />
        Share
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={size} className="gap-2">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuItem onClick={handleCopy} className="gap-2">
          {showCheck ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          Copy link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
