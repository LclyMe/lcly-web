import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Twitter, Instagram, ArrowLeft } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">
          Thank you for joining our waitlist! 🎉
        </h1>
        <p className="text-xl text-muted-foreground">
          We'll let you know as soon as we launch in your area. While you wait,
          here are some ways to stay connected:
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-6">
          <Button variant="outline" asChild>
            <Link href="https://github.com/your-repo" target="_blank">
              <Github className="mr-2 h-4 w-4" />
              Contribute on GitHub
            </Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="https://twitter.com/your-handle" target="_blank">
              <Twitter className="mr-2 h-4 w-4" />
              Follow on X
            </Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="https://instagram.com/your-handle" target="_blank">
              <Instagram className="mr-2 h-4 w-4" />
              Follow on Instagram
            </Link>
          </Button>
        </div>

        <div className="pt-8">
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
