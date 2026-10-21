import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Karla,
  Noto_Sans_Gurmukhi,
  Noto_Serif_Gurmukhi,
} from "next/font/google";
import "./globals.css";
import { getDictionary } from "@/lib/dictionary";
import { getLang } from "@/lib/i18n-server";
import { getContent } from "@/lib/localize";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

// A soft old-style serif — it reads as handmade rather than corporate.
const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const sans = Karla({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

// Gurmukhi. Neither font above has a single Gurmukhi letter, so these sit
// behind them in the font stacks and the browser reaches for them only when
// it meets Gurmukhi text. Not preloaded: English visitors never download
// them at all.
const sansPa = Noto_Sans_Gurmukhi({
  variable: "--font-sans-pa",
  subsets: ["gurmukhi"],
  display: "swap",
  preload: false,
});

const serifPa = Noto_Serif_Gurmukhi({
  variable: "--font-serif-pa",
  subsets: ["gurmukhi"],
  weight: ["500", "600"],
  display: "swap",
  preload: false,
});

export async function generateMetadata(): Promise<Metadata> {
  const { business } = getContent(await getLang());

  return {
    title: {
      default: `${business.name} — ${business.tagline}`,
      // Inner pages use the short name: browser tabs cut long titles off,
      // and "Gallery — Pammi Penji" survives that better.
      template: `%s — ${business.shortName}`,
    },
    description: business.intro,
    openGraph: {
      title: `${business.name} — ${business.tagline}`,
      description: business.intro,
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getLang();
  const t = getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${serif.variable} ${sans.variable} ${sansPa.variable} ${serifPa.variable}`}
      // Smooth scrolling is for in-page jumps (like /services#anarkali).
      // This tells Next not to animate the jump to the top of each new page
      // as well, which made every navigation feel slow.
      data-scroll-behavior="smooth"
    >
      <body>
        <a className="skip-link" href="#main">
          {t.nav.skipToContent}
        </a>
        <SiteHeader lang={lang} />
        <main id="main" style={{ flex: 1 }}>
          {children}
        </main>
        <SiteFooter lang={lang} />
      </body>
    </html>
  );
}
