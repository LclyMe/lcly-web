"use client";

import { useState, useEffect } from "react";
import LclyLogo from "@/components/logos/LclyLogo";
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
  Rocket,
  FileText,
  Twitter,
  Instagram as InstagramIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { PostcodeSearch } from "@/components/postcode-search";
import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UKMap } from "@/components/maps/uk-map";
import { FeatureGrid } from "@/components/features/feature-grid";
import GithubIcon from "@/components/icons/brands/Github";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/language-switcher";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations("common");

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
            ? "bg-background/60 backdrop-blur-md shadow-sm pt-3 md:pt-4"
            : "pt-10"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-row items-center justify-between sm:h-9 mb-3 md:mb-4 gap-4"
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
            <LclyLogo className="h-5 sm:h-6 w-auto text-black/90 dark:text-white -mb-1.5" />
          </div>
          <div className="flex items-center gap-3 md:gap-2">
            <Link href="/about">
              <Button variant="secondary" size="icon">
                <HelpCircle className="h-4 w-4" />
              </Button>
            </Link>
            <LanguageSwitcher />
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
          className="max-w-2xl flex flex-col lg:flex-row lg:max-w-none lg:items-center lg:justify-between lg:gap-8 mt-16 lg:mt-0 h-[90vh] md:h-[100dvh]"
        >
          <div className="flex-1 flex flex-col justify-center z-10 lg:mt-20">
            <a
              href="https://github.com/LclyMe"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm leading-7 bg-primary/5 backdrop-blur-sm font-regular text-primary px-3 py-1 rounded-full self-start border border-primary/10 text-foreground/60 hover:bg-primary/10 transition-all duration-300"
            >
              <GithubIcon className="w-5 h-5" />
              {t("github")}
            </a>
            <h1 className="mt-6 text-4xl md:text-6xl tracking-tight max-w-xl font-regular text-left text-foreground">
              {t("hero.title")}
            </h1>
            <p className="mt-2 text-lg leading-8 text-muted-foreground">
              <span className="hidden md:inline mr-1">
                {t("hero.description")}
              </span>
              <span className="md:hidden">{t("hero.description_mobile")}</span>
            </p>
            <div className="mt-6">
              <PostcodeSearch className="backdrop-blur-sm" />
              <div className="mt-7 flex items-center gap-1">
                <div className="flex -space-x-2">
                  {[
                    "/avatars/amy.png",
                    "/avatars/callum.png",
                    "/avatars/beth.png",
                    "/avatars/seth.png",
                  ].map((url) => (
                    <div
                      key={url}
                      className="inline-block h-8 w-8 md:h-9 md:w-9 rounded-full ring-2 ring-background"
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
                <p className="text-sm dark:text-muted-foreground bg-background/10 backdrop-blur-sm rounded-full px-2 py-1">
                  {t("hero.neighbors")}
                </p>
              </div>

              {/* New Documentation Links */}
              {false && (
                <div className="mt-8 flex gap-4">
                  <Link href="/roadmap" className="w-[35%] md:w-[25%]">
                    <div className="hover:bg-muted bg-primary/5 backdrop-blur-sm rounded-2xl aspect-square p-4 flex justify-between flex-col transition-all duration-300">
                      <div className="flex justify-between items-start">
                        <Rocket className="w-6 h-6 md:w-8 md:h-8 stroke-1.5 text-primary mb-6" />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-base md:text-lg tracking-tight font-regular">
                          Our Roadmap
                        </h3>
                      </div>
                    </div>
                  </Link>
                  <Link href="/whitepaper" className="w-[35%] md:w-[25%]">
                    <div className="hover:bg-muted bg-primary/5 backdrop-blur-sm rounded-2xl aspect-square p-4 flex justify-between flex-col transition-all duration-300">
                      <div className="flex justify-between items-start">
                        <FileText className="w-6 h-6 md:w-8 md:h-8 stroke-1.5 text-primary mb-6" />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-base md:text-lg tracking-tight font-regular">
                          Read the
                          <br /> Whitepaper
                        </h3>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full -z-0 opacity-30 lg:opacity-100 lg:relative lg:w-[45%]">
            <UKMap />
          </div>
        </motion.div>
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <FeatureGrid />
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl sm:mt-40 px-6 lg:px-8">
        <dl className="grid max-w-xl mt-20 lg:mt-20 grid-cols-1 gap-x-8 gap-y-6 sm:gap-y-10 lg:max-w-none lg:grid-cols-4">
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
                {t("benefits.connect.title")}
              </dt>
            </div>
            <dd className="mt-2 leading-7 text-muted-foreground">
              {t("benefits.connect.description")}
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
                {t("benefits.news.title")}
              </dt>
            </div>
            <dd className="mt-2 leading-7 text-muted-foreground">
              {t("benefits.news.description")}
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
                {t("benefits.leadership.title")}
              </dt>
            </div>
            <dd className="mt-2 leading-7 text-muted-foreground">
              {t("benefits.leadership.description")}
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
                {t("benefits.democracy.title")}
              </dt>
            </div>
            <dd className="mt-2 leading-7 text-muted-foreground">
              {t("benefits.democracy.description")}
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
                {t("benefits.projects.title")}
              </dt>
            </div>
            <dd className="mt-2 leading-7 text-muted-foreground">
              {t("benefits.projects.description")}
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
                {t("benefits.safety.title")}
              </dt>
            </div>
            <dd className="mt-2 leading-7 text-muted-foreground">
              {t("benefits.safety.description")}
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
                {t("benefits.education.title")}
              </dt>
            </div>
            <dd className="mt-2 leading-7 text-muted-foreground">
              {t("benefits.education.description")}
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
                {t("benefits.charity.title")}
              </dt>
            </div>
            <dd className="mt-2 leading-7 text-muted-foreground">
              {t("benefits.charity.description")}
            </dd>
          </motion.div>
        </dl>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto mt-8 max-w-7xl sm:mt-40 px-6 lg:px-8"
      >
        <div
          className="relative isolate overflow-hidden border border-border/75 bg-primary px-6 py-24 shadow-2xl rounded-3xl sm:px-24"
          style={{
            backgroundImage: "url('/images/london-map-dark.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/20 dark:bg-black/50" />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t("cta.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-lg leading-8 text-white/80">
              {t("cta.description")}
            </p>
            <div className="mt-10 flex justify-center">
              <Button
                variant="default"
                size="lg"
                className="bg-white text-black"
              >
                {t("cta.button")}
              </Button>
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
          <div className="border-t border-border pt-8 flex flex-row items-center justify-between">
            <p className="text-sm leading-5 text-muted-foreground">
              {t.rich("footer.copyright", { year: new Date().getFullYear() })}
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://twitter.com/LclyMe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/LclyMe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/lcly.me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
