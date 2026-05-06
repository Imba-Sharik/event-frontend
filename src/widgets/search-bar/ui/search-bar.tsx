"use client";

import { useState } from "react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";
import {
  IconGallery,
  IconMasks,
  IconMusic,
} from "@/shared/ui/icons";
import { Input } from "@/shared/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs";

const categories = [
  {
    id: "concerts",
    label: "Концерты",
    Icon: IconMusic,
    iconClassName: "size-[18px] shrink-0 sm:size-5",
    placeholder: "Например, концерты в Москве",
  },
  {
    id: "exhibitions",
    label: "Выставки",
    Icon: IconGallery,
    iconClassName: "size-[18px] shrink-0 sm:size-5",
    placeholder: "Например, выставка Айвазовского",
  },
  {
    id: "events",
    label: "Культурные события",
    Icon: IconMasks,
    iconClassName: "size-[18px] shrink-0 sm:size-5",
    placeholder: "Например, фестивали летом",
  },
] as const;

type CategoryId = (typeof categories)[number]["id"];

export function SearchBar() {
  const [category, setCategory] = useState<CategoryId>("concerts");
  const [query, setQuery] = useState("");

  const activeCategory =
    categories.find((c) => c.id === category) ?? categories[0];

  return (
    <section className="pb-12 pt-24 sm:pb-16 sm:pt-32">
      <Container className="flex flex-col items-center gap-5 sm:gap-7">
        <div className="w-full min-w-0 overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]">
          <div className="flex min-w-full justify-center">
            <Tabs
              value={category}
              onValueChange={(value) => setCategory(value as CategoryId)}
              className="w-max"
            >
              <TabsList
                variant="line"
                className="h-auto justify-center gap-x-5 px-0.5 sm:gap-x-10 md:gap-x-12"
              >
                {categories.map(
                  ({ id, label, Icon, iconClassName: iconCls }) => (
                    <TabsTrigger
                      key={id}
                      value={id}
                      className={cn(
                        "h-auto min-h-11 gap-2 px-0 py-1 text-sm font-semibold text-zinc-300 after:hidden sm:min-h-0 sm:gap-2 sm:py-0",
                        "touch-manipulation hover:text-zinc-500 data-active:text-foreground cursor-pointer",
                        "whitespace-nowrap",
                      )}
                    >
                      {id === "events" ? (
                        <span className="inline-flex h-[18px] w-[22px] shrink-0 items-center justify-center overflow-visible sm:h-5 sm:w-6">
                          <IconMasks
                            aria-hidden
                            className="size-[18px] shrink-0 sm:size-5"
                          />
                        </span>
                      ) : (
                        <Icon aria-hidden className={iconCls} />
                      )}
                      {label}
                    </TabsTrigger>
                  ),
                )}
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div
          className={cn(
            "grid w-full max-w-[840px] grid-cols-[minmax(0,1fr)_minmax(5.75rem,140px)] items-center gap-4 rounded-full border border-search-field-border bg-white px-4 py-1",
            "focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50",
          )}
        >
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={activeCategory.placeholder}
            aria-label="Поисковый запрос"
            className={cn(
              "h-12 min-h-0 w-full min-w-0 border-0 bg-transparent pl-4 pr-0! py-0! text-[14px] md:text-[14px] shadow-none outline-none sm:h-14",
              "[&::-webkit-search-cancel-button]:appearance-none",
              "placeholder:text-zinc-400",
              "focus-visible:border-0 focus-visible:ring-0",
            )}
          />
          <Button
            type="button"
            variant="pill"
            size="pill"
            className="h-11 w-full min-w-0 max-w-[140px] text-[14px] sm:h-9.5 cursor-pointer"
          >
            Найти
          </Button>
        </div>
      </Container>
    </section>
  );
}
