"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  postcode: z
    .string()
    .min(5, "Please enter a valid UK postcode")
    .max(8, "Please enter a valid UK postcode")
    .regex(
      /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i,
      "Please enter a valid UK postcode"
    ),
});

export function WaitlistForm({ lightMode = false }: { lightMode?: boolean }) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      postcode: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("waitlist")
        .insert([
          { email: values.email, postcode: values.postcode.toUpperCase() },
        ]);

      if (error) throw error;

      form.reset();
      router.push("/success");
    } catch (error) {
      console.error(error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className={cn("w-full sm:w-[240px]", {
                    "bg-white text-black": lightMode,
                  })}
                  placeholder="Email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="postcode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className={cn("w-full sm:w-[160px]", {
                    "bg-white text-black": lightMode,
                  })}
                  placeholder="Postcode (optional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className={cn("h-10 mt-2 sm:mt-0", {
            "bg-transparent text-white": lightMode,
          })}
          type="submit"
          disabled={isLoading}
          variant={lightMode ? "outline" : "default"}
        >
          Join Waitlist <ArrowRight className="w-4 h-4" />
        </Button>
      </form>
    </Form>
  );
}
