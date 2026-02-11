import { cn } from "@/levelup/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  variant?: "default" | "muted";
}

export function Section({
  children,
  id,
  className,
  variant = "default",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 sm:py-24",
        variant === "muted" && "bg-muted/50",
        className
      )}
    >
      {children}
    </section>
  );
}
