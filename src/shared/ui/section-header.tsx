"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

export interface SectionHeaderTab {
  value: string;
  label: string;
}

export interface SectionHeaderProps {
  title: string;
  tabs?: SectionHeaderTab[];
  onTabChange?: (value: string) => void;
  seeAllHref?: string;
  seeAllLabel?: string;
  className?: string;
}

export function SectionHeader({
  title,
  tabs,
  onTabChange,
  seeAllHref,
  seeAllLabel = "Смотреть все",
  className,
}: SectionHeaderProps) {
  const hasTabs = tabs && tabs.length > 0;

  return (
    <div className={cn("flex flex-wrap items-end gap-x-8 gap-y-3", className)}>
      <h2 className="font-display text-4xl font-bold text-zinc-900">
        {title}
      </h2>
      {hasTabs && (
        <div className="flex items-center gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => onTabChange?.(tab.value)}
              className="text-[21px] font-normal text-black opacity-20"
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}
      {seeAllHref && (
        <Link
          href={seeAllHref}
          className={cn(
            buttonVariants({ variant: "pill", size: "pill" }),
            "ml-auto",
          )}
        >
          {seeAllLabel}
          <ArrowRight data-icon="inline-end" className="size-4" />
        </Link>
      )}
    </div>
  );
}
