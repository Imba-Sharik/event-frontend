import type { ReactNode } from "react";
import Image from "next/image";

import { cn } from "@/shared/lib/utils";

export type ContentCardSpan = 3 | 4 | 6 | 8;

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
  span?: ContentCardSpan;
  priority?: boolean;
  className?: string;
}

const aspectBySpan: Record<ContentCardSpan, string> = {
  3: "aspect-[288/296]",
  4: "aspect-[392/372]",
  6: "aspect-[600/372]",
  8: "aspect-[808/372]",
};

const colSpanBySpan: Record<ContentCardSpan, string> = {
  3: "col-span-6 sm:col-span-4 lg:col-span-3",
  4: "col-span-6 lg:col-span-4",
  6: "col-span-12 lg:col-span-6",
  8: "col-span-12 lg:col-span-8",
};

const titleClass = "text-[18px]";

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
      <span aria-hidden="true" className="caption invisible">
        {children}
      </span>
    </span>
  );
}

function PillLabel({ children }: { children: ReactNode }) {
  return (
    <span className="caption inline-flex h-6.5 items-center px-3 text-white">
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
  span = 4,
  priority = false,
  className,
}: ContentCardProps) {
  const hasOverlay = Boolean(date || tag);

  return (
    <article
      className={cn(
        "flex h-full flex-col gap-3",
        colSpanBySpan[span],
        className,
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl bg-zinc-100",
          aspectBySpan[span],
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
            "max-w-[95%] font-normal leading-snug text-black",
            titleClass,
          )}
        >
          {title}
        </h3>
        {subtitle && (
          <p
            className={cn(
              "caption mt-auto",
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
