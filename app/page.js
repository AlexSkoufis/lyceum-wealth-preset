import site from "@/content/site.json";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Statement from "@/components/Statement";
import Disciplines from "@/components/Disciplines";
import Process from "@/components/Process";
import Audiences from "@/components/Audiences";
import Team from "@/components/Team";
import Start from "@/components/Start";
import Insights from "@/components/Insights";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Motion from "@/components/Motion";

const { meta, contact, brand } = site;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: brand.name,
  url: meta.url,
  description: meta.description,
  email: contact.email.label,
  telephone: contact.phone.href.replace("tel:", ""),
  address: {
    "@type": "PostalAddress",
    streetAddress: contact.address.line1,
    addressLocality: "Madison",
    addressRegion: "WI",
    postalCode: "53703",
    addressCountry: "US",
  },
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <Statement />
        <Disciplines />
        <Process />
        <Audiences />
        <Team />
        <Start />
        <Insights />
        <Contact />
      </main>
      <Footer />
      <Motion />
    </>
  );
}
