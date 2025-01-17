"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  ArrowLeftIcon,
  Plus,
  Globe,
  Lock,
  MoreVertical,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Timeline } from "@/components/ui/timeline";
import { format } from "date-fns";
import { useThoughts } from "@/hooks/use-thoughts";
import type { Thought } from "@/types/thoughts";
import { EmptyState } from "@/components/ui/empty-state";
import { FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Helper function to group thoughts by date
type GroupedThoughts = {
  title: string;
  content: React.ReactNode;
}[];

type ThoughtsByDate = {
  [date: string]: Thought[];
};

const groupThoughtsByDate = (
  thoughts: Thought[],
  onDelete: (id: number) => void
): GroupedThoughts => {
  const grouped = thoughts.reduce((acc: ThoughtsByDate, thought: Thought) => {
    const date = format(new Date(thought.created_at), "dd MMM, yyyy");

    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(thought);
    return acc;
  }, {});

  return Object.entries(grouped).map(
    ([date, thoughts]: [string, Thought[]]) => ({
      title: date,
      content: (
        <div className="space-y-4">
          {thoughts.map((thought: Thought) => (
            <Link
              href={`/thoughts/${thought.id}`}
              key={thought.id}
              className="block transition-opacity hover:opacity-80"
            >
              <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium mb-1">{thought.title}</h3>
                    <span className="text-sm text-muted-foreground">
                      {new Date(thought.created_at).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={thought.is_public ? "default" : "secondary"}
                    >
                      {thought.is_public ? "Public" : "Private"}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-gray-100"
                        >
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {thought.is_public && (
                          <Link href={`/thoughts/public/${thought.id}`}>
                            <DropdownMenuItem>
                              <Globe className="h-4 w-4 mr-2" />
                              View Public
                            </DropdownMenuItem>
                          </Link>
                        )}
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => onDelete(thought.id)}
                        >
                          <Trash className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <p className="text-sm md:text-base whitespace-pre-wrap line-clamp-3">
                  {thought.content}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ),
    })
  );
};

export default function ThoughtsPage() {
  const { user, loading: authLoading } = useAuth();
  const { thoughts, isLoading, error, deleteThought } = useThoughts();
  const router = useRouter();

  if (authLoading || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">Error loading thoughts: {error.message}</p>
      </div>
    );
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteThought(id);
    } catch (error) {
      console.error("Failed to delete thought:", error);
    }
  };

  const timelineData = groupThoughtsByDate(thoughts, handleDelete);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="container mb-8 max-w-3xl mx-auto">
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="rounded-full mb-4">
              <ArrowLeftIcon className="h-4 w-4" />
            </Button>
          </Link>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center"
          >
            <h1 className="text-4xl font-bold">My Thoughts</h1>
            <Link href="/thoughts/new">
              <Button size="icon" className="rounded-full">
                <Plus className="h-6 w-6" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Empty State */}
        {thoughts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl"
          >
            <EmptyState
              title="No thoughts yet"
              description="Start capturing your thoughts by clicking the plus button above. You can keep them private or share them with others."
              icons={[FileText, Lock, Globe]}
              action={{
                label: "Add Thought",
                onClick: () => router.push("/thoughts/new"),
              }}
            />
          </motion.div>
        )}

        {/* Timeline */}
        {thoughts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <Timeline data={timelineData} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
