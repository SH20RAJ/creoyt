"use client";
import { BouncyCardsFeatures } from "@/components/landing/Featured";
import HeroSection from "@/components/landing/HeroSection";
import dynamic from 'next/dynamic';

const Testimonials = dynamic(() => import('@/components/landing/Testimonials')
.then(mod => mod.Testimonials)
, {
  ssr: false
});
const FAQs = dynamic(() => import('@/components/landing/FAQs'), {
  ssr: false
});
import FeatureList from "@/components/landing/FeatureList";
import { Authors } from "@/components/landing/Authors";
import Tools from "@/components/landing/Tools";

export default function page() {
  return (
    <div>
      <HeroSection />
      <Tools />
      <BouncyCardsFeatures />
      <FeatureList />
      <div className="container mx-auto mt-10">
        <h2 className="text-3xl font-bold text-center mb-8">Testimonials</h2>
        <Testimonials />
      </div>
      <Authors />
      <FAQs />
    </div>
  );
}
