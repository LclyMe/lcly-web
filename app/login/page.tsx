"use client";

import { LoginForm } from "@/components/auth/login-form";
import LclyLogo from "@/components/logos/LclyLogo";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SignUpForm } from "@/components/auth/signup-form";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SocialLogins } from "@/components/auth/social-logins";
import Link from "next/link";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  return (
    <div className="flex min-h-screen sm:p-4">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex w-full flex-col justify-center px-4 sm:w-1/2 sm:px-8 md:px-16 lg:px-24 relative"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute top-6 left-6"
        >
          <Link href="/">
            <Button variant="secondary" size="icon" className="rounded-full">
              <ArrowLeftIcon className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
        <div className="mx-auto w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3 mb-8"
          >
            <Image
              src="/union-flag.png"
              alt="Union Flag"
              width={36}
              height={36}
              className="h-6 w-6 sm:h-8 sm:w-8 rounded-full"
            />
            <LclyLogo className="h-4 sm:h-6 w-auto text-black/90 -mb-1.5" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 text-4xl font-bold tracking-tight"
          >
            {activeTab === "login" ? "Welcome back" : "Join the Localverse"}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            <Tabs
              defaultValue="login"
              value={activeTab}
              onValueChange={(value) =>
                setActiveTab(value as "login" | "signup")
              }
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === "login" ? <LoginForm /> : <SignUpForm />}
                </motion.div>
              </AnimatePresence>
            </Tabs>
            <SocialLogins />
          </motion.div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden sm:block sm:w-1/2 py-6 pr-6"
      >
        <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-lg">
          <Image
            src="/images/london-map-dark.png"
            alt="Authentication background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute bottom-8 left-8 max-w-md text-white"
          >
            <h2 className="text-3xl font-bold">Find your local community 🇬🇧</h2>
            <p className="mt-2 text-lg text-white/80">
              Sign in and start building your localverse.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
