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
        <ul className="grid grid-cols-3 gap-x-6 gap-y-12">
          {people.map((person) => (
            <li key={person.name} className="relative aspect-square">
                <div className="absolute left-0 top-1/2 size-73.25 -translate-y-1/2">
                  <div
                    aria-hidden
                    className="absolute left-1/2 top-1/2 h-87.25 w-55.75 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[50%] bg-[#d8d8d8]"
                  />
                </div>
                <div className="absolute bottom-10 left-30 right-0">
                  <p className="text-[20px] font-semibold leading-6.75 text-zinc-900">
                    {person.name}
                  </p>
                  <p className="mt-1 text-base leading-5 text-zinc-900">
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
