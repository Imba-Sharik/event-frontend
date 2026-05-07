import { ContentCard } from "@/entities/content-card";
import { Container } from "@/shared/ui/container";
import { Grid } from "@/shared/ui/grid";
import { SectionHeader } from "@/shared/ui/section-header";
import { images } from "@/shared/lib/images";

export function ConcertsSection() {
  return (
    <section className="py-12">
      <Container>
        <SectionHeader
          title="Концерты"
          tabs={[
            { value: "rap", label: "Рэп" },
            { value: "pop", label: "Поп" },
            { value: "classic", label: "Классика" },
          ]}
          className="mb-6"
        />
        <Grid>
          <ContentCard
            span={4}
            image={images.couplePortrait}
            imageAlt="Дмитрий Лапатин"
            title="Дмитрий Лапатин: «Сегодня важно не быть old money, а греметь по-новому»"
            date="12 апреля"
            subtitle="Интервью"
          />
          <ContentCard
            span={4}
            image={images.manSuitPortraitLarge}
            imageAlt="Мужчина в синем костюме"
            title="Четверть века спустя: как изменилась event-индустрия с начала нулевых?"
            date="12 апреля"
            subtitle="Новость"
            imagePosition="top"
          />
          <ContentCard
            span={4}
            image={images.burjAlArabDubai}
            imageAlt="Бурдж-эль-Араб"
            title="Как изменилась event-индустрия с начала нулевых?"
            date="12 апреля"
            subtitle="Mice"
            subtitleAccent
          />
        </Grid>
      </Container>
    </section>
  );
}
