import { Container } from "@/shared/ui/container";

export function PeopleSection() {
  return (
    <section className="border-b border-dashed border-zinc-300">
      <Container className="flex h-56 items-center justify-center text-sm text-zinc-400">
        [ widgets/people-section ] — «Люди»: 3 круглые аватарки с подписями
      </Container>
    </section>
  );
}
