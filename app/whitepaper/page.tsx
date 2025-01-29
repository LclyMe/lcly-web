import fs from "fs";
import path from "path";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import "@/components/thoughts/editor.css";

import { TableOfContents } from "@/components/toc";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import LclyLogo from "@/components/logos/LclyLogo";
import { WhitepaperContent } from "@/components/whitepaper/content";

export const metadata: Metadata = {
  title: "Lcly Whitepaper",
  description: "Building Public Digital Infrastructure for UK Communities",
};

async function getWhitepaper() {
  const filePath = path.join(process.cwd(), "content", "whitepaper.md");
  try {
    const source = fs.readFileSync(filePath, "utf8");
    return source;
  } catch (error) {
    console.error("Error reading whitepaper:", error);
    return null;
  }
}

async function getEli5Whitepaper() {
  const filePath = path.join(process.cwd(), "content", "whitepaper-eli5.md");
  try {
    const source = fs.readFileSync(filePath, "utf8");
    return source;
  } catch (error) {
    console.error("Error reading ELI5 whitepaper:", error);
    return null;
  }
}

export default async function WhitepaperPage() {
  const source = await getWhitepaper();
  const eli5Source = await getEli5Whitepaper();

  if (!source || !eli5Source) {
    notFound();
  }

  return (
    <div className="h-screen overflow-y-scroll scroll-pt-24">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center px-6">
          <Button
            variant="ghost"
            size="icon"
            className="mr-4 hidden md:flex"
            asChild
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <LclyLogo className="h-4 w-auto" />
        </div>
      </header>

      <div className="container relative mx-auto flex max-w-7xl gap-10 px-6 py-8">
        <aside className="sticky top-20 hidden h-[calc(100vh-80px)] w-64 shrink-0 lg:block">
          <ScrollArea className="h-full py-6 pr-6">
            <div className="mb-4">
              <h4 className="mb-1 text-sm font-medium">On this page</h4>
              <TableOfContents source={source} />
            </div>
          </ScrollArea>
        </aside>
        <Separator orientation="vertical" className="hidden lg:block" />
        <main className="w-full min-w-0">
          <div className="mx-auto max-w-3xl space-y-8">
            <WhitepaperContent source={source} eli5Source={eli5Source} />
          </div>
        </main>
      </div>
    </div>
  );
}
