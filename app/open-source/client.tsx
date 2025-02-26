"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface OpenSourceProject {
  name: string;
  description: string;
  logo: string;
  website: string;
  github?: string;
  category: "UI" | "Data" | "Utilities" | "Framework" | "Visualization";
}

interface OpenSourcePageClientProps {
  projects: OpenSourceProject[];
  groupedProjects: Record<string, OpenSourceProject[]>;
  categoryOrder: string[];
}

export function OpenSourcePageClient({
  projects,
  groupedProjects,
  categoryOrder,
}: OpenSourcePageClientProps) {
  return (
    <>
      <div className="relative">
        <Link href="/">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full absolute -top-14 left-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Our Open Source Stack
        </h1>
        <p className="text-xl text-muted-foreground text-center mb-12">
          Lcly is built on the shoulders of these amazing open source projects.
          We're grateful for the incredible work of these communities.
        </p>

        {categoryOrder.map(
          (category) =>
            groupedProjects[category] && (
              <div key={category} className="mb-16">
                <h2 className="text-2xl font-semibold mb-6">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {groupedProjects[category].map((project) => (
                    <motion.div
                      key={project.name}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center gap-4">
                          <div className="w-12 h-12 relative flex-shrink-0 overflow-hidden">
                            <Image
                              src={project.logo}
                              alt={`${project.name} logo`}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <CardTitle>{project.name}</CardTitle>
                            <CardDescription>
                              {project.category}
                            </CardDescription>
                          </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="text-muted-foreground">
                            {project.description}
                          </p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href={project.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2"
                            >
                              <ExternalLink className="h-4 w-4" />
                              Website
                            </a>
                          </Button>
                          {project.github && (
                            <Button variant="outline" size="sm" asChild>
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2"
                              >
                                <Github className="h-4 w-4" />
                                GitHub
                              </a>
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )
        )}

        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Want to contribute to Lcly? We're open source too!
          </p>
          <Button asChild>
            <a
              href="https://github.com/LclyMe/lcly-web"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="h-5 w-5" />
              Contribute to Lcly
            </a>
          </Button>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="text-center text-muted-foreground text-sm mt-24"
      >
        <p>
          &copy; {new Date().getFullYear()} Lcly. Build Lcly with us (
          <a
            href="https://github.com/LclyMe/lcly-web"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Github
          </a>
          ).
        </p>
      </motion.footer>
    </>
  );
}
