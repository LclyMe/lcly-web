"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();

  return (
    <Button variant="secondary" size="icon" onClick={() => router.back()}>
      <ArrowLeft className="w-4 h-4" />
    </Button>
  );
}
