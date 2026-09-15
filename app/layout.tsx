import type { Metadata } from "next";
import "./globals.css";
import "./interaction.css";
import "./brand.css";
import "./editorial-overrides.css";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { NavigationEffects } from "../components/navigation-effects";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: site.title,
  description: "Independent nonprofit magazine on human experience, philosophy, dignity, ecology, and public life.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://prothymia.org"),
  alternates: { types: { "application/rss+xml": "/feed.xml" } },
  icons: { icon: "/icon.svg?v=9", shortcut: "/icon.svg?v=9", apple: "/icon.svg?v=9" },
};

const themeScript = `try{var t=localStorage.getItem('prothymia-theme');document.documentElement.dataset.theme=t==='light'?'light':'dark'}catch(e){document.documentElement.dataset.theme='dark'}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body id="top">
        <NavigationEffects />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
