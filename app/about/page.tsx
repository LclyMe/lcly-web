"use client";

import { WorldMap } from "@/components/maps/world-map";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeftIcon, GitBranch, Heart, Lock, Server } from "lucide-react";
import Link from "next/link";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const features = [
  {
    title: "Open Source",
    description: "The entire platform is open source, it always will be.",
    icon: GitBranch,
  },
  {
    title: "Self-Hostable",
    description:
      "You can self-host your own instance of Lcly, so you own everything.",
    icon: Server,
  },
  {
    title: "Non-Profit",
    description:
      "Public infrastructure should never be a profit making venture.",
    icon: Heart,
  },
  {
    title: "Privacy First",
    description:
      "We will do everything we can to protect your privacy and personal data.",
    icon: Lock,
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
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
              className="rounded-full absolute top-0 left-0"
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
          {/* <Image
            src="/images/london-map-dark.png"
            alt="London Map"
            fill
            className="object-cover"
          /> */}
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
          {/* <div className="absolute inset-0 bg-black/20" /> */}
          {/* <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Your Local Community Awaits
              </h2>
              <p className="text-lg text-white/80 max-w-xl">
                Join thousands of people discovering their localverse
              </p>
            </div>
          </div> */}
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="bg-gray-50 p-6 rounded-2xl"
            >
              <div className="text-4xl mb-4">
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

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
            <a href="https://github.com/lcly/contribute">Github</a>).
          </p>
        </motion.footer>
      </motion.div>
    </div>
  );
}
