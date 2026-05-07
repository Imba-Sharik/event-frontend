import { ContentCard } from "@/entities/content-card";
import { Container } from "@/shared/ui/container";
import { Grid } from "@/shared/ui/grid";
import { SectionHeader } from "@/shared/ui/section-header";
import { images } from "@/shared/lib/images";

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
        <Grid>
          <ContentCard
            span={3}
            image={images.womanMonsteraLeaf}
            imageAlt="Девушка с листом монстеры"
            title="Предметы искусства 20 века"
            date="12 апреля"
            tag={{ text: "Интересно", variant: "accent" }}
          />
          <ContentCard
            span={3}
            image={images.urbanWalking}
            imageAlt="Городская архитектура"
            title="Event-индустрия"
            date="12 апреля"
          />
          <ContentCard
            span={3}
            image={images.architectureYellow}
            imageAlt="Архитектурная композиция"
            title="Предметы искусства"
            date="12 апреля"
          />
          <ContentCard
            span={3}
            image={images.womanHatField}
            imageAlt="Девушка в шляпе"
            title="Предметы искусства 20 века"
            date="12 апреля"
          />
        </Grid>
      </Container>
    </section>
  );
}
