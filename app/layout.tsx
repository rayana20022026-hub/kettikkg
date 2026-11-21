import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GETTIK.KG — Поиск попутчиков и бронирование поездок по Кыргызстану",
  description:
    "GETTIK.KG — цифровая платформа поиска попутчиков и онлайн-бронирования мест в междугородних поездках по Кыргызстану. Проверенные водители, прозрачные цены, безопасное бронирование.",
  keywords: [
    "попутчики Кыргызстан",
    "поездки Бишкек Каракол",
    "бронирование мест",
    "GETTIK",
    "междугородние поездки",
  ],
  openGraph: {
    title: "GETTIK.KG — Поиск попутчиков и бронирование поездок",
    description:
      "Находите проверенные поездки, бронируйте места онлайн и путешествуйте по Кыргызстану безопасно.",
    locale: "ru_KG",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#2140e6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
