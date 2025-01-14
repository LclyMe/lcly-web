"use client";

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
  Map,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PostcodeSearch } from "@/components/postcode-search";
import { MapButton } from "@/components/map-button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="pt-10 md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-7xl px-6 lg:px-8 flex items-center justify-between sm:h-9 mb-8 sm:mb-14 gap-4"
        >
          <div className="flex items-center gap-4">
            <Image
              src="/union-flag.png"
              alt="Union Flag"
              width={48}
              height={48}
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full"
            />
            <LclyLogo className="h-6 sm:h-8 w-auto text-black/90 -mb-1.5" />
          </div>
          <div>
            <MapButton />
          </div>
        </motion.div>
      </header>

      {/* Features Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl"
        >
          <h2 className="text-base font-semibold leading-7 text-primary/60">
            Join the UK Localverse
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to engage with your local community
          </p>
          <p className="mt-2 text-lg leading-8 text-muted-foreground">
            Lcly is an Open Source project building digital infrastructure for
            local communities. Join the waitlist or if you&apos;re a developer
            come build Lcly with us (
            <a className="underline" href="https://github.com/lcly/contribute">
              Github
            </a>
            ).
          </p>
          <div className="mt-6">
            <PostcodeSearch />
          </div>
        </motion.div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
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
          <div className="absolute inset-0 bg-black/20" />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              Join the UK Localverse
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-lg leading-8 text-primary-foreground/80">
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
              <a href="https://github.com/lcly/contribute">Github</a>
              ).
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
