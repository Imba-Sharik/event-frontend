import { Container } from "@/shared/ui/container";

export function ConcertsSection() {
  return (
    <section className="border-b border-dashed border-zinc-300">
      <Container className="flex h-64 items-center justify-center text-sm text-zinc-400">
        [ widgets/concerts-section ] — «Концерты»: фильтры (Рэп / Поп / Классика) + 3 карточки
      </Container>
    </section>
  );
}
