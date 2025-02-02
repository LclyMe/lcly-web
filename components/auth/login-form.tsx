"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const { signInWithEmailAndPassword, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signInWithEmailAndPassword(email, password);
    router.push("/home");
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleEmailSubmit} className="space-y-4">
        <div>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12"
            required
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full h-12 text-base font-medium"
          disabled={loading}
        >
          Continue with Email
        </Button>
      </form>
    </div>
  );
}
