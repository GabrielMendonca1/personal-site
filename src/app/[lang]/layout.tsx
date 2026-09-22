import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { copy, isLocale, locales, siteUrl } from "@/lib/i18n";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
type Params = Promise<{ lang: string }>;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const title = "Gabriel Mendonça";
  const description = copy[lang].description;
  return {
    metadataBase: new URL(siteUrl),
    title: "G", description,
    alternates: { canonical: "/" },
    openGraph: { title, description, url: "/", locale: lang === "pt" ? "pt_BR" : "en_US", alternateLocale: lang === "pt" ? "en_US" : "pt_BR" },
    twitter: { card: "summary", title, description },
  };
}

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default async function RootLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Params }>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <html lang={lang === "pt" ? "pt-BR" : "en"}><body className={inter.variable}>{children}</body></html>;
}
