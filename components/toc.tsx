"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/use-mounted";

interface Item {
  title: string;
  url: string;
  items?: Item[];
  depth: number;
}

function getHeadings(source: string) {
  // Get all lines that start with one or more #
  const headingLines = source
    .split("\n")
    .filter((line) => /^#{1,6}\s/.test(line));

  const headings: Item[] = [];
  const stack: Item[] = [];

  headingLines.forEach((line) => {
    const match = line.match(/^(#{1,6})\s(.+)$/);
    if (!match) return;

    const depth = match[1].length;
    const title = match[2];
    const url = `#${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")}`;

    const heading: Item = { title, url, depth };

    // Find the parent heading
    while (stack.length > 0 && stack[stack.length - 1].depth >= heading.depth) {
      stack.pop();
    }

    if (stack.length > 0) {
      const parent = stack[stack.length - 1];
      if (!parent.items) parent.items = [];
      parent.items.push(heading);
    } else {
      headings.push(heading);
    }

    stack.push(heading);
  });

  return headings;
}

interface TreeProps {
  items: Item[];
  activeItem?: string;
  depth?: number;
}

function Tree({ items, activeItem, depth = 1 }: TreeProps) {
  return items?.length ? (
    <ul className={depth === 1 ? "space-y-2" : "mt-2 space-y-2"}>
      {items.map((item, index) => {
        return (
          <li key={index}>
            <a
              href={item.url}
              className={`inline-block no-underline transition-colors hover:text-foreground ${
                activeItem === item.url
                  ? "font-medium text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {item.title}
            </a>
            {item.items?.length ? (
              <Tree
                items={item.items}
                activeItem={activeItem}
                depth={depth + 1}
              />
            ) : null}
          </li>
        );
      })}
    </ul>
  ) : null;
}

interface TableOfContentsProps {
  source: string;
}

export function TableOfContents({ source }: TableOfContentsProps) {
  const [activeItem, setActiveItem] = useState<string>();
  const mounted = useMounted();
  const { theme } = useTheme();

  const headings = getHeadings(source);

  useEffect(() => {
    if (!mounted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveItem(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    const elements = document.querySelectorAll("h2, h3, h4");
    elements.forEach((elem) => observer.observe(elem));

    return () => observer.disconnect();
  }, [mounted]);

  return <Tree items={headings} activeItem={activeItem} />;
}
