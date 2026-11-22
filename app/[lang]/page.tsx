import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "@/app/[lang]/dictionaries-shared";
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

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const locale = lang as Locale;

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero locale={locale} />
        <Stats locale={locale} />
        <PopularDirections locale={locale} />
        <RecentTrips locale={locale} />
        <HowItWorks locale={locale} />
        <Advantages locale={locale} />
        <ForDrivers locale={locale} />
        <Reviews locale={locale} />
        <Faq />
        <CtaSection locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
