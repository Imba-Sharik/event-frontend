"use client";

import Image from "next/image";
import { useCallback, useState, useSyncExternalStore } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/shared/ui/carousel";
import { Container } from "@/shared/ui/container";
import { Pill } from "@/shared/ui/pill";
import { images } from "@/shared/lib/images";
import { cn } from "@/shared/lib/utils";

const slides = [
  {
    image: images.heroWomanGreen,
    date: "12 апреля",
    title: "Как изменилась event-индустрия с начала нулевых?",
  },
  {
    image: images.womanMonsteraLeaf,
    date: "10 апреля",
    title: "Предметы искусства XX века: новый взгляд",
  },
  {
    image: images.burjAlArabDubai,
    date: "8 апреля",
    title: "Дубай как новая столица премиальных событий",
  },
  {
    image: images.manSuitPortraitLarge,
    date: "5 апреля",
    title: "Дмитрий Лапатин о новом old money",
  },
];

export function Hero() {
  const [api, setApi] = useState<CarouselApi>();

  const subscribeToApi = useCallback(
    (callback: () => void) => {
      if (!api) return () => {};
      api.on("select", callback);
      api.on("reInit", callback);
      return () => {
        api.off("select", callback);
        api.off("reInit", callback);
      };
    },
    [api],
  );

  const current = useSyncExternalStore(
    subscribeToApi,
    () => api?.selectedScrollSnap() ?? 0,
    () => 0,
  );

  return (
    <section className="py-6">
      <Container>
        <div className="relative">
          <Carousel
            setApi={setApi}
            opts={{ loop: true }}
            className="overflow-hidden rounded-3xl"
          >
            <CarouselContent className="ml-0">
              {slides.map((slide, index) => (
                <CarouselItem key={index} className="pl-0">
                  <div className="relative aspect-24/9 w-full">
                    <Image
                      src={slide.image}
                      alt=""
                      fill
                      className="object-cover"
                      priority={index === 0}
                      sizes="(min-width: 1264px) 1264px, 100vw"
                      placeholder="blur"
                    />
                    <Pill className="absolute left-6 top-6">{slide.date}</Pill>
                    <h1 className="absolute inset-x-0 bottom-16 mx-auto max-w-2xl text-center font-display text-4xl font-bold text-white">
                      {slide.title}
                    </h1>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="absolute inset-x-0 bottom-8 flex justify-center gap-1">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => api?.scrollTo(index)}
                aria-label={`Слайд ${index + 1}`}
                className={cn(
                  "h-1 rounded-full transition-all",
                  index === current ? "w-6 bg-white" : "w-3 bg-white/40",
                )}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
