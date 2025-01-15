"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Github, Loader2 } from "lucide-react";
import { useState } from "react";

export function SocialLogins() {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { signInWithGithub, signInWithX } = useAuth();

  const handleSocialLogin = async (provider: "github" | "x") => {
    setIsLoading(provider);
    try {
      if (provider === "github") {
        await signInWithGithub();
      } else {
        await signInWithX();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="space-y-5">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="">
        <Button
          variant="outline"
          onClick={() => handleSocialLogin("github")}
          disabled={isLoading !== null}
          className="w-full h-12 text-base font-medium"
        >
          {isLoading === "github" ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Github className="mr-2 h-4 w-4" />
          )}
          GitHub
        </Button>
      </div>
    </div>
  );
}
