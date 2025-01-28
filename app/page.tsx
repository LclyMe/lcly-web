"use client";

import { useState, useEffect } from "react";
import LclyLogo from "@/components/logos/LclyLogo";
import { WaitlistForm } from "@/components/waitlist-form";
import {
  Building2,
  Users2,
  Vote,
  Newspaper,
  Shield,
  School,
  Heart,
  SquareUserRound,
  HelpCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { PostcodeSearch } from "@/components/postcode-search";
import { MapButton } from "@/components/map-button";
import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UKMap } from "@/components/maps/uk-map";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled
            ? "bg-background/60 backdrop-blur-md shadow-sm pt-4"
            : "pt-10"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-row items-center justify-between sm:h-9 mb-4 gap-4"
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <Image
              src="/union-flag.png"
              alt="Union Flag"
              width={48}
              height={48}
              className="h-8 w-8 sm:h-9 sm:w-9 rounded-full"
              priority
            />
            <LclyLogo className="h-5 sm:h-7 w-auto text-black/90 dark:text-white -mb-1.5" />
          </div>
          <div className="flex items-center gap-2">
            <Link href="/about">
              <Button variant="secondary" size="icon">
                <HelpCircle className="h-4 w-4" />
              </Button>
            </Link>
            <MapButton />
            <LoginButton />
          </div>
        </motion.div>
      </header>

      {/* Features Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl flex flex-col lg:flex-row lg:max-w-none lg:items-center lg:justify-between lg:gap-8 mt-16 lg:mt-0 h-[75dvh] lg:h-[100dvh]"
        >
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="flex items-center gap-2 text-xs leading-7 bg-primary/5 font-semibold text-primary px-3 rounded-full self-start border border-primary/10 text-foreground/60">
              <div className="w-2 h-2 bg-[#0ea5e9]/75 rounded-full" /> Join the
              UK Localverse
            </h2>
            <p
              className="mt-6 text-5xl font-bold tracking-tight text-foreground sm:text-4xl"
              style={{ fontSize: "2.5rem" }}
            >
              Your Local Community Hub
            </p>
            <p className="mt-2 text-lg leading-8 text-muted-foreground">
              Lcly is an Free &amp; Open Source project, building digital
              infrastructure for local communities. Find your local community or
              if you&apos;re a developer come build Lcly with us (
              <a
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/LclyMe/lcly-web"
              >
                Github
              </a>
              ).
            </p>
            <div className="mt-6">
              <PostcodeSearch />
              <div className="mt-6 flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[
                    "/avatars/amy.png",
                    "/avatars/callum.png",
                    "/avatars/beth.png",
                    "/avatars/seth.png",
                  ].map((url) => (
                    <div
                      key={url}
                      className="inline-block h-9 w-9 rounded-full ring-2 ring-background"
                    >
                      <Image
                        src={url}
                        alt={`Community member`}
                        width={38}
                        height={38}
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Join 1000s building their local community
                </p>
              </div>
            </div>
          </div>
          <div className="hidden lg:block lg:w-[45%]">
            <UKMap />
          </div>
        </motion.div>
        <div className="mx-auto max-w-2xl sm:mt-20 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-6 sm:gap-y-10 lg:max-w-none lg:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-start"
            >
              <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-0">
                <div className="rounded-lg bg-primary/10 p-2 flex-shrink-0">
                  <Users2 className="h-6 w-6 text-primary" />
                </div>
                <dt className="mt-0 sm:mt-4 font-semibold text-foreground">
                  Connect with Neighbours
                </dt>
              </div>
              <dd className="mt-2 leading-7 text-muted-foreground">
                Build meaningful connections with people in your area, organize
                local events, and help each other out.
              </dd>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-start"
            >
              <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-0">
                <div className="rounded-lg bg-primary/10 p-2 flex-shrink-0">
                  <Newspaper className="h-6 w-6 text-primary" />
                </div>
                <dt className="mt-0 sm:mt-4 font-semibold text-foreground">
                  Local News
                </dt>
              </div>
              <dd className="mt-2 leading-7 text-muted-foreground">
                Get updates on what's happening in your area, from community
                events to important local developments.
              </dd>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col items-start"
            >
              <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-0">
                <div className="rounded-lg bg-primary/10 p-2 flex-shrink-0">
                  <SquareUserRound className="h-6 w-6 text-primary" />
                </div>
                <dt className="mt-0 sm:mt-4 font-semibold text-foreground">
                  Community Leadership
                </dt>
              </div>
              <dd className="mt-2 leading-7 text-muted-foreground">
                Become a community leader and help shape the future of your
                local community.
              </dd>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col items-start"
            >
              <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-0">
                <div className="rounded-lg bg-primary/10 p-2 flex-shrink-0">
                  <Vote className="h-6 w-6 text-primary" />
                </div>
                <dt className="mt-0 sm:mt-4 font-semibold text-foreground">
                  Local Democracy
                </dt>
              </div>
              <dd className="mt-2 leading-7 text-muted-foreground">
                Stay informed about local elections, participate in community
                decisions, and make your voice heard.
              </dd>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-col items-start"
            >
              <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-0">
                <div className="rounded-lg bg-primary/10 p-2 flex-shrink-0">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <dt className="mt-0 sm:mt-4 font-semibold text-foreground">
                  Community Projects
                </dt>
              </div>
              <dd className="mt-2 leading-7 text-muted-foreground">
                Start or join in with local improvement projects, from
                neighborhood clean-ups to community gardens.
              </dd>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1 }}
              className="flex flex-col items-start"
            >
              <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-0">
                <div className="rounded-lg bg-primary/10 p-2 flex-shrink-0">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <dt className="mt-0 sm:mt-4 font-semibold text-foreground">
                  Community Safety
                </dt>
              </div>
              <dd className="mt-2 leading-7 text-muted-foreground">
                Stay safe and informed with crime alerts, emergency resources,
                or start a community protection group.
              </dd>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="flex flex-col items-start"
            >
              <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-0">
                <div className="rounded-lg bg-primary/10 p-2 flex-shrink-0">
                  <School className="h-6 w-6 text-primary" />
                </div>
                <dt className="mt-0 sm:mt-4 font-semibold text-foreground">
                  Local Education
                </dt>
              </div>
              <dd className="mt-2 leading-7 text-muted-foreground">
                Find local learning resources, activities, or start a community
                home schooling group.
              </dd>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.4 }}
              className="flex flex-col items-start"
            >
              <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-0">
                <div className="rounded-lg bg-primary/10 p-2 flex-shrink-0">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <dt className="mt-0 sm:mt-4 font-semibold text-foreground">
                  Local Charity
                </dt>
              </div>
              <dd className="mt-2 leading-7 text-muted-foreground">
                Find help or volunteer at local charities and community support
                groups.
              </dd>
            </motion.div>
          </dl>
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto mt-12 max-w-7xl sm:mt-40 px-6 lg:px-8"
      >
        <div
          className="relative isolate overflow-hidden bg-primary px-6 py-24 shadow-2xl rounded-3xl sm:px-24"
          style={{
            backgroundImage: "url('/images/london-map-dark.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/20 dark:bg-black/50" />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Join the UK Localverse
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-lg leading-8 text-white/80">
              Join our waitlist and we'll let you know when we launch in your
              area.
            </p>
            <div className="mt-10 flex justify-center">
              <WaitlistForm lightMode />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-32 sm:mt-40"
      >
        <div className="mx-auto max-w-7xl px-6 pb-8 lg:px-8">
          <div className="border-t border-border pt-8">
            <p className="text-sm leading-5 text-muted-foreground">
              &copy; {new Date().getFullYear()} Lcly. Build Lcly with us (
              <a
                href="https://github.com/LclyMe/lcly-web"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
              ).
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
