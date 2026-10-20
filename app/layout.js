import { Bodoni_Moda, Jost } from "next/font/google";
import site from "@/content/site.json";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const display = Bodoni_Moda({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const sans = Jost({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const { meta } = site;

export const metadata = {
  metadataBase: new URL(meta.url),
  title: meta.title,
  description: meta.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: meta.url,
    siteName: meta.siteName,
    title: meta.title,
    description: meta.description,
    locale: meta.locale,
  },
  twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
};

export const viewport = {
  themeColor: "#0d0d0c",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
