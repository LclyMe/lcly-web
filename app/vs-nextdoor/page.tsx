"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowLeftIcon,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Lock,
  Globe,
  Heart,
  GitBranch,
  Server,
} from "lucide-react";
import Link from "next/link";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

// Comparison table data
const comparisonPoints = [
  {
    feature: "Open Source",
    lcly: { value: true, description: "Fully open source and transparent" },
    nextdoor: {
      value: false,
      description: "Proprietary closed-source platform",
    },
  },
  {
    feature: "Privacy Focus",
    lcly: {
      value: true,
      description: "Privacy-first approach with minimal data collection",
    },
    nextdoor: {
      value: false,
      description: "Collects extensive user data for advertising",
    },
  },
  {
    feature: "Business Model",
    lcly: { value: true, description: "Non-profit, community-focused" },
    nextdoor: { value: false, description: "For-profit, advertising-driven" },
  },
  {
    feature: "Data Ownership",
    lcly: { value: true, description: "Users own their data" },
    nextdoor: {
      value: false,
      description: "Company owns and monetizes user data",
    },
  },
  {
    feature: "Self-Hosting Option",
    lcly: { value: true, description: "Can be self-hosted by communities" },
    nextdoor: { value: false, description: "No self-hosting option" },
  },
  {
    feature: "Local Community Focus",
    lcly: { value: true, description: "Built specifically for UK communities" },
    nextdoor: {
      value: true,
      description: "Supports local communities globally",
    },
  },
  {
    feature: "Advertising",
    lcly: { value: false, description: "No intrusive advertising" },
    nextdoor: { value: true, description: "Ad-supported platform" },
  },
];

// Key benefits of Lcly
const lclyBenefits = [
  {
    title: "Open Source",
    description:
      "The entire platform is open source and always will be, allowing for community contributions and transparency.",
    icon: GitBranch,
  },
  {
    title: "Self-Hostable",
    description:
      "Communities can self-host their own instance of Lcly, ensuring complete control over their data.",
    icon: Server,
  },
  {
    title: "Non-Profit",
    description:
      "We believe public infrastructure should never be a profit-making venture, ensuring decisions are made for communities, not shareholders.",
    icon: Heart,
  },
  {
    title: "Privacy First",
    description:
      "We're committed to protecting your privacy and personal data, with minimal data collection and no data selling.",
    icon: Lock,
  },
  {
    title: "UK Focused",
    description:
      "Built specifically for UK communities, with features tailored to local needs and concerns.",
    icon: Globe,
  },
  {
    title: "Community Owned",
    description:
      "Lcly is built by and for communities, ensuring the platform serves the people who use it.",
    icon: ShieldCheck,
  },
];

export default function NextdoorComparisonPage() {
  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8 max-w-6xl"
      >
        {/* Header with Back Button */}
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
              Lcly vs Nextdoor
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover why Lcly is the better alternative to Nextdoor for UK
              communities, with a focus on privacy, open-source development, and
              community ownership.
            </p>
          </motion.div>
        </div>

        {/* Introduction Section */}
        <motion.div {...fadeIn} className="text-center my-14">
          <div className="flex flex-col gap-8">
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              While Nextdoor has established itself as a popular neighborhood
              platform, Lcly offers a fundamentally different approach to
              connecting local communities. We believe that digital
              infrastructure for communities should be open, transparent, and
              owned by the people who use it.
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Unlike Nextdoor's profit-driven model that monetizes user data and
              attention through advertising, Lcly is built as a non-profit,
              open-source platform that prioritizes community needs and user
              privacy above all.
            </p>
          </div>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-10">
            How We Compare
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-white/5">
                  <th className="p-4 text-left font-semibold">Feature</th>
                  <th className="p-4 text-center font-semibold">Lcly</th>
                  <th className="p-4 text-center font-semibold">Nextdoor</th>
                </tr>
              </thead>
              <tbody>
                {comparisonPoints.map((point, index) => (
                  <tr
                    key={point.feature}
                    className={
                      index % 2 === 0
                        ? "bg-white dark:bg-transparent"
                        : "bg-gray-50 dark:bg-white/5"
                    }
                  >
                    <td className="p-4 font-medium">{point.feature}</td>
                    <td className="p-4">
                      <div className="flex flex-col items-center">
                        {point.lcly.value ? (
                          <CheckCircle2 className="h-6 w-6 text-green-500 mb-2" />
                        ) : (
                          <XCircle className="h-6 w-6 text-red-500 mb-2" />
                        )}
                        <span className="text-sm text-center">
                          {point.lcly.description}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col items-center">
                        {point.nextdoor.value ? (
                          <CheckCircle2 className="h-6 w-6 text-green-500 mb-2" />
                        ) : (
                          <XCircle className="h-6 w-6 text-red-500 mb-2" />
                        )}
                        <span className="text-sm text-center">
                          {point.nextdoor.description}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Key Benefits of Lcly */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center mb-10">
            Why Choose Lcly?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {lclyBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl"
              >
                <div className="text-4xl mb-4">
                  <benefit.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-2">
                Is Lcly completely free to use?
              </h3>
              <p className="text-muted-foreground">
                Yes, Lcly is completely free to use. As a non-profit platform,
                we don't have shareholders to please or revenue targets to hit.
                Our focus is on building a sustainable community platform.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-2">
                How does Lcly make money if it's non-profit?
              </h3>
              <p className="text-muted-foreground">
                Lcly operates on a sustainable funding model through community
                contributions, grants, and optional donations. We believe
                essential community infrastructure shouldn't be driven by profit
                motives.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-2">
                Can I migrate my Nextdoor community to Lcly?
              </h3>
              <p className="text-muted-foreground">
                While we don't have an automated migration tool yet, we're
                working on making it easier for communities to transition. You
                can start by inviting your neighbors to join Lcly and begin
                building your community.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-2">
                How does Lcly protect my privacy?
              </h3>
              <p className="text-muted-foreground">
                Unlike Nextdoor, we collect minimal data, never sell your
                information to advertisers, and give you complete control over
                your privacy settings. Our open-source code means our privacy
                practices are transparent and verifiable.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-3xl font-bold mb-6">
            Ready to Join a Better Community Platform?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Experience the difference of a platform built for communities, not
            profit. Join Lcly today and help build a better digital
            neighborhood.
          </p>
          <Link href="/login">
            <Button size="lg" className="h-12 px-8">
              Join Lcly Now
            </Button>
          </Link>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
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
