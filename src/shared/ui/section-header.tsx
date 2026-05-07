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
      <h2 className="font-display text-2xl font-bold text-zinc-900 sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {hasTabs && (
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => onTabChange?.(tab.value)}
              className="text-base font-normal text-black opacity-20 sm:text-lg lg:text-[21px]"
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}
      {seeAllHref && (
        <div className="basis-full sm:ml-auto sm:basis-auto">
          <Link
            href={seeAllHref}
            className={buttonVariants({ variant: "pill", size: "pill" })}
          >
            {seeAllLabel}
            <ArrowRight data-icon="inline-end" className="size-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
