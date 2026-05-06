import type { ReactNode } from "react";
import Image from "next/image";

import { cn } from "@/shared/lib/utils";

export type ContentCardSize = "sm" | "md" | "lg";

export type ContentCardTag = {
  text: string;
  variant?: "default" | "accent";
};

export interface ContentCardProps {
  image: string;
  imageAlt: string;
  title: string;
  date?: string;
  tag?: ContentCardTag;
  subtitle?: string;
  subtitleAccent?: boolean;
  size?: ContentCardSize;
  priority?: boolean;
  className?: string;
}

const imageAspectBySize: Record<ContentCardSize, string> = {
  sm: "aspect-[281/294]",
  md: "aspect-[587/371]",
  lg: "aspect-[792/371]",
};

const titleClassBySize: Record<ContentCardSize, string> = {
  sm: "text-[18px]",
  md: "text-[21px]",
  lg: "text-[21px]",
};

function PillShape({
  variant = "default",
  children,
}: {
  variant?: "default" | "accent";
  children: ReactNode;
}) {
  return (
    <span className="relative inline-flex h-6.5 items-center px-3">
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 rounded-full backdrop-blur-[10px]",
          variant === "accent" ? "bg-brand/55" : "bg-neutral-500/30",
        )}
      />
      {/* invisible text reserves the same width as the visible label */}
      <span aria-hidden="true" className="invisible font-open-sans text-xs font-semibold">
        {children}
      </span>
    </span>
  );
}

function PillLabel({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-6.5 items-center px-3 font-open-sans text-xs font-semibold text-white">
      {children}
    </span>
  );
}

export function ContentCard({
  image,
  imageAlt,
  title,
  date,
  tag,
  subtitle,
  subtitleAccent = false,
  size = "md",
  priority = false,
  className,
}: ContentCardProps) {
  const hasOverlay = Boolean(date || tag);

  return (
    <article className={cn("flex h-full flex-col gap-3", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl bg-zinc-100",
          imageAspectBySize[size],
        )}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
          priority={priority}
        />
        {hasOverlay && (
          <>
            <div className="pointer-events-none absolute inset-x-4 top-4 flex items-center gap-2">
              {date && <PillShape>{date}</PillShape>}
              {tag && (
                <PillShape
                  variant={tag.variant === "accent" ? "accent" : "default"}
                >
                  {tag.text}
                </PillShape>
              )}
            </div>
            <div className="pointer-events-none absolute inset-x-4 top-4 flex items-center gap-2">
              {date && <PillLabel>{date}</PillLabel>}
              {tag && <PillLabel>{tag.text}</PillLabel>}
            </div>
          </>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <h3
          className={cn(
            "font-open-sans font-normal leading-snug text-black",
            titleClassBySize[size],
          )}
        >
          {title}
        </h3>
        {subtitle && (
          <p
            className={cn(
              "mt-auto font-open-sans text-xs font-semibold",
              subtitleAccent ? "text-brand" : "text-black/26",
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
    </article>
  );
}
