import { Container } from "@/shared/ui/container";
import { SectionHeader } from "@/shared/ui/section-header";

interface Person {
  name: string;
  description: string;
}

const people: Person[] = [
  {
    name: "Дмитрий Лапатин",
    description: "Как изменилась event-индустрия с начала",
  },
  {
    name: "Евгений Иванов",
    description: "Изменилась event-индустрия с начала",
  },
  {
    name: "Семен Петров",
    description: "Как изменилась event-индустрия с начала",
  },
];

export function PeopleSection() {
  return (
    <section className="py-12">
      <Container>
        <SectionHeader title="Люди" className="mb-6" />
        <ul className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3">
          {people.map((person) => (
            <li key={person.name} className="relative h-58 sm:h-73.25">
              <div className="absolute left-1/2 top-1/2 size-55 -translate-x-1/2 -translate-y-1/2 sm:size-73.25 sm:left-0 sm:translate-x-0">
                <div
                  aria-hidden
                  className="absolute left-1/2 top-1/2 h-65 w-42 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[50%] bg-[#d8d8d8] sm:h-87.25 sm:w-55.75"
                />
              </div>
              <div className="absolute bottom-1 left-1/2 right-0 sm:left-30">
                <p className="text-base font-semibold leading-snug text-zinc-900 sm:text-lg lg:text-[20px] lg:leading-6.75">
                  {person.name}
                </p>
                <p className="mt-1 text-sm leading-5 text-zinc-900 sm:text-base">
                  {person.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
