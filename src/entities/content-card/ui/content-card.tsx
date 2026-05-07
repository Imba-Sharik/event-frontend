import Image, { type StaticImageData } from "next/image";

import { Pill } from "@/shared/ui/pill";
import { cn } from "@/shared/lib/utils";

export type ContentCardSpan = 3 | 4 | 6 | 8;

export type ContentCardTag = {
  text: string;
  variant?: "default" | "accent";
};

export type ContentCardImagePosition =
  | "center"
  | "top"
  | "bottom"
  | "left"
  | "right";

export interface ContentCardProps {
  image: StaticImageData;
  imageAlt: string;
  title: string;
  date?: string;
  tag?: ContentCardTag;
  subtitle?: string;
  subtitleAccent?: boolean;
  span?: ContentCardSpan;
  priority?: boolean;
  imagePosition?: ContentCardImagePosition;
  className?: string;
}

const objectPositionClass: Record<ContentCardImagePosition, string> = {
  center: "object-center",
  top: "object-top",
  bottom: "object-bottom",
  left: "object-left",
  right: "object-right",
};

const aspectBySpan: Record<ContentCardSpan, string> = {
  3: "288 / 296",
  4: "392 / 372",
  6: "600 / 372",
  8: "808 / 372",
};

const colSpanBySpan: Record<ContentCardSpan, string> = {
  3: "col-span-6 sm:col-span-4 lg:col-span-3",
  4: "col-span-6 lg:col-span-4",
  6: "col-span-12 lg:col-span-6",
  8: "col-span-12 lg:col-span-8",
};

const titleClass = "text-sm sm:text-base lg:text-[18px]";

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
  imagePosition = "center",
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
        className="relative overflow-hidden rounded-2xl bg-zinc-100"
        style={{ aspectRatio: aspectBySpan[span] }}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={cn("object-cover", objectPositionClass[imagePosition])}
          priority={priority}
          placeholder="blur"
        />
        {hasOverlay && (
          <div className="pointer-events-none absolute inset-x-4 top-4 flex items-center gap-2">
            {date && <Pill>{date}</Pill>}
            {tag && (
              <Pill variant={tag.variant === "accent" ? "accent" : "default"}>
                {tag.text}
              </Pill>
            )}
          </div>
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
