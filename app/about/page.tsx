"use client";

import { WorldMap } from "@/components/maps/world-map";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { BenefitsGrid } from "@/components/benefits-grid";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8 max-w-6xl"
      >
        {/* Header */}
        <div className="relative mb-16">
          <Link href="/">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full absolute -top-14 left-0"
            >
              <ArrowLeftIcon className="h-4 w-4" />
            </Button>
          </Link>
          <motion.div {...fadeIn} className="text-center mt-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Building Local Communities
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're on a mission to strengthen local communities across the UK
              by giving local people the tools to connect and thrive together.
            </p>
          </motion.div>
        </div>

        {/* Main Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative h-[200px] md:h-[400px] rounded-3xl overflow-hidden mb-14"
        >
          <WorldMap
            dots={[
              {
                start: {
                  lat: 64.2008,
                  lng: -149.4937,
                }, // Alaska (Fairbanks)
                end: {
                  lat: 34.0522,
                  lng: -118.2437,
                }, // Los Angeles
              },
              {
                start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
                end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
              },
              {
                start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
                end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
              },
              {
                start: { lat: 51.5074, lng: -0.1278 }, // London
                end: { lat: 28.6139, lng: 77.209 }, // New Delhi
              },
              {
                start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
              },
              {
                start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
              },
            ]}
          />
        </motion.div>

        <motion.div {...fadeIn} className="text-center my-14">
          <div className="flex flex-col gap-8">
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              We belive that local people should own and help shape the digital
              infrastructure that runs their communities. Our goal is to build a
              completely open source platform that real people want to use and
              developers can use to build things that have an impact.
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              There are many great open source projects and initiatives that
              share similar goals to us. Unfortunately, these are usually hard
              to use and understand, or only focus on solving a small slice of
              the solution. We want to try a different approach, we want to
              build a platform focused on ease of use, beautiful design and
              trust.
            </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <BenefitsGrid showHeader={false} />

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mb-24"
        >
          <h2 className="text-3xl font-bold mb-6">
            Ready to Join Your Local Community?
          </h2>
          <Link href="/login">
            <Button size="lg" className="h-12 px-8">
              Join now
            </Button>
          </Link>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center text-muted-foreground text-sm"
        >
          <p>
            &copy; {new Date().getFullYear()} Lcly. Build Lcly with us (
            <a
              href="https://github.com/lcly/contribute"
              className="hover:text-foreground transition-colors"
            >
              Github
            </a>
            ).{" "}
            <Link
              href="/open-source"
              className="hover:text-foreground transition-colors"
            >
              Open Source
            </Link>
          </p>
        </motion.footer>
      </motion.div>
    </div>
  );
}
