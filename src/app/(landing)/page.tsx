import { EnhancedFeaturesSection, CtaSection, Footer } from "@/components/landing";
import Hero from "@/components/ui/neural-network-hero";
import { HERO_CONTENT, BRAND_TAGLINES } from "@/constants/landing/hero";
import { JsonLd, organizationData, softwareApplicationData, websiteData } from "@/components/seo/json-ld";
import { Navbar1 } from "@/components/ui/navbar-1";

export default function Home() {
  return (
    <div className="min-h-screen">
      <JsonLd data={organizationData} />
      <JsonLd data={softwareApplicationData} />
      <JsonLd data={websiteData} />
      {/* <Header /> */}
      <Navbar1/>
      <main>
        <div className="w-screen h-screen flex flex-col relative">
          <Hero
            title={HERO_CONTENT.title}
            description={HERO_CONTENT.subtitle}
            badgeText={BRAND_TAGLINES[0]}
            badgeLabel="New"
            ctaButtons={[
              { text: HERO_CONTENT.primaryCta, href: "/handler/sign-up", primary: true },
              { text: HERO_CONTENT.secondaryCta, href: "#features" }
            ]}
            microDetails={["AI-powered insights", "YouTube growth toolkit", "Cloudflare-ready"]}
          />
        </div>
        <EnhancedFeaturesSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
