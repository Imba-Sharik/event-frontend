import Image from "next/image";
import Link from "next/link";

import { Container } from "@/shared/ui/container";
import { buttonVariants } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

const navLinks = [
  { href: "/venues", label: "Площадки" },
  { href: "/artists", label: "Артисты" },
  { href: "/jobs", label: "Вакансии" },
];

export function Header() {
  return (
    <header className="border-b border-zinc-200">
      <Container className="grid h-20 grid-cols-3 items-center">
        <nav className="flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-black opacity-20 transition-opacity hover:opacity-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/" className="justify-self-center" aria-label="event.ru">
          <Image src="/logo.svg" alt="event.ru" width={180} height={38} priority />
        </Link>

        <Link
          href="/login"
          className={cn(
            buttonVariants({ variant: "pill", size: "pill" }),
            "justify-self-end gap-4.5 pl-1",
          )}
        >
          <span className="size-7 rounded-full bg-white" />
          Войти
        </Link>
      </Container>
    </header>
  );
}
