import { Container } from "@/shared/ui/container";
const CIRCLE_KEYS = ["c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9"];

export function BestSection() {
  return (
    <section className="py-16 md:py-32">
      <Container className="flex flex-col items-center gap-6 py-10 text-sm lg:items-center lg:justify-between lg:gap-8 lg:py-12">
        <div className="w-full min-w-0 text-center pb-4">
          <h2 className="font-display text-[100px] sm:text-[120px] md:text-[186px] font-bold">
            Лучшее
          </h2>
        </div>
        <div
          className="flex w-full min-w-0 flex-1 flex-wrap justify-center gap-6 sm:gap-4 md:gap-5 lg:gap-2"
        >
          {CIRCLE_KEYS.map((key) => (
            <div
              key={key}
              aria-hidden
              className="aspect-square size-36 shrink-0 rounded-full bg-[#d8d8d8]/50 sm:size-40 md:size-48 lg:size-56"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
