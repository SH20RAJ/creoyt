"use client";
import { BouncyCardsFeatures } from "@/components/landing/Featured";
import HeroSection from "@/components/landing/HeroSection";
import { Testimonials } from "@/components/landing/Testimonials";
import FAQs from "@/components/landing/FAQs";
import FeatureList from "@/components/landing/FeatureList";

export default function page() {
  return (
    <div>
      <HeroSection />
      <BouncyCardsFeatures />
      <FeatureList />
      <div className="container mx-auto mt-10">
        <h2 className="text-3xl font-bold text-center mb-8">Testimonials</h2>
        <Testimonials />
      </div>
      <FAQs />
    </div>
  );
}
