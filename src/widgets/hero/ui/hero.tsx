import { Container } from "@/shared/ui/container";

export function Hero() {
  return (
    <section className="border-b border-dashed border-zinc-300">
      <Container className="flex h-80 items-center justify-center text-sm text-zinc-400">
        [ widgets/hero ] — большой баннер-слайдер с заглавной публикацией и пагинацией
      </Container>
    </section>
  );
}
