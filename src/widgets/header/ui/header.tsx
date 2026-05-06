import { Container } from "@/shared/ui/container";

export function Header() {
  return (
    <header className="border-b border-dashed border-zinc-300">
      <Container className="flex h-16 items-center justify-center text-sm text-zinc-400">
        [ widgets/header ] — лого, навигация, кнопка «Войти»
      </Container>
    </header>
  );
}
