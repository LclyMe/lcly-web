"use client";

import { Database } from "@/types/database.types";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { UserAvatar } from "../user-avatar";

type Thought = Database["public"]["Tables"]["thoughts"]["Row"];
type PublicUser = Database["public"]["Views"]["public_users"]["Row"];

interface ThoughtCardProps {
  thought: Thought;
  author?: PublicUser;
  showAuthor?: boolean;
}

function clipContent(content: string, maxLength: number = 280) {
  if (content.length <= maxLength) return content;
  return content.slice(0, maxLength).trim() + "...";
}

export function ThoughtCard({
  thought,
  author,
  showAuthor = true,
}: ThoughtCardProps) {
  const thoughtUrl = `/thoughts/public/${thought.id}`;

  return (
    <Link href={thoughtUrl}>
      <div className="py-4 px-3 border-t border-foreground/10 hover:bg-muted/50 transition-colors cursor-pointer">
        <div>
          <div className="flex items-center justify-between">
            {thought.title && (
              <h2 className="text-lg font-base">{thought.title}</h2>
            )}
            <span className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(thought.created_at), {
                addSuffix: true,
              })}
            </span>
          </div>

          <p className="text-foreground/90 mt-2 whitespace-pre-line">
            {clipContent(thought.content)}
          </p>

          {thought.images && thought.images.length > 0 && (
            <div
              className={`mt-4 grid gap-2 ${
                thought.images.length > 1
                  ? thought.images.length === 2
                    ? "grid-cols-2"
                    : thought.images.length === 3
                    ? "grid-cols-3"
                    : "grid-cols-4"
                  : "grid-cols-1"
              }`}
            >
              {thought.images.slice(0, 4).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thought image ${index + 1}`}
                  className="w-full h-48 object-cover rounded-xl"
                />
              ))}
              {thought.images.length > 4 && (
                <div className="relative col-span-4 mt-2 overflow-x-auto">
                  <div className="flex gap-2">
                    {thought.images.slice(4).map((image, index) => (
                      <img
                        key={index + 4}
                        src={image}
                        alt={`Thought image ${index + 5}`}
                        className="w-48 h-48 object-cover rounded-xl flex-shrink-0"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {showAuthor && author && (
            <div
              className="flex items-center mt-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Link
                href={`/u/${author.username}`}
                className="flex items-center space-x-2 hover:underline"
              >
                <UserAvatar
                  src={author.avatar || undefined}
                  name={author.display_name || undefined}
                  className="h-7 w-7"
                />
                <span className="text-sm font-medium">
                  {author.display_name || author.username}
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
