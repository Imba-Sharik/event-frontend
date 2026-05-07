import type { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

export type PillVariant = "default" | "accent";

export interface PillProps {
  children: ReactNode;
  variant?: PillVariant;
  className?: string;
}

export function Pill({ children, variant = "default", className }: PillProps) {
  return (
    <span
      className={cn(
        "relative inline-flex h-6 items-center whitespace-nowrap px-3",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 rounded-full backdrop-blur-[10px]",
          variant === "accent" ? "bg-brand/55" : "bg-neutral-500/30",
        )}
      />
      <span className="caption relative text-white">{children}</span>
    </span>
  );
}
