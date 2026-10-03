import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { A11yDock } from "@/components/A11yDock";
import { SiteFooter } from "@/components/SiteFooter";

const body = Source_Sans_3({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body-loaded",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Szczep — Hub innowacji społecznych",
  description:
    "Opisz problem społeczny i znajdź sprawdzone innowacje z Małopolski. Sprawdź, czy zadziałają u Ciebie.",
  robots: { index: false, follow: false },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jar = await cookies();
  const tekst = jar.get("szczep_tekst")?.value;
  const scale = tekst === "2" || tekst === "3" ? tekst : "1";
  const motyw = jar.get("szczep_motyw")?.value === "ciemny" ? "ciemny" : "jasny";
  const prosty = jar.get("szczep_prosty")?.value === "1";

  return (
    <html lang="pl" data-tekst={scale} data-motyw={motyw} suppressHydrationWarning>
      <body className={body.variable} suppressHydrationWarning>
        <a className="skip-link" href="#tresc">
          Przejdź do treści
        </a>
        <div className="site-banner" role="status">
          Prototyp pilotażowy — katalog innowacji w budowie (ROPS Kraków / HubMI).
        </div>
        <div className="shell">
          <SiteHeader />
          <main id="tresc">{children}</main>
          <SiteFooter />
        </div>
        <A11yDock tekst={scale} ciemny={motyw === "ciemny"} prosty={prosty} />
      </body>
    </html>
  );
}
