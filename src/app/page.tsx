import { BestSection } from "@/widgets/best-section";
import { ConcertsSection } from "@/widgets/concerts-section";
import { EventsSection } from "@/widgets/events-section";
import { ExhibitionsSection } from "@/widgets/exhibitions-section";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";
import { Hero } from "@/widgets/hero";
import { PeopleSection } from "@/widgets/people-section";
import { PublicationsSection } from "@/widgets/publications-section";
import { SearchBar } from "@/widgets/search-bar";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col">
        <SearchBar />
        <Hero />
        <ExhibitionsSection />
        <EventsSection />
        <BestSection />
        <ConcertsSection />
        <PeopleSection />
        <PublicationsSection />
      </main>
      <Footer />
    </div>
  );
}
