"use client";
import { BouncyCardsFeatures } from "@/components/landing/Featured";
import NavBar from "@/components/landing/NavBar";
import HeroSection from "@/components/landing/HeroSection";
import { Testimonials } from "@/components/landing/Testimonials";
import React from "react";
import { WaitList } from "@/components/landing/WaitList";
import FAQs from "@/components/landing/FAQs";
import Footer from "@/components/landing/Footer";
import FeatureList from "@/components/landing/FeatureList";

export default function page() {
  return (
    <div>
      <NavBar />
      <HeroSection />
      <BouncyCardsFeatures />
      <FeatureList />
      <div className="container mx-auto mt-10">
        <h2 className="text-3xl font-bold text-center mb-8">Testimonials</h2>
        <Testimonials />
      </div>
      <FAQs />
      <Footer />
    </div>
  );
}
