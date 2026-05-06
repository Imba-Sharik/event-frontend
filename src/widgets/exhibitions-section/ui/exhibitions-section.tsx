import { ContentCard } from "@/entities/content-card";
import { Container } from "@/shared/ui/container";
import { SectionHeader } from "@/shared/ui/section-header";

export function ExhibitionsSection() {
  return (
    <section className="py-12">
      <Container>
        <SectionHeader
          title="Выставки"
          tabs={[
            { value: "furniture", label: "Мебель" },
            { value: "art", label: "Искусство" },
          ]}
          seeAllHref="/exhibitions"
          className="mb-6"
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <ContentCard
            size="sm"
            image="/images/woman-monstera-leaf.webp"
            imageAlt="Девушка с листом монстеры"
            title="Предметы искусства 20 века"
            date="12 апреля"
            tag={{ text: "Интересно", variant: "accent" }}
            priority
          />
          <ContentCard
            size="sm"
            image="/images/urban-walking.webp"
            imageAlt="Городская архитектура"
            title="Event-индустрия"
            date="12 апреля"
          />
          <ContentCard
            size="sm"
            image="/images/architecture-yellow.webp"
            imageAlt="Архитектурная композиция"
            title="Предметы искусства"
            date="12 апреля"
          />
          <ContentCard
            size="sm"
            image="/images/woman-hat-field.webp"
            imageAlt="Девушка в шляпе"
            title="Предметы искусства 20 века"
            date="12 апреля"
          />
        </div>

        <SectionHeader
          title="Концерты"
          tabs={[
            { value: "rap", label: "Рэп" },
            { value: "pop", label: "Поп" },
            { value: "classic", label: "Классика" },
          ]}
          seeAllHref="/concerts"
          className="mt-12 mb-6"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ContentCard
            size="md"
            image="/images/couple-portrait.webp"
            imageAlt="Дмитрий Лапатин"
            title="Дмитрий Лапатин: «Сегодня важно не быть old money, а греметь по-новому»"
            date="12 апреля"
            subtitle="Интервью"
          />
          <ContentCard
            size="md"
            image="/images/man-suit-portrait.webp"
            imageAlt="Мужчина в синем костюме"
            title="Четверть века спустя: как изменилась event-индустрия с начала нулевых?"
            date="12 апреля"
            subtitle="Новость"
          />
          <ContentCard
            size="md"
            image="/images/burj-al-arab-dubai.webp"
            imageAlt="Бурдж-эль-Араб"
            title="Как изменилась event-индустрия с начала нулевых?"
            date="12 апреля"
            subtitle="Mice"
            subtitleAccent
          />
        </div>

        <SectionHeader
          title="Мероприятия"
          tabs={[
            { value: "furniture", label: "Мебель" },
            { value: "art", label: "Искусство" },
          ]}
          seeAllHref="/events"
          className="mt-12 mb-6"
        />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ContentCard
            size="lg"
            image="/images/man-suit-portrait-large.webp"
            imageAlt="Мужчина в синем костюме"
            title="Четверть века спустя: как изменилась event-индустрия с начала нулевых?"
            date="12 апреля"
            tag={{ text: "Интересно", variant: "accent" }}
            subtitle="Москва"
          />
          <ContentCard
            size="lg"
            image="/images/burj-al-arab-dubai.webp"
            imageAlt="Бурдж-эль-Араб"
            title="Как изменилась event-индустрия с начала нулевых?"
            date="12 апреля"
            subtitle="Санкт-Петербург"
          />
        </div>
      </Container>
    </section>
  );
}
