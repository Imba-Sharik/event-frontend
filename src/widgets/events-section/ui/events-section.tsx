import { ContentCard } from "@/entities/content-card";
import { Container } from "@/shared/ui/container";
import { Grid } from "@/shared/ui/grid";
import { SectionHeader } from "@/shared/ui/section-header";
import { images } from "@/shared/lib/images";

export function EventsSection() {
  return (
    <section className="py-12">
      <Container>
        <SectionHeader
          title="Мероприятия"
          tabs={[
            { value: "furniture", label: "Мебель" },
            { value: "art", label: "Искусство" },
          ]}
          seeAllHref="/events"
          className="mb-6"
        />
        <Grid>
          <ContentCard
            span={6}
            image={images.manSuitPortraitLarge}
            imageAlt="Мужчина в синем костюме"
            title="Четверть века спустя: как изменилась event-индустрия с начала нулевых?"
            date="12 апреля"
            tag={{ text: "Интересно", variant: "accent" }}
            subtitle="Москва"
            imagePosition="top"
          />
          <ContentCard
            span={6}
            image={images.burjAlArabDubai}
            imageAlt="Бурдж-эль-Араб"
            title="Как изменилась event-индустрия с начала нулевых?"
            date="12 апреля"
            subtitle="Санкт-Петербург"
          />
        </Grid>
      </Container>
    </section>
  );
}
