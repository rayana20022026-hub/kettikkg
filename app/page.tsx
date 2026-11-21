import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { PopularDirections } from "@/components/PopularDirections";
import { RecentTrips } from "@/components/RecentTrips";
import { HowItWorks } from "@/components/HowItWorks";
import { Advantages } from "@/components/Advantages";
import { ForDrivers } from "@/components/ForDrivers";
import { Reviews } from "@/components/Reviews";
import { Faq } from "@/components/Faq";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Stats />
        <PopularDirections />
        <RecentTrips />
        <HowItWorks />
        <Advantages />
        <ForDrivers />
        <Reviews />
        <Faq />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
