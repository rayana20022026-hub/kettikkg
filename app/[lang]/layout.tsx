import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { LocaleProvider } from "@/components/LocaleProvider";
import {
  dictionaries,
  hasLocale,
  type Locale,
} from "./dictionaries";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return [{ lang: "ru" }, { lang: "kg" }, { lang: "en" }];
}

/** Maps locale codes to BCP-47 language tags used in <html lang>. */
const htmlLang: Record<Locale, string> = {
  ru: "ru",
  kg: "ky",
  en: "en",
};

/** Maps locale codes to OpenGraph locale strings. */
const ogLocale: Record<Locale, string> = {
  ru: "ru_KG",
  kg: "ky_KG",
  en: "en_US",
};

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await dictionaries[lang]();

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    keywords: dict.metadata.keywords,
    openGraph: {
      title: dict.metadata.ogTitle,
      description: dict.metadata.ogDescription,
      locale: ogLocale[lang as Locale],
      type: "website",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#2140e6",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await dictionaries[lang]();

  return (
    <html
      lang={htmlLang[lang as Locale]}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <LocaleProvider dict={dict} locale={lang as Locale}>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
