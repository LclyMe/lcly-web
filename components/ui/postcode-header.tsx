import { cn } from "@/lib/utils";

interface PostcodeHeaderProps {
  heading: string;
  text: string;
  className?: string;
}

export function PostcodeHeader({
  heading,
  text,
  className,
}: PostcodeHeaderProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <h1 className="text-3xl font-bold tracking-tight">{heading}</h1>
      <p className="text-lg text-muted-foreground">{text}</p>
    </div>
  );
}
