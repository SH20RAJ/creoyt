import { Header, HeroSection, FeaturesSection, CtaSection, Footer } from "@/components/landing";
import { JsonLd, organizationData, softwareApplicationData, websiteData } from "@/components/seo/json-ld";

export default function Home() {
  return (
    <div className="min-h-screen">
      <JsonLd data={organizationData} />
      <JsonLd data={softwareApplicationData} />
      <JsonLd data={websiteData} />
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
