"use client";

import { useState } from "react";
import { Search } from "lucide-react";

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
    iconClassName: "size-4 shrink-0 sm:size-5",
    placeholder: "Например, концерты в Москве",
  },
  {
    id: "exhibitions",
    label: "Выставки",
    Icon: IconGallery,
    iconClassName: "size-4 shrink-0 sm:size-5",
    placeholder: "Например, выставка Айвазовского",
  },
  {
    id: "events",
    label: "Культурные события",
    /** Короткая подпись до `sm`, чтобы три таба помещались в одну строку */
    labelCompact: "События",
    Icon: IconMasks,
    iconClassName: "size-4 shrink-0 sm:size-5",
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
    <section className="pb-10 pt-20 sm:pb-28 sm:pt-40">
      <Container className="flex flex-col items-center gap-4 sm:gap-7">
        <div className="w-full min-w-0">
          <Tabs
            value={category}
            onValueChange={(value) => setCategory(value as CategoryId)}
            className="w-full sm:mx-auto sm:w-max"
          >
            <TabsList
              variant="line"
              className="h-auto w-full flex-nowrap justify-between gap-2 px-0.5 sm:w-fit sm:justify-center sm:gap-x-10 md:gap-x-12"
            >
              {categories.map((cat) => {
                const { id, label, Icon, iconClassName: iconCls } = cat;
                const labelCompact =
                  "labelCompact" in cat ? cat.labelCompact : undefined;
                return (
                  <TabsTrigger
                    key={id}
                    value={id}
                    className={cn(
                      "h-auto min-h-10 shrink-0 gap-1 px-0 py-1 text-xs font-medium text-zinc-300 after:hidden sm:min-h-0 sm:gap-2 sm:py-0 sm:text-sm sm:font-semibold",
                      "touch-manipulation hover:text-zinc-500 data-active:text-foreground cursor-pointer",
                      "whitespace-nowrap",
                    )}
                  >
                    {id === "events" ? (
                      <span className="inline-flex size-4 shrink-0 items-center justify-center overflow-visible sm:h-5 sm:w-6">
                        <IconMasks
                          aria-hidden
                          className="size-4 shrink-0 sm:size-5"
                        />
                      </span>
                    ) : (
                      <Icon aria-hidden className={iconCls} />
                    )}
                    {labelCompact ? (
                      <>
                        <span className="sm:hidden">{labelCompact}</span>
                        <span className="hidden sm:inline">{label}</span>
                      </>
                    ) : (
                      label
                    )}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
        </div>

        <div
          className={cn(
            "grid w-full max-w-[840px] grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-full border border-search-field-border bg-white px-3 py-1",
            "sm:gap-4 sm:px-4",
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
              "h-12 min-h-0 w-full min-w-0 border-0 bg-transparent px-0 py-0! pr-0! pl-2! sm:pl-4! text-[14px] shadow-none outline-none sm:h-14 sm:pl-4",
              "[&::-webkit-search-cancel-button]:appearance-none",
              "placeholder:text-zinc-400",
              "focus-visible:border-0 focus-visible:ring-0",
            )}
          />
          <Button
            type="button"
            variant="pill"
            size="pill"
            className="h-10 min-w-10 shrink-0 px-4 text-[14px] sm:h-9.5 sm:min-w-0 cursor-pointer"
          >
            <span className="sr-only sm:hidden">Найти</span>
            <Search className="size-5 sm:hidden" aria-hidden />
            <span className="hidden sm:inline">Найти</span>
          </Button>
        </div>
      </Container>
    </section>
  );
}
