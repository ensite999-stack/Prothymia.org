import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: site.title,
  description: "Independent nonprofit magazine on human experience, philosophy, dignity, ecology, and public life.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://prothymia.org"),
  alternates: { types: { "application/rss+xml": "/feed.xml" } },
  icons: { icon: "/icon.svg", shortcut: "/icon.svg", apple: "/icon.svg" },
};

const themeScript = `try{var t=localStorage.getItem('prothymia-theme');if(t==='dark')document.documentElement.dataset.theme='dark'}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body id="top">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
